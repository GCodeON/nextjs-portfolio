import '../assets/scss/global.scss'
import Script from 'next/script'

export const metadata = {
  title: 'GS | Gerardo Soto',
  description: 'Gerardo Soto portfolio showcasing full-stack development projects and experience.',
  openGraph: {
    title: 'GS | Gerardo Soto',
    description: 'Gerardo Soto portfolio showcasing full-stack development projects and experience.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GS | Gerardo Soto',
    description: 'Gerardo Soto portfolio showcasing full-stack development projects and experience.'
  },
  icons: {
    icon: '/favicon.ico'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }) {
  const typekitStylesheets = 'https://use.typekit.net/xjr3lgi.css,https://use.typekit.net/kxo3pgz.css'

  return (
    <html lang="en">
      <body className="app-loading">
        <Script
          id="typekit-async-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var hrefs='${typekitStylesheets}'.split(',');var head=document.head||document.getElementsByTagName('head')[0];if(!head)return;var preconnect1=document.createElement('link');preconnect1.rel='preconnect';preconnect1.href='https://use.typekit.net';head.appendChild(preconnect1);var preconnect2=document.createElement('link');preconnect2.rel='preconnect';preconnect2.href='https://p.typekit.net';preconnect2.crossOrigin='anonymous';head.appendChild(preconnect2);for(var i=0;i<hrefs.length;i++){var href=hrefs[i];if(!href)continue;var link=document.createElement('link');link.rel='stylesheet';link.href=href;head.appendChild(link);}})();`
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css" />
          <link rel="stylesheet" href="https://use.typekit.net/kxo3pgz.css" />
        </noscript>
        {children}
      </body>
    </html>
  )
}
