import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events - Bacchanalian Society',
  description: 'Upcoming blind wine tasting events hosted by the Bacchanalian Society of Ohio in Cincinnati.',
}

export default function EventsPage() {
  return (
    <div className="section cc-store-home-wrap">
      <div className="intro-header cc-subpage">
        <Nav />
        <div className="introwrap">
          <div className="intro-content">
            <div className="intro-text">
              <h1 className="heading-jumbo">Events<br /></h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home-content-wrap">
          <div className="home-section-wrap">
            <div className="label cc-light">Event</div>
            <h1 className="section-heading">June 25, 2026 — Ault Park</h1>
            <div className="w-layout-grid about-grid">
              <div id="w-node-event-info">
                <p className="paragraph-light">
                  Join the Bacchanalian Society of Ohio for an evening of blind wine tasting, networking, and philanthropy at the beautiful Ault Park in Cincinnati. Compete in our signature blind tasting format, mingle with young professionals, and help raise money for local nonprofit organizations.
                </p>
                <div className="home-section-wrap" style={{ marginTop: '2rem' }}>
                  <div className="label cc-light">Details</div>
                  <ul className="paragraph-light" style={{ listStyle: 'none', padding: 0, lineHeight: '2' }}>
                    <li><strong>Date:</strong> June 25, 2026</li>
                    <li><strong>Location:</strong> Ault Park, Cincinnati, OH</li>
                    <li><strong>Varietal:</strong> Sauvignon Blanc</li>
                    <li><strong>Tickets:</strong> $30 per person</li>
                  </ul>
                </div>
                <Link href="/tickets" className="primary-button w-inline-block" style={{ marginTop: '2rem', display: 'inline-block' }}>
                  <div>Buy Tickets</div>
                </Link>
              </div>
              <img
                src="/assets/68c720c81c366998943e5727_DSC09592 1.jpg"
                sizes="(max-width: 820px) 100vw, 820px"
                srcSet="/assets/68c720c81c366998943e5727_DSC09592 1-p-500.jpg 500w, /assets/68c720c81c366998943e5727_DSC09592 1-p-800.jpg 800w, /assets/68c720c81c366998943e5727_DSC09592 1.jpg 820w"
                alt="Bacchanalian Society event at Ault Park"
                className="img"
              />
            </div>
          </div>

          <div className="home-section-wrap" style={{ marginTop: '4rem' }}>
            <div className="label cc-light">Photos</div>
            <h2 className="section-heading">Event Gallery</h2>
            <div className="gallery-wrap">
              <img
                src="/assets/68c6f68af3599d418f1ccfb1_DSC00341 1.avif"
                sizes="(max-width: 820px) 100vw, 820px"
                srcSet="/assets/68c6f68af3599d418f1ccfb1_DSC00341 1-p-500.avif 500w, /assets/68c6f68af3599d418f1ccfb1_DSC00341 1-p-800.avif 800w, /assets/68c6f68af3599d418f1ccfb1_DSC00341 1.avif 820w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68be69ba234db0f7b1b_DSC09832 1.avif"
                sizes="(max-width: 820px) 100vw, 820px"
                srcSet="/assets/68c6f68be69ba234db0f7b1b_DSC09832 1-p-500.avif 500w, /assets/68c6f68be69ba234db0f7b1b_DSC09832 1-p-800.avif 800w, /assets/68c6f68be69ba234db0f7b1b_DSC09832 1.avif 820w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68b085a37dc80cf0555_DSC09719 1.avif"
                sizes="(max-width: 820px) 100vw, 820px"
                srcSet="/assets/68c6f68b085a37dc80cf0555_DSC09719 1-p-500.avif 500w, /assets/68c6f68b085a37dc80cf0555_DSC09719 1-p-800.avif 800w, /assets/68c6f68b085a37dc80cf0555_DSC09719 1.avif 820w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68b2646441b0d62ae91_DSC09767 1.avif"
                sizes="(max-width: 820px) 100vw, 500px"
                srcSet="/assets/68c6f68b2646441b0d62ae91_DSC09767 1-p-500.avif 500w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68ada1d1ea0ab97c6ef_DSC09356 1.avif"
                sizes="(max-width: 820px) 100vw, 500px"
                srcSet="/assets/68c6f68ada1d1ea0ab97c6ef_DSC09356 1-p-500.avif 500w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68afe2f7a5704218915_DSC09438 1.avif"
                sizes="(max-width: 820px) 100vw, 500px"
                srcSet="/assets/68c6f68afe2f7a5704218915_DSC09438 1-p-500.avif 500w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68a2851ae111d8a364e_DSC09505 1.avif"
                sizes="(max-width: 820px) 100vw, 820px"
                srcSet="/assets/68c6f68a2851ae111d8a364e_DSC09505 1-p-500.avif 500w, /assets/68c6f68a2851ae111d8a364e_DSC09505 1-p-800.avif 800w, /assets/68c6f68a2851ae111d8a364e_DSC09505 1.avif 820w"
                alt="Event photo"
                className="img"
              />
              <img
                src="/assets/68c6f68af6102be51525d9a0_DSC09481 1.avif"
                sizes="(max-width: 820px) 100vw, 500px"
                srcSet="/assets/68c6f68af6102be51525d9a0_DSC09481 1-p-500.avif 500w"
                alt="Event photo"
                className="img"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
