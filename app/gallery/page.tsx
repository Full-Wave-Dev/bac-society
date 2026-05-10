import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery - Bacchanalian Society',
  description: 'Photos from Bacchanalian Society of Ohio wine tasting events in Cincinnati.',
}

const galleryImages = [
  { src: '682107e98a86dfe244fddb7e_img1.jpg', alt: 'Event photo 1' },
  { src: '682107e953e7576792a5237b_img2.jpg', alt: 'Event photo 2' },
  { src: '682107e9a86fdf2e60579362_img3.jpg', alt: 'Event photo 3' },
  { src: '682107e980bf9f20025eae82_img4.jpg', alt: 'Event photo 4' },
  { src: '682107e99a298d11ce9d3be8_img5.jpg', alt: 'Event photo 5' },
  { src: '682107e9e00afadb49f841a7_img6.jpg', alt: 'Event photo 6' },
  { src: '682107e96f39677a71bfe8de_img7.jpg', alt: 'Event photo 7' },
  { src: '682107ead973842c02c9513f_img8.jpg', alt: 'Event photo 8' },
  { src: '682107ea78179d3909d26094_img9.jpg', alt: 'Event photo 9' },
]

export default function GalleryPage() {
  return (
    <div className="section cc-store-home-wrap">
      <div className="intro-header cc-subpage">
        <Nav />
        <div className="introwrap">
          <div className="intro-content">
            <div className="intro-text">
              <h1 className="heading-jumbo">Gallery<br /></h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home-content-wrap">
          <div className="home-section-wrap">
            <div className="label cc-light">Gallery</div>
            <h2 className="section-heading">Images of Our Events</h2>
            <div className="gallery-wrap">
              {galleryImages.map((image) => (
                <img
                  key={image.src}
                  src={`/assets/${image.src}`}
                  alt={image.alt}
                  className="img"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
