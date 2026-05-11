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
}

export default nextConfig
