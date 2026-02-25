import Script from 'next/script'
import '../assets/scss/global.scss'

export const metadata = {
  title: 'GS | Gerardo Soto',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css" />
        <link rel="stylesheet" href="https://use.typekit.net/kxo3pgz.css" />
      </head>
      <body>
        <Script src="https://use.typekit.net/kxo3pgz.js" strategy="beforeInteractive" />
        <Script
          id="typekit-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: 'try{Typekit.load({ async: true });}catch(e){}'
          }}
        />
        {children}
      </body>
    </html>
  )
}
