/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // unpdf bundles a precompiled pdfjs build and works on Node + Edge +
  // Cloudflare Workers without a separate worker file. No external-package
  // hint required — kept clean to avoid bundling surprises.

  // Permanent 308 redirects for retired URLs. /membership was renamed
  // to /pro on 5/26 because "membership" no longer describes the offer
  // (we sell Pro, an upgrade tier, not a club). Any existing link
  // anywhere (search results, old emails, bookmarks, Stripe legacy
  // sessions, social posts) lands on /pro instead of 404'ing.
  async redirects() {
    return [
      {
        source: '/membership',
        destination: '/pro',
        permanent: true,
      },
      {
        source: '/membership/:path*',
        destination: '/pro/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
