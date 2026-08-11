import type { Metadata } from 'next'
import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tickets - Bacchanalian Society',
  description: 'Buy tickets to Fall Tasting 2026 — October 1, 2026 at Elm Street Plaza, Cincinnati, OH.',
}

const STRIPE_BUY_BUTTON_ID = 'buy_btn_1TP7H7FdDoxRxsAYF7KeQaRw'
const STRIPE_PUBLISHABLE_KEY =
  'pk_live_51RO3OrFdDoxRxsAY2pPb00TiTpJO4hN9085dvvNsS1HCPlgi2v9qdt38C68LYJyRs0F3bNlj002A73AQKWwLLo1400C657xe4B'

export default function TicketsPage() {
  return (
    <div className="section cc-store-home-wrap">
      <Nav transparent />
      <div className="container">
        <div className="home-content-wrap">
          <div className="home-section-wrap">
            <div className="label cc-light">Tickets</div>
            <h2 className="section-heading">Buy Tickets</h2>

            {/* Event info */}
            <div className="ticket-card" style={{ marginBottom: '2rem' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2' }}>
                <li><strong>Event:</strong> Fall Tasting 2026</li>
                <li><strong>Date:</strong> October 1, 2026</li>
                <li><strong>Location:</strong> Elm Street Plaza, Cincinnati, OH</li>
                <li><strong>Varietal:</strong> Pinot Grigio</li>
                <li><strong>Price:</strong> $30 per person</li>
              </ul>
            </div>

            {/* Stripe Buy Button — checkout is hosted by Stripe */}
            <div style={{ marginBottom: '2rem' }}>
              <Script src="https://js.stripe.com/v3/buy-button.js" strategy="afterInteractive" />
              <stripe-buy-button
                buy-button-id={STRIPE_BUY_BUTTON_ID}
                publishable-key={STRIPE_PUBLISHABLE_KEY}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
