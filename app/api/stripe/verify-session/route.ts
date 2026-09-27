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

    const EVENT_NAME = 'Fall Tasting 2026 — October 1, 2026, 7pm–10pm — Elm Street Plaza — Pinot Grigio'

    const { data: existing } = await db
      .from('bac_ticket_purchases')
      .select('id')
      .eq('stripe_session_id', session.id)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ ok: true, already_saved: true, attendees })
    }

    const { data: inserted, error: insertError } = await db
      .from('bac_ticket_purchases')
      .insert({
        stripe_session_id: session.id,
        order_total: session.amount_total,
        attendees,
        checked_in_ids: [],
        event_name: EVENT_NAME,
      })
      .select('id')
      .single()

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json({ ok: true, already_saved: true, attendees })
      }
      console.error('[verify-session] insert error:', insertError)
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 })
    }

    // Flatten attendees into the readable bac_attendees table (one row per person)
    if (inserted?.id && attendees.length > 0) {
      const rows = attendees.map((a) => ({
        purchase_id: inserted.id,
        first_name: a.firstName ?? '',
        last_name: a.lastName ?? '',
        email: a.email ?? '',
        event_name: EVENT_NAME,
        checked_in: false,
      }))
      const { error: attErr } = await db.from('bac_attendees').insert(rows)
      if (attErr) console.error('[verify-session] bac_attendees insert error:', attErr)
    }

    // Push each attendee to the owner's Google Sheet via Apps Script web app
    const sheetsUrl = process.env.BAC_SHEETS_WEBHOOK_URL
    if (sheetsUrl && attendees.length > 0) {
      try {
        await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: EVENT_NAME,
            orderTotal: session.amount_total ? session.amount_total / 100 : null,
            stripeSessionId: session.id,
            attendees: attendees.map((a) => ({
              firstName: a.firstName ?? '',
              lastName: a.lastName ?? '',
              email: a.email ?? '',
            })),
          }),
        })
      } catch (sheetErr) {
        console.error('[verify-session] google sheet push error:', sheetErr)
      }
    }

    return NextResponse.json({ ok: true, attendees })
  } catch (err) {
    console.error('[verify-session]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
