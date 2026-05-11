import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bacchanalian Society',
  description: 'The Bacchanalian Society of Ohio is a Cincinnati based non-profit that brings together young professionals over wine to mix, mingle, and raise money for worthy causes.',
  openGraph: {
    title: 'Bacchanalian Society',
    description: 'The Bacchanalian Society of Ohio is a Cincinnati based non-profit that brings together young professionals over wine to mix, mingle, and raise money for worthy causes.',
    images: ['/images/Meta-Thumbnail.png'],
  },
  twitter: { card: 'summary_large_image', title: 'Bacchanalian Society' },
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/webclip.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/components.css" />
        <link rel="stylesheet" href="/css/bac-society.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" strategy="beforeInteractive" />
        <Script id="webfont-load" strategy="beforeInteractive">{`WebFont.load({google:{families:["Merriweather:300,300italic,400,400italic,700,700italic,900,900italic","Instrument Sans:300,400,500,600,700"]}});`}</Script>
        <Script id="wf-touch" strategy="beforeInteractive">{`!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`}</Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-4TD86T0YED" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('set', 'developer_id.dZGVlNj', true);gtag('js', new Date());gtag('config', 'G-4TD86T0YED');`}</Script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
