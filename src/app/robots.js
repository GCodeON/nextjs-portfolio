export default function robots() {
  const baseUrl = 'https://gerardosoto.dev'

  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}
