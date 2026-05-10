import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Bacchanalian Society',
  description: 'The Bacchanalian Society of Ohio is a Cincinnati based non-profit that brings together young professionals over wine to mix, mingle, and raise money for worthy causes.',
  openGraph: {
    title: 'Bacchanalian Society',
    description: 'The Bacchanalian Society of Ohio is a Cincinnati based non-profit that brings together young professionals over wine to mix, mingle, and raise money for worthy causes.',
    images: ['/assets/68288f0aac8c8f27567b5e10_Meta Thumbnail.png'],
  },
  twitter: { card: 'summary_large_image', title: 'Bacchanalian Society' },
  icons: {
    icon: '/assets/682269ec9846fae1ae77963d_Group 1.png',
    apple: '/assets/68226a035ee751c35ac783b2_Group 1 (2).png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/css/bac-society.shared.v2.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="beforeInteractive" />
        <Script id="webfont-load" strategy="beforeInteractive">{`WebFont.load({google:{families:["Merriweather:300,300italic,400,400italic,700,700italic,900,900italic","Instrument Sans:300,400,500,600,700"]}});`}</Script>
        <Script id="wf-touch" strategy="beforeInteractive">{`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`}</Script>
      </head>
      <body>
        {children}
        <Script src="/js/jquery-3.5.1.min.dc5e7f18c8.js" strategy="beforeInteractive" />
        <Script src="/assets/js/bac-society.schunk.6a83f24a1a67dfcd.js" strategy="afterInteractive" />
        <Script src="/assets/js/bac-society.a9ba356d.d2f30196489a2709.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
