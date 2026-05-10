import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

type Attendee = {
  firstName: string
  lastName: string
  email: string
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const body = await req.json()
    const attendees: Attendee[] = body.attendees

    if (!attendees || attendees.length === 0) {
      return NextResponse.json({ error: 'No attendees provided' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: attendees.length,
          price_data: {
            currency: 'usd',
            unit_amount: 3000,
            product_data: {
              name: 'Bacchanalian Society Ticket — June 25, 2026',
            },
          },
        },
      ],
      metadata: {
        attendees: JSON.stringify(attendees),
        event: 'June 25 2026 Ault Park',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/tickets`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session creation error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
