import { NextRequest, NextResponse } from 'next/server'

type Attendee = {
  firstName: string
  lastName: string
  email: string
}

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  try {
    const body = await req.json()
    const attendees: Attendee[] = body.attendees ?? []

    if (attendees.length === 0) {
      return NextResponse.json({ error: 'No attendees provided' }, { status: 400 })
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bac-society.vercel.app').trim()

    const params = new URLSearchParams({
      mode: 'payment',
      'line_items[0][quantity]': String(attendees.length),
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': '3000',
      'line_items[0][price_data][product_data][name]': 'BAC Ticket — Fall Tasting 2026',
      'metadata[attendees]': JSON.stringify(attendees),
      'metadata[event]': 'Fall Tasting 2026 — October 1 2026, 7pm–10pm, Elm Street Plaza',
      success_url: `${siteUrl}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/tickets`,
    })

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const session = await res.json() as { url?: string }

    if (!res.ok) {
      console.error('Stripe API error:', session)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session creation error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
