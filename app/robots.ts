import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /admin and /api/admin are token-auth'd internal ops surfaces.
        // The endpoint will refuse unauthed requests anyway, but excluding
        // here also prevents the URL from appearing in search results.
        disallow: ['/api/', '/_next/', '/admin', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/admin/'],
      },
    ],
    sitemap: 'https://hiring.productions/sitemap.xml',
  }
}
