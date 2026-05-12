import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { signProCookie, COOKIE_NAMES } from '@/lib/identity'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null

/**
 * Stripe Checkout redirects back to `/membership?session_id=...` on
 * success. The membership page calls this endpoint to:
 *
 *   1. Pull the customer's email + custom fields (for localStorage greeting).
 *   2. Verify the session is actually paid before granting Pro access.
 *   3. Plant a signed `hp_pro` cookie keyed by the Stripe customer ID, so the
 *      server-side gate (lib/usage.ts) recognizes the visitor as tier=pro on
 *      every future /api/tool call. Without this cookie, paying customers
 *      get treated as anon by the gate and hit the 2/day free limit.
 */
export async function GET(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'No session' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Guard: only plant the Pro cookie if Stripe says this session is
    // actually paid. Otherwise an attacker could forge a session_id query
    // param and try to unlock Pro without paying.
    const isPaid = session.payment_status === 'paid' && session.status === 'complete'
    const customerId =
      typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null

    // Pull the custom-field values we collected in checkout. Stripe returns
    // these as an array of { key, type, text|dropdown|numeric } records.
    const customFields = session.custom_fields || []
    const getText = (k: string) =>
      customFields.find((f) => f.key === k)?.text?.value || ''
    const getDropdown = (k: string) =>
      customFields.find((f) => f.key === k)?.dropdown?.value || ''

    const res = NextResponse.json({
      email: session.customer_details?.email,
      firstName: getText('first_name'),
      lastName: getText('last_name'),
      role: getDropdown('role'),
      // jobTitle isn't collected at checkout anymore — captured later via the
      // in-product lead-capture flow. Returned as empty string for shape
      // compatibility with the client.
      jobTitle: '',
    })

    // Plant the Pro cookie if this is a verified paid session. 1-year TTL
    // matches the annual subscription cycle — on renewal the user will hit
    // this endpoint again and refresh the cookie.
    if (isPaid && customerId) {
      const signed = await signProCookie(customerId)
      if (signed) {
        res.cookies.set(COOKIE_NAMES.PRO, signed, {
          httpOnly: true,
          secure: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        })
      } else {
        // HP_COOKIE_SECRET not set — code path still works for localStorage,
        // but the server gate won't recognize this customer as Pro. Loud log
        // so this never silently fails in production.
        console.error('[stripe/session] signProCookie returned null — HP_COOKIE_SECRET missing?')
      }
    }

    return res
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}
