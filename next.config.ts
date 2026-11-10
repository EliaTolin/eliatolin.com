import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/**
 * Security headers applied to every response.
 *
 * These live here rather than in `proxy.ts` on purpose: the site is fully
 * static-prerendered (`x-nextjs-prerender: 1`), and a per-request CSP nonce
 * would force dynamic rendering and throw that away. Static headers keep the
 * prerender intact.
 *
 * `script-src`/`style-src` need `'unsafe-inline'`: Next injects an inline
 * bootstrap script, and `json-ld.tsx` renders inline JSON-LD. The directive
 * still blocks every off-origin script, which is the attack this actually
 * defends against.
 *
 * The one third-party origin is app.cal.com, for the booking calendar embedded
 * on /call (see `booking-calendar.tsx`). The privacy page discloses it; no
 * other page loads anything from it.
 *
 * stats.auroradigital.it is the self-hosted Umami instance (cookieless page
 * analytics), loaded on every page from the locale layout.
 */
const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // React needs eval() in development only (callstack reconstruction).
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://app.cal.com https://stats.auroradigital.it`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://app.cal.com https://stats.auroradigital.it",
      'frame-src https://app.cal.com',
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig: NextConfig = {
  // Emits a self-contained server bundle in .next/standalone, which is what the
  // Dockerfile ships to Coolify. Keep this on.
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    // WebP only (Next's default). AVIF was dropped: on the production server
    // one AVIF encode of the hero photo hung, and Next shares in-flight encodes
    // per variant, so every request for it hung too — the portrait never loaded.
    formats: ['image/webp'],
  },
  headers() {
    return Promise.resolve([{ source: '/:path*', headers: securityHeaders }])
  },
  // Pin the workspace root: without it Turbopack walks up and picks a lockfile
  // outside the project.
  turbopack: {
    root: import.meta.dirname,
  },
}

export default withNextIntl(nextConfig)
