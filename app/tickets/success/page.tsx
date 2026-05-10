'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

type Attendee = {
  firstName: string
  lastName: string
  email: string
}

type VerifyState =
  | { status: 'loading' }
  | { status: 'success'; attendees: Attendee[] }
  | { status: 'error'; message: string }

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [state, setState] = useState<VerifyState>({ status: 'loading' })
  const calledRef = useRef(false)

  useEffect(() => {
    if (calledRef.current) return
    calledRef.current = true

    if (!sessionId) {
      setState({ status: 'error', message: 'No order reference found.' })
      return
    }

    async function verify() {
      try {
        const res = await fetch('/api/stripe/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        })
        const data = await res.json()
        if (!res.ok) {
          setState({ status: 'error', message: data.error ?? 'Could not confirm your order.' })
          return
        }
        setState({ status: 'success', attendees: data.attendees ?? [] })
      } catch {
        setState({ status: 'error', message: 'Something went wrong. Please contact us.' })
      }
    }

    verify()
  }, [sessionId])

  return (
    <div
      className="home-section-wrap"
      style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto', padding: '3rem 0' }}
    >
      {state.status === 'loading' && (
        <>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⏳</div>
          <div className="label cc-light">Please wait</div>
          <h2 className="section-heading">Confirming your order...</h2>
          <p className="paragraph-light">
            We&apos;re verifying your payment. This only takes a moment.
          </p>
        </>
      )}

      {state.status === 'error' && (
        <>
          <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⚠️</div>
          <div className="label cc-light">Error</div>
          <h2 className="section-heading">Something went wrong</h2>
          <p className="paragraph-light" style={{ marginBottom: '2rem' }}>
            {state.message}
          </p>
          <p className="paragraph-light" style={{ marginBottom: '2rem', fontSize: '0.875rem', color: '#999' }}>
            If you were charged, please email us and we&apos;ll sort it out right away.
          </p>
          <Link href="/tickets" className="primary-button w-inline-block">
            <div>Back to Tickets</div>
          </Link>
        </>
      )}

      {state.status === 'success' && (
        <>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🍷</div>
          <div className="label cc-light">Success</div>
          <h2 className="section-heading">Thank You!</h2>

          {state.attendees.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <p className="paragraph-light" style={{ marginBottom: '0.75rem' }}>
                {state.attendees.length === 1
                  ? 'Your ticket has been confirmed for:'
                  : 'Tickets have been confirmed for:'}
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  textAlign: 'left',
                  background: '#f9f6f0',
                  border: '1px solid #e8ddd0',
                  borderRadius: '8px',
                  padding: '1rem 1.5rem',
                  minWidth: '260px',
                }}
              >
                {state.attendees.map((a, i) => (
                  <div key={i} style={{ lineHeight: 1.5 }}>
                    <strong>{a.firstName} {a.lastName}</strong>
                    <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: '0.5rem' }}>
                      {a.email}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <p className="paragraph-light" style={{ marginBottom: '0.5rem' }}>
              <strong>Event:</strong> June 25, 2026
            </p>
            <p className="paragraph-light" style={{ marginBottom: '0.5rem' }}>
              <strong>Location:</strong> Ault Park, Cincinnati, OH
            </p>
            <p className="paragraph-light" style={{ marginBottom: '0.5rem' }}>
              <strong>Varietal:</strong> Sauvignon Blanc
            </p>
          </div>

          <p className="paragraph-light" style={{ marginBottom: '2.5rem' }}>
            A confirmation email is on its way. See you at Ault Park on{' '}
            <strong>June 25, 2026</strong>!
          </p>

          {sessionId && (
            <p style={{ fontSize: '0.8rem', color: '#bbb', marginBottom: '2rem' }}>
              Order ref: {sessionId.slice(0, 24)}...
            </p>
          )}

          <Link href="/" className="primary-button w-inline-block">
            <div>Back to Home</div>
          </Link>
        </>
      )}
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="section cc-store-home-wrap">
      <div className="intro-header cc-subpage">
        <Nav />
        <div className="introwrap">
          <div className="intro-content">
            <div className="intro-text">
              <h1 className="heading-jumbo">Order Confirmed</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home-content-wrap">
          <Suspense fallback={
            <div className="home-section-wrap" style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>⏳</div>
              <p className="paragraph-light">Loading...</p>
            </div>
          }>
            <SuccessContent />
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  )
}
