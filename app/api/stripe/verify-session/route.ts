import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

type StripeSession = {
  id: string
  payment_status: string
  amount_total: number | null
  metadata: Record<string, string>
}

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json({ error: 'Stripe key not configured' }, { status: 500 })
  }

  try {
    const { session_id } = await req.json()
    if (!session_id) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
    }

    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(session_id)}`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    const session = await res.json() as StripeSession & { error?: { message: string } }

    if (!res.ok) {
      return NextResponse.json({ error: 'Could not retrieve order' }, { status: 400 })
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    const attendees = JSON.parse(session.metadata?.attendees ?? '[]') as Array<{
      firstName: string
      lastName: string
      email: string
    }>

    const db = supabaseAdmin()

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
