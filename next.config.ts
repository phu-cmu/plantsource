import type { NextConfig } from 'next'

const CANONICAL_HOST = 'plantsourcewholesale.com'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      // Product and story images uploaded through the admin (originals can be several MB).
      { protocol: 'https', hostname: 'api.plantsourcewholesale.com', pathname: '/storage/**' },
      { protocol: 'http', hostname: 'localhost', port: '8000', pathname: '/storage/**' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Upstream images send max-age=0; keep optimized copies for 30 days instead of 60 seconds.
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return [
      {
        // www → apex, so only one hostname gets indexed (also add this in nginx; see SEO notes).
        source: '/:path*',
        has: [{ type: 'host', value: `www.${CANONICAL_HOST}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Static images / PDF in /public: cache in browsers for 7 days, then revalidate.
        source: '/plant/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/og-image.jpg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ]
  },
}

export default nextConfig
