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
      <body className="app-loading">{children}</body>
    </html>
  )
}
