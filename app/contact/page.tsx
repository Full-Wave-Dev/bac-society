'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: 'Contact Form', message }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setName(''); setEmail(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Nav />
      <div className="section">
        <div className="container">
          <div className="w-layout-grid contact-form-grid">
            <div className="contact-form-wrap">
              <div className="contact-form-heading-wrap">
                <h2 className="contact-heading">Contact us</h2>
                <div className="paragraph-light">
                  Any questions or concerns about an upcoming events? Fill out the form below or email us and we will get back to you as soon as possible.
                </div>
              </div>
              <div className="contact-form w-form">
                {status === 'success' ? (
                  <div className="status-message cc-success-message w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="get-in-touch-form">
                    <label htmlFor="Name">Name</label>
                    <input
                      className="text-field cc-contact-field w-input"
                      maxLength={256}
                      name="name"
                      placeholder="Enter your name"
                      type="text"
                      id="Name"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor="Email">Email Address</label>
                    <input
                      className="text-field cc-contact-field w-input"
                      maxLength={256}
                      name="Email"
                      placeholder="Enter your email"
                      type="email"
                      id="Email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="Message">Message</label>
                    <textarea
                      id="Message"
                      name="Message"
                      placeholder="Hey there, I was meaning to ask..."
                      maxLength={5000}
                      required
                      className="text-field cc-textarea cc-contact-field w-input"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                    {status === 'error' && (
                      <div className="status-message cc-error-message w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="primary-button w-button"
                      style={{ border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                    >
                      {status === 'loading' ? 'Please wait...' : 'Submit'}
                    </button>
                  </form>
                )}
              </div>
            </div>
            <div>
              <div className="details-wrap">
                <div className="label">CONTACT</div>
                <a href="mailto:ohiobacchanaliansociety@gmail.com" className="contact-email-link">
                  ohiobacchanaliansociety@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section cc-cta">
        <div className="container">
          <div className="cta-wrap">
            <div>
              <div className="cta-text">
                <div className="heading-jumbo-small">Next Event<br /></div>
                <div className="paragraph-bigger cc-bigger-light">June 25, 2026 <br />Ault park<br />Sauvignon Blanc<br /></div>
              </div>
              <Link href="/events" className="primary-button cc-jumbo-button w-inline-block">
                <div>View Info</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
