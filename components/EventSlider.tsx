'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const slides = [
  { src: '/images/DSC00341-1_1.avif', alt: '' },
  { src: '/images/DSC09832-1_1.avif', alt: '' },
  { src: '/images/DSC09719-1_1.avif', alt: '' },
  { src: '/images/DSC09767-1_1.avif', alt: '' },
  { src: '/images/DSC09356-1_1.avif', alt: '' },
  { src: '/images/DSC09438-1_1.avif', alt: '' },
  { src: '/images/DSC09505-1_1.avif', alt: '' },
  { src: '/images/DSC09481-1_1.avif', alt: '' },
]

export default function EventSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 2000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div className="section cc-store-home-wrap">
      <div className="container">
        <div className="home-content-wrap">
          <div className="slider w-slider" style={{ minHeight: 600, backgroundColor: 'transparent', position: 'relative' }}>
            <div className="slide-mask w-slider-mask" style={{ aspectRatio: '1', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>
              <div className="slider-img-wrap" style={{ position: 'absolute', inset: 0 }}>
                <img
                  src={slides[current].src}
                  alt={slides[current].alt}
                  className="slider-img"
                  loading="lazy"
                />
              </div>
            </div>
            <button
              className="w-slider-arrow-left"
              onClick={prev}
              aria-label="Previous slide"
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: '10px 16px' }}
            >
              <div className="icon w-icon-slider-left" />
            </button>
            <button
              className="w-slider-arrow-right"
              onClick={next}
              aria-label="Next slide"
              style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: '10px 16px' }}
            >
              <div className="icon-2 w-icon-slider-right" />
            </button>
          </div>
          <div className="button-wrapper center">
            <Link href="/gallery" className="primary-button cc-jumbo-button showfirst w-inline-block">
              <div>View Gallery</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
