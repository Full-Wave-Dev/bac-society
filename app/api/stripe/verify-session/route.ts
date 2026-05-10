import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  try {
    const { session_id } = await req.json()

    if (!session_id) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    const attendees = JSON.parse(session.metadata?.attendees ?? '[]') as Array<{
      firstName: string
      lastName: string
      email: string
    }>

    const db = supabaseAdmin()

    // Check for duplicate — if this session was already saved, return early
    const { data: existing } = await db
      .from('bac_ticket_purchases')
      .select('id')
      .eq('stripe_session_id', session.id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ ok: true, already_saved: true, attendees })
    }

    const { error: insertError } = await db.from('bac_ticket_purchases').insert({
      stripe_session_id: session.id,
      order_total: session.amount_total,
      attendees,
      checked_in_ids: [],
      event_name: 'June 25, 2026 — Ault Park — Sauvignon Blanc',
    })

    if (insertError) {
      // Unique constraint violation means it was inserted concurrently — treat as already saved
      if (insertError.code === '23505') {
        return NextResponse.json({ ok: true, already_saved: true, attendees })
      }
      console.error('[verify-session] insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, attendees })
  } catch (err) {
    console.error('[verify-session]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
