import type { MetadataRoute } from 'next'
import { localePath, routing } from '@/i18n/routing'
import { siteConfig } from '@/config/site'

// Every static route of the site, without its locale prefix.
const routes = [''] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}${localePath(locale, route)}`,
      lastModified: new Date(),
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
