import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { logEvent } from '@/lib/event-log'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null

/**
 * Derive the deployment's own origin from request headers so the Stripe
 * redirect lands back on the SAME deployment that started checkout.
 *
 * Without this, a checkout started on a Vercel preview URL would redirect
 * to whatever NEXT_PUBLIC_SITE_URL is set to (usually the production domain),
 * silently dropping the member-activation flow. This caused the "I paid but
 * nothing unlocked" bug.
 */
function getOrigin(request: NextRequest): string {
  // 1. Prefer the host on the incoming request — this is always the correct
  //    origin for the deployment that's actually serving the user.
  const host = request.headers.get('host')
  const proto =
    request.headers.get('x-forwarded-proto') ??
    (host && host.startsWith('localhost') ? 'http' : 'https')
  if (host) {
    return `${proto}://${host}`
  }
  // 2. Fall back to the configured site URL.
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // 3. Last resort.
  return 'https://hiring.productions'
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })
    }

    const origin = getOrigin(request)

    // Parse the requested plan from the POST body. Defaults to monthly
    // because that's now the primary tier — annual is the save-money
    // option for committed buyers. Body shape: { plan?: 'monthly' | 'annual' }.
    // Unknown values fall back to monthly defensively.
    let plan: 'monthly' | 'annual' = 'monthly'
    try {
      const body = await request.json()
      if (body?.plan === 'annual') plan = 'annual'
    } catch {
      // No body or non-JSON — fine, use the monthly default.
    }

    const unit_amount = plan === 'annual' ? 9900 : 1499
    const interval: 'year' | 'month' = plan === 'annual' ? 'year' : 'month'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'hiring.productions Pro',
              description:
                'The whole production — every Recruiter Insight, built from real recruiting practice. Use them on every resume tweak and every job description.',
            },
            unit_amount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/membership?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/membership`,
      allow_promotion_codes: true,
      // Collected so we can greet the member by name and tailor copy / tools
      // to whether they're job-seeking, hiring, or doing both. Stripe Checkout
      // caps custom_fields at three — we use all three on first name, last
      // name, and role. Job title is collected later via the in-product
      // lead-capture flow (after free tool use) rather than at checkout.
      custom_fields: [
        {
          key: 'first_name',
          label: { type: 'custom', custom: 'First name' },
          type: 'text',
          text: { minimum_length: 1, maximum_length: 60 },
        },
        {
          key: 'last_name',
          label: { type: 'custom', custom: 'Last name' },
          type: 'text',
          text: { minimum_length: 1, maximum_length: 60 },
        },
        {
          key: 'role',
          label: { type: 'custom', custom: 'I’m using this as a…' },
          type: 'dropdown',
          dropdown: {
            options: [
              { label: 'Job seeker / candidate', value: 'candidate' },
              { label: 'Recruiter / hiring team', value: 'hiring' },
              { label: 'Both — I do both sides', value: 'both' },
            ],
          },
        },
      ],
    })

    // Server-side event log — captures every checkout that LEAVES our
    // origin for Stripe. Pair with payment_success in /api/stripe/session
    // to compute the live checkout → payment conversion rate. The plan
    // tag lets us see monthly vs annual split in the dashboard.
    void logEvent('checkout_start', {
      meta: { sessionId: session.id ?? '', plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
