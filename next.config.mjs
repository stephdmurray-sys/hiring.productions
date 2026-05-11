/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // pdf-parse depends on pdfjs-dist's worker, which webpack/turbopack can't
  // bundle correctly because it's loaded via dynamic import at runtime.
  // Marking these as external means Next will `require()` them from
  // node_modules at runtime instead of bundling — the relative worker
  // resolution works normally.
  serverExternalPackages: ['pdf-parse', 'pdfjs-dist'],
}

export default nextConfig
