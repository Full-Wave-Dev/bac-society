import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - Bacchanalian Society',
  description: 'View images of our events and understand what we are about.',
}

export default function GalleryPage() {
  return (
    <>
      <Nav transparent />
      <div className="section">
        <div className="container no-pad">
          <div className="section-heading-wrap">
            <div className="label cc-light">Gallery<br /></div>
            <h2>Images of Our Events<br /></h2>
          </div>
          <div className="w-layout-grid team-members">
            <div className="div-block">
              <div className="gallery-pic img1 _1"></div>
            </div>
            <div className="div-block">
              <div className="gallery-pic img1 _2"></div>
            </div>
            <div className="div-block">
              <div className="gallery-pic img1 _4"></div>
            </div>
            <div className="div-block">
              <div className="gallery-pic img1 _5"></div>
            </div>
            <div className="div-block">
              <div className="gallery-pic img1 _3"></div>
            </div>
            <div className="div-block">
              <div className="gallery-pic img1 _6"></div>
            </div>
            <div className="div-block">
              <div className="gallery-pic img1"></div>
            </div>
            <div>
              <div className="gallery-pic img2"></div>
            </div>
            <div>
              <div className="gallery-pic img3"></div>
            </div>
            <div>
              <div className="gallery-pic img4"></div>
            </div>
            <div>
              <div className="gallery-pic img5"></div>
            </div>
            <div>
              <div className="gallery-pic img6"></div>
            </div>
            <div>
              <div className="gallery-pic img7"></div>
            </div>
            <div>
              <div className="gallery-pic img8"></div>
            </div>
            <div>
              <div className="gallery-pic img9"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="section cc-cta">
        <div className="container">
          <div className="cta-wrap">
            <div>
              <div className="cta-text">
                <div className="heading-jumbo-small">Fall Tasting 2026<br /></div>
                <div className="paragraph-bigger cc-bigger-light">October 1, 2026 · 7pm–10pm<br />Elm Street Plaza<br />Pinot Grigio<br /></div>
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
