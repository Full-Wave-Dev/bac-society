import Link from 'next/link'

export default function Footer() {
  return (
    <div className="section">
      <div className="container">
        <div className="footer-wrap">
          <Link href="/" className="footer-item w-inline-block">
            <img
              src="/assets/681ad62f25ca69d173eeeb9f_BacTransparent.png"
              loading="lazy"
              width={198}
              sizes="(max-width: 479px) 100vw, 198px"
              alt=""
              srcSet="/assets/681ad62f25ca69d173eeeb9f_BacTransparent-p-500.png 500w, /assets/681ad62f25ca69d173eeeb9f_BacTransparent-p-800.png 800w, /assets/681ad62f25ca69d173eeeb9f_BacTransparent.png 912w"
              className="footerimg"
            />
          </Link>
          <div className="footer-item">
            <p className="footertitle">Navigation</p>
            <Link href="/" className="footerlink">Home</Link>
            <Link href="/events" className="footerlink">Events</Link>
            <Link href="/gallery" className="footerlink">Gallery</Link>
            <Link href="/contact" className="footerlink">Contact</Link>
          </div>
          <div className="footer-item">
            <p className="footertitle">Socials</p>
            <a href="https://www.facebook.com/CincyBacchus/" target="_blank" rel="noreferrer" className="footerlink">Facebook</a>
            <a href="https://www.instagram.com/cincybacchanalian" target="_blank" rel="noreferrer" className="footerlink btmmargin">Instagram</a>
            <p className="footertitle">Contact</p>
            <a href="mailto:ohiobacchanaliansociety@gmail.com" className="footerlink">ohiobacchanaliansociety@gmail.com</a>
            <Link href="/contact" className="footerlink">Contact Form</Link>
          </div>
        </div>
        <div className="footer-btm-wrap">
          <div className="footer-btm-text">
            Website By{' '}
            <a href="https://www.fullwavedev.com/about-us" target="_blank" rel="noreferrer" className="footer-btm-link">Trevor Imhoff</a>
            {' '}| © 2026 Bacchanlian Wine Society  |{' '}
            <a href="#" className="footer-btm-link">Terms of Service</a>
            {' '}|{' '}
            <a href="#" className="footer-btm-link">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}
