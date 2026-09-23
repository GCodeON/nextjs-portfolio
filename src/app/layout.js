import '../assets/scss/global.scss'
import AppReady from '@/components/app-ready'
import SiteNav from '@/components/site-nav'

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
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css" />
        <link rel="stylesheet" href="https://use.typekit.net/kxo3pgz.css" />
      </head>
      <body className="app-loading">
        <AppReady />
        <SiteNav />
        {children}
      </body>
    </html>
  )
}
