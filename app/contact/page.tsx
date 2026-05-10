'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error('Something went wrong. Please try again.')
      }

      setStatus('success')
      setForm({ name: '', email: '', subject: 'General Inquiry', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className="section cc-store-home-wrap">
      <div className="intro-header cc-subpage">
        <Nav />
        <div className="introwrap">
          <div className="intro-content">
            <div className="intro-text">
              <h1 className="heading-jumbo">Contact<br /></h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home-content-wrap">
          <div className="home-section-wrap">
            <div className="label cc-light">Contact</div>
            <h2 className="section-heading">Get In Touch</h2>
            <p className="paragraph-light">
              Have a question about our events, interested in partnering, or just want to learn more? Send us a message and we&apos;ll get back to you.
            </p>

            {status === 'success' ? (
              <div style={{ marginTop: '2rem', padding: '2rem', background: '#f0f7f0', borderLeft: '4px solid #4a7c4e' }}>
                <h3 style={{ margin: '0 0 0.5rem', color: '#2d5a30' }}>Message Sent!</h3>
                <p style={{ margin: 0, color: '#2d5a30' }}>
                  Thank you for reaching out. We&apos;ll be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '2rem', maxWidth: '600px' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="text-field w-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="text-field w-input"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="text-field w-select"
                    style={{ width: '100%' }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Event Info">Event Info</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows={6}
                    className="text-field w-input"
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="primary-button w-inline-block"
                  style={{ opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer', border: 'none' }}
                >
                  <div>{status === 'loading' ? 'Sending...' : 'Send Message'}</div>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
