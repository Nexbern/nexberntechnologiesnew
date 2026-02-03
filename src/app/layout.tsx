import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nexbern - IT Solutions',
  description: 'Professional IT Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.png" />
        <link rel="stylesheet" href="/assets/css/app.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body>
        {children}

        <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/app.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}