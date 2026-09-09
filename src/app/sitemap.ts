import { execFileSync } from 'node:child_process'
import type { MetadataRoute } from 'next'
import { localePath, routing } from '@/i18n/routing'
import { siteConfig } from '@/config/site'

// Every static route of the site, without its locale prefix.
const routes = [''] as const

// Paths whose changes actually alter what the pages say.
const CONTENT_PATHS = ['messages', 'src']

/**
 * When the page content last genuinely changed.
 *
 * Deliberately NOT `new Date()`: that stamps every rebuild as a content change,
 * and Google discounts a `lastmod` it decides is unreliable — which makes the
 * signal worth nothing. Resolution order:
 *
 *  1. `SITE_LAST_MODIFIED` (ISO 8601) — set this as a build arg in Docker/Coolify,
 *     where `.git` is excluded from the build context.
 *  2. The last commit touching the content paths, for local `next build`.
 *  3. Nothing. Omitting `lastmod` is honest; a fabricated one is not.
 */
function lastContentChange(): Date | undefined {
  const fromEnv = process.env.SITE_LAST_MODIFIED
  if (fromEnv) {
    const parsed = new Date(fromEnv)
    if (!Number.isNaN(parsed.getTime())) return parsed
  }

  try {
    const iso = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...CONTENT_PATHS],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim()
    const parsed = new Date(iso)
    if (iso && !Number.isNaN(parsed.getTime())) return parsed
  } catch {
    // git unavailable (container build) — fall through.
  }

  return undefined
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = lastContentChange()

  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}${localePath(locale, route)}`,
      ...(lastModified ? { lastModified } : {}),
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${siteConfig.url}${localePath(l, route)}`]),
          ),
          'x-default': `${siteConfig.url}${localePath(routing.defaultLocale, route)}`,
        },
      },
    })),
  )
}
