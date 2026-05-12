import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { signProCookie, COOKIE_NAMES } from '@/lib/identity'

/**
 * Verify a user actually has an active subscription before we activate their
 * local membership. This closes the trivial "type any email + click Restore"
 * loophole we used to have.
 *
 * Also plants the signed `hp_pro` cookie so the server-side gate
 * (lib/usage.ts) recognizes the restored visitor as tier=pro on every
 * future /api/tool call. Without this, a restored member gets treated as
 * anon by the gate and hits the 2/day free limit.
 *
 * Returns:
 *   { active: true }  → email matches a customer with an active or trialing subscription
 *                       (and the Pro cookie has been planted on the response)
 *   { active: false } → not found OR no active subscription
 */

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
  : null

export async function GET(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const rawEmail = searchParams.get('email')?.trim().toLowerCase()

    if (!rawEmail || !rawEmail.includes('@')) {
      return NextResponse.json({ active: false, error: 'Invalid email' }, { status: 400 })
    }

    // Find customers with this email. Stripe matches case-insensitively but we
    // normalized the input above for safety.
    const customers = await stripe.customers.list({ email: rawEmail, limit: 10 })

    if (customers.data.length === 0) {
      return NextResponse.json({ active: false })
    }

    // For each customer, look for an active or trialing subscription. The
    // first match wins — we plant the cookie for that customer ID.
    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'all',
        limit: 10,
      })

      const hasActive = subs.data.some(
        (s) => s.status === 'active' || s.status === 'trialing' || s.status === 'past_due',
      )

      if (hasActive) {
        const res = NextResponse.json({ active: true })

        // Plant the Pro cookie keyed to this Stripe customer.
        const signed = await signProCookie(customer.id)
        if (signed) {
          res.cookies.set(COOKIE_NAMES.PRO, signed, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
          })
        } else {
          console.error(
            '[stripe/verify-customer] signProCookie returned null — HP_COOKIE_SECRET missing?',
          )
        }

        return res
      }
    }

    return NextResponse.json({ active: false })
  } catch (error) {
    console.error('verify-customer error:', error)
    return NextResponse.json({ active: false, error: 'Verification failed' }, { status: 500 })
  }
}
