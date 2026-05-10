'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

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
        <Link href="/" className={`logo-link w-nav-brand${isHome ? ' w--current' : ''}`}>
          <img
            src="/assets/681ad62f25ca69d173eeeb9f_BacTransparent.png"
            width={159}
            sizes="(max-width: 479px) 77vw, 159px"
            srcSet="/assets/681ad62f25ca69d173eeeb9f_BacTransparent-p-500.png 500w, /assets/681ad62f25ca69d173eeeb9f_BacTransparent-p-800.png 800w, /assets/681ad62f25ca69d173eeeb9f_BacTransparent.png 912w"
            alt="Bacchanalian Wine Society"
            className="logo-image"
          />
        </Link>
        <div className="menu">
          <nav role="navigation" className="navigation-items w-nav-menu">
            <Link href="/events" className={`navigation-item w-nav-link${pathname === '/events' ? ' w--current' : ''}`}>Next Event</Link>
            <Link href="/gallery" className={`navigation-item w-nav-link${pathname === '/gallery' ? ' w--current' : ''}`}>Gallery</Link>
            <Link href="/contact" className={`navigation-item w-nav-link${pathname === '/contact' ? ' w--current' : ''}`}>Contact</Link>
          </nav>
          <div className="menu-button w-nav-button">
            <img src="/assets/681acf63f3dbf881a1bfa34b_menu-icon.png" width={22} alt="" className="menu-icon" />
          </div>
        </div>
        <Link href="/tickets" className="primary-button cc-contact-us w-inline-block">
          <div>Buy Tickets</div>
        </Link>
      </div>
    </div>
  )
}
