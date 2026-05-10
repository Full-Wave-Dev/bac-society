'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type Attendee = {
  firstName: string
  lastName: string
  email: string
}

type FormState = {
  firstName: string
  lastName: string
  email: string
}

const TICKET_PRICE = 30

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function TicketsPage() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [form, setForm] = useState<FormState>({ firstName: '', lastName: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setFormError('')
  }

  function handleAddTicket(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setFormError('All fields are required.')
      return
    }

    if (!isValidEmail(form.email)) {
      setFormError('Please enter a valid email address.')
      return
    }

    const duplicate = attendees.some(
      (a) => a.email.toLowerCase() === form.email.toLowerCase()
    )
    if (duplicate) {
      setFormError('This email has already been added.')
      return
    }

    setAttendees((prev) => [...prev, { ...form }])
    setForm({ firstName: '', lastName: '', email: '' })
  }

  function handleRemove(index: number) {
    setAttendees((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleCheckout() {
    if (attendees.length === 0) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/stripe/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendees }),
      })

      if (!res.ok) {
        throw new Error('Could not create checkout session. Please try again.')
      }

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  const total = attendees.length * TICKET_PRICE

  return (
    <div className="section cc-store-home-wrap">
      <div className="intro-header cc-subpage">
        <Nav />
        <div className="introwrap">
          <div className="intro-content">
            <div className="intro-text">
              <h1 className="heading-jumbo">Buy Tickets<br /></h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home-content-wrap">
          <div className="home-section-wrap">
            <div className="label cc-light">Tickets</div>
            <h2 className="section-heading">Buy Tickets</h2>

            {/* Event info */}
            <div className="ticket-card" style={{ marginBottom: '2rem' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li><strong>Date:</strong> June 25, 2026</li>
                <li><strong>Location:</strong> Ault Park, Cincinnati, OH</li>
                <li><strong>Varietal:</strong> Sauvignon Blanc</li>
                <li><strong>Price:</strong> $30 per person</li>
              </ul>
            </div>

            {/* Add attendee form */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 className="section-heading" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                Add Attendee
              </h3>
              <form onSubmit={handleAddTicket}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.375rem' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="ticket-input text-field w-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label className="label" style={{ display: 'block', marginBottom: '0.375rem' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      className="ticket-input text-field w-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label className="label" style={{ display: 'block', marginBottom: '0.375rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="ticket-input text-field w-input"
                    style={{ width: '100%', maxWidth: '400px' }}
                  />
                </div>
                {formError && (
                  <p style={{ color: '#c0392b', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    {formError}
                  </p>
                )}
                <button type="submit" className="btn-add primary-button w-inline-block" style={{ border: 'none' }}>
                  <div>+ Add Ticket</div>
                </button>
              </form>
            </div>

            {/* Attendee list */}
            {attendees.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 className="section-heading" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                  Attendees
                </h3>
                <div>
                  {attendees.map((attendee, index) => (
                    <div
                      key={attendee.email}
                      className="ticket-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                        padding: '0.875rem 1rem',
                      }}
                    >
                      <div>
                        <strong>{attendee.firstName} {attendee.lastName}</strong>
                        <span style={{ marginLeft: '1rem', color: '#666', fontSize: '0.9rem' }}>
                          {attendee.email}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemove(index)}
                        className="btn-remove"
                        aria-label={`Remove ${attendee.firstName} ${attendee.lastName}`}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.25rem',
                          color: '#999',
                          lineHeight: 1,
                          padding: '0 0.25rem',
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total + checkout */}
                <div
                  style={{
                    borderTop: '1px solid #e0e0e0',
                    paddingTop: '1.25rem',
                    marginTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
                    {attendees.length} ticket{attendees.length !== 1 ? 's' : ''} &mdash; ${total}
                  </p>
                  <div>
                    {error && (
                      <p style={{ color: '#c0392b', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        {error}
                      </p>
                    )}
                    <button
                      onClick={handleCheckout}
                      disabled={attendees.length === 0 || loading}
                      className="btn-checkout primary-button w-inline-block"
                      style={{
                        border: 'none',
                        opacity: attendees.length === 0 || loading ? 0.6 : 1,
                        cursor: attendees.length === 0 || loading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      <div>{loading ? 'Redirecting...' : 'Proceed to Checkout'}</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
