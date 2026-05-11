import Stripe from 'stripe'
import { NextResponse } from 'next/server'

/**
 * Verify a user actually has an active subscription before we activate their
 * local membership. This closes the trivial "type any email + click Restore"
 * loophole we used to have.
 *
 * Returns:
 *   { active: true }  → email matches a customer with an active or trialing subscription
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

    // For each customer, look for an active or trialing subscription.
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
        return NextResponse.json({ active: true })
      }
    }

    return NextResponse.json({ active: false })
  } catch (error) {
    console.error('verify-customer error:', error)
    return NextResponse.json({ active: false, error: 'Verification failed' }, { status: 500 })
  }
}
