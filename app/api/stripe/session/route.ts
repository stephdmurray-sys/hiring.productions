import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null

export async function GET(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    
    if (!sessionId) {
      return NextResponse.json({ error: 'No session' }, { status: 400 })
    }
    
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Pull the custom-field values we collected in checkout. Stripe returns
    // these as an array of { key, type, text|dropdown|numeric } records.
    const customFields = session.custom_fields || []
    const getText = (k: string) =>
      customFields.find((f) => f.key === k)?.text?.value || ''
    const getDropdown = (k: string) =>
      customFields.find((f) => f.key === k)?.dropdown?.value || ''

    // Stripe Checkout caps custom_fields at 3, so we collect "full_name" as
    // a single string and split it server-side. Naive whitespace split:
    // first token → firstName, remainder → lastName. Handles single names
    // ("Madonna") by leaving lastName empty.
    const fullName = getText('full_name').trim()
    const parts = fullName.split(/\s+/)
    const firstName = parts[0] || ''
    const lastName = parts.slice(1).join(' ')

    return NextResponse.json({
      email: session.customer_details?.email,
      firstName,
      lastName,
      role: getDropdown('role'),
      jobTitle: getText('job_title'),
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}
