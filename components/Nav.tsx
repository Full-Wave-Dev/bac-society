'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className={`${transparent ? 'transparent-nav' : ''} w-nav`}
    >
      <div className="navigation-wrap">
        <Link href="/" className={`logo-link w-nav-brand${pathname === '/' ? ' w--current' : ''}`}>
          <img
            src="/images/BacTransparent.png"
            width={159}
            sizes="(max-width: 479px) 77vw, 159px"
            srcSet="/images/BacTransparent-p-500.png 500w, /images/BacTransparent-p-800.png 800w, /images/BacTransparent.png 912w"
            alt="Bacchanalian Wine Society"
            className="logo-image"
          />
        </Link>
        <div className="menu">
          <nav
            role="navigation"
            className="navigation-items w-nav-menu"
            {...(menuOpen ? { 'data-nav-menu-open': '' } : {})}
          >
            <Link
              href="/events"
              className={`navigation-item w-nav-link${pathname === '/events' ? ' w--current' : ''}`}
              onClick={() => setMenuOpen(false)}
            >Next Event</Link>
            <Link
              href="/gallery"
              className={`navigation-item w-nav-link${pathname === '/gallery' ? ' w--current' : ''}`}
              onClick={() => setMenuOpen(false)}
            >Gallery</Link>
            <Link
              href="/contact"
              className={`navigation-item w-nav-link${pathname === '/contact' ? ' w--current' : ''}`}
              onClick={() => setMenuOpen(false)}
            >Contact</Link>
          </nav>
          <button
            className={`menu-button w-nav-button${menuOpen ? ' w--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img src="/images/menu-icon_1menu-icon.png" width={22} alt="" className="menu-icon" />
          </button>
        </div>
        <Link href="/tickets" className="primary-button cc-contact-us w-inline-block">
          <div>Buy Tickets</div>
        </Link>
      </div>
    </div>
  )
}
