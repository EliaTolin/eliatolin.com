import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Next.js 16 renamed Middleware to Proxy — same runtime, new filename.
const handleI18n = createMiddleware(routing)

const CANONICAL_HOST = 'eliatolin.com'

// Hosts that must 301 to the canonical domain (alternate TLD and www).
const REDIRECT_HOSTS = new Set([
  'eliatolin.it',
  'www.eliatolin.it',
  `www.${CANONICAL_HOST}`,
])

export default function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() ?? ''

  if (REDIRECT_HOSTS.has(host)) {
    const url = new URL(request.url)
    url.protocol = 'https:'
    url.host = CANONICAL_HOST
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  return handleI18n(request)
}

export const config = {
  // Match everything except Next internals, the API routes and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
