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

  const response = handleI18n(request)

  // next-intl issues its locale-prefix normalisation (`/it` -> `/`) as a 307,
  // because `NextResponse.redirect` defaults to that. The rule never changes,
  // so 301 is the honest status: it tells crawlers to stop re-checking `/it`
  // and to consolidate its signals onto `/`.
  //
  // Scoped narrowly to same-origin 307s so any other redirect next-intl might
  // introduce later stays temporary by default.
  if (response.status === 307) {
    const location = response.headers.get('location')
    if (location) {
      const target = new URL(location, request.url)
      if (target.origin === new URL(request.url).origin) {
        return NextResponse.redirect(target, { status: 301, headers: response.headers })
      }
    }
  }

  return response
}

export const config = {
  // Match everything except Next internals, the API routes, the Simple
  // Analytics proxy paths and static files. `/simple/*` has no file extension,
  // so without the explicit exclusion next-intl would try to locale-prefix the
  // analytics event queue and break it.
  matcher: ['/((?!api|_next|_vercel|simple|.*\\..*).*)'],
}
