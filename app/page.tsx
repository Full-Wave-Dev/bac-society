import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="section cc-store-home-wrap">
      <div className="intro-header">
        <Nav transparent />
        <div className="introwrap">
          <div className="intro-content cc-homepage">
            <div className="intro-text">
              <div className="paragraph-bigger cc-bigger-white-light">
                The Bacchanalian Society of Ohio is a Cincinnati based non-profit that brings together young professionals over wine to mix, mingle, and raise money for worthy causes. <br />
              </div>
            </div>
            <div className="buttom-wrapper">
              <Link href="/tickets" className="secondary-button borderdesign red w-inline-block"><div>Buy TIckets</div></Link>
              <Link href="/events" className="secondary-button borderdesign w-inline-block"><div>Upcoming Event</div></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home-content-wrap">
          <div className="w-layout-grid about-grid">
            <div id="w-node-about-1">
              <div className="home-section-wrap">
                <div className="label cc-light">About</div>
                <h2 className="section-heading">Who we are</h2>
                <p className="paragraph-light">The Bacchanalian Society of Ohio is a 501(c)3 non-profit organization whose mission is to bring together young professionals, philanthropists, wine lovers, and community leaders together through blind wine tasting events to raise money for charitable causes in the Cincinnati community.</p>
              </div>
            </div>
            <img src="/assets/6822589c4c0724e7f480a4a7_Bacchanalian-36 1.png" id="w-node-about-img" sizes="(max-width: 820px) 100vw, 820px" srcSet="/assets/6822589c4c0724e7f480a4a7_Bacchanalian-36 1-p-500.png 500w, /assets/6822589c4c0724e7f480a4a7_Bacchanalian-36 1-p-800.png 800w, /assets/6822589c4c0724e7f480a4a7_Bacchanalian-36 1.png 820w" alt="" className="img" />
          </div>
          <div className="w-layout-grid about-grid cc-about-2">
            <div id="w-node-events-1">
              <div className="home-section-wrap">
                <div className="label cc-light">Events</div>
                <h2 className="section-heading">What we do</h2>
                <p className="paragraph-light">The Bacchanalian Society host competitive wine tastings that bring together young professionals to network, mingle, and raise money for local nonprofit organizations.</p>
              </div>
            </div>
            <img src="/assets/682258e616e46faf74a9da86_Bacchanalian-2 1.jpg" id="w-node-events-img" sizes="(max-width: 820px) 100vw, 820px" srcSet="/assets/682258e616e46faf74a9da86_Bacchanalian-2 1-p-500.jpg 500w, /assets/682258e616e46faf74a9da86_Bacchanalian-2 1-p-800.jpg 800w, /assets/682258e616e46faf74a9da86_Bacchanalian-2 1.jpg 820w" alt="" className="img" />
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
              <Link href="/events" className="primary-button cc-jumbo-button w-inline-block"><div>View Info</div></Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
