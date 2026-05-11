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

    return NextResponse.json({
      email: session.customer_details?.email,
      firstName: getText('first_name'),
      lastName: getText('last_name'),
      role: getDropdown('role'),
      // jobTitle isn't collected at checkout anymore — captured later via the
      // in-product lead-capture flow. Returned as empty string for shape
      // compatibility with the client.
      jobTitle: '',
    })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}
