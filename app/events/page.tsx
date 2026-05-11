import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EventSlider from '@/components/EventSlider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events - Bacchanalian Society',
  description: 'Check out our events coming up. Info about our events is available as well as purchasing tickets.',
}

export default function EventsPage() {
  return (
    <>
      <Nav transparent />

      <div className="section cc-store-home-wrap">
        <div className="container">
          <div className="home-content-wrap">
            <div className="w-layout-grid about-grid smaller">
              <div>
                <div className="home-section-wrap">
                  <div className="label cc-light">Event</div>
                  <h2 className="section-heading">Cincinnati&apos;s premier young professional wine tasting</h2>
                  <p className="paragraph-light">
                    Cincinnati&apos;s premier young professional wine tasting event is an unforgettable night featuring{' '}
                    <span className="link">Sauvignon Blanc wine</span>, live music from Jon Jon, and food samples. The Bacchanalian Society&apos;s signature event is a blind wine tasting where participants sample wine throughout the night and vote for their favorite while each bottle&apos;s brand name is hidden. This event brings together wine enthusiasts, philanthropists, foodies, and young professionals to network, mingle, and raise money for Charity.
                  </p>
                </div>
                <div className="ticketsembedwrap" style={{ marginTop: '2rem' }}>
                  <Link href="/tickets" className="primary-button cc-jumbo-button w-inline-block">
                    <div>Buy Tickets</div>
                  </Link>
                </div>
              </div>
              <img
                src="/images/DSC09592-1.jpg"
                sizes="(max-width: 828px) 100vw, 828px"
                srcSet="/images/DSC09592-1-p-500.jpg 500w, /images/DSC09592-1-p-800.jpg 800w, /images/DSC09592-1.jpg 828w"
                alt=""
                className="img"
              />
            </div>
          </div>
        </div>
      </div>

      <EventSlider />

      <section data-copilot="true" className="section-2">
        <div className="container-2">
          <div className="utility-max-width-lg utility-margin-bottom-4rem">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="flex-horizontal flex-vertical flex-gap-sm">
            <div className="divider-2">
              <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                <div className="h4-heading">What is the Bacchanalian Society of Ohio?</div>
                <div className="rich-text-2 paragraph-lg w-richtext">
                  <p>The Bacchanalian Society of Ohio is a 501(c)3 non-profit organization whose mission is to bring together young professionals, philanthropists, wine lovers, and community leaders together through blind wine tasting events to raise money for charitable causes in the Cincinnati community.</p>
                </div>
              </div>
            </div>
            <div className="divider-2">
              <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                <div className="h4-heading">How does the event work?</div>
                <div className="rich-text-2 paragraph-lg w-richtext">
                  <p>Participants will choose to register as an individual, with a friend, or as a team of three. Each team of 1, 2, or 3 guests will donate 3 identical bottles of Sauvignon Blanc that will be bagged &amp; blindly sampled throughout the night. Participants will vote while sampling to see which team wins!</p>
                </div>
              </div>
            </div>
            <div className="divider-2">
              <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                <div className="h4-heading">What do I need to bring to the event?</div>
                <div className="rich-text-2 paragraph-lg w-richtext">
                  <p>Each ticket buyer needs to form a team of 1, 2, or 3 people and bring three identical bottles of Sauvignon Blanc wine per team. The wine donation will be sampled throughout the evening.</p>
                </div>
              </div>
            </div>
            <div className="divider-2">
              <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                <div className="h4-heading">Can someone attend on their own?</div>
                <div className="rich-text-2 paragraph-lg w-richtext">
                  <p>Yes! Teams at the event are made up of 1, 2 or 3 guests so you can register and make new friends when you arrive. Individual guests still need to bring three identical bottles of Sauvignon Blanc wine.</p>
                </div>
              </div>
            </div>
            <div className="divider-2">
              <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                <div className="h4-heading">How old do you have to be to attend?</div>
                <div className="rich-text-2 paragraph-lg w-richtext">
                  <p>Our events are 21+ and require ID at the door.</p>
                </div>
              </div>
            </div>
            <div className="divider-2">
              <div className="w-layout-grid grid-layout mobile-landscape-1-column grid-gap-sm">
                <div className="h4-heading">What is the availability of parking?</div>
                <div className="rich-text-2 paragraph-lg w-richtext">
                  <p>Parking is avaliable throughout Ault Park. Please drink responsibility and consider carpooling with a designated driver or calling an Uber or Lyft.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
