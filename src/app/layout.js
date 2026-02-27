import '../assets/scss/global.scss'

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

export default function RootLayout({ children }) {
  const typekitStylesheets = [
    'https://use.typekit.net/xjr3lgi.css',
    'https://use.typekit.net/kxo3pgz.css'
  ]

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        {typekitStylesheets.map((href) => (
          <link key={`preload-${href}`} rel="preload" href={href} as="style" />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var hrefs = ${JSON.stringify(typekitStylesheets)};
                var head = document.head || document.getElementsByTagName('head')[0];

                for (var i = 0; i < hrefs.length; i++) {
                  var link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = hrefs[i];
                  head.appendChild(link);
                }
              })();
            `
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/xjr3lgi.css" />
          <link rel="stylesheet" href="https://use.typekit.net/kxo3pgz.css" />
        </noscript>
      </head>
      <body className="app-loading">{children}</body>
    </html>
  )
}
