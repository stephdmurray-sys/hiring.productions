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
    return NextResponse.json({ email: session.customer_details?.email })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}
