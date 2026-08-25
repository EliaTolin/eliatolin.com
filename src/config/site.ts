/**
 * Single source of truth for site-wide, non-translatable values.
 * Anything user-facing and language-dependent belongs in messages/*.json instead.
 *
 * This repository is public: never put secrets or private data here.
 */
export const siteConfig = {
  name: 'Elia Tolin',
  domain: 'eliatolin.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eliatolin.com',
  // Official public contact address.
  email: 'elia.tolin@auroradigital.it',
  links: {
    github: 'https://github.com/eliatolin',
    linkedin: 'https://it.linkedin.com/in/eliatolin',
    repository: 'https://github.com/EliaTolin/eliatolin.com',
    builtdifferent: 'https://builtdifferent.it',
    ermanno: 'https://ermannologistica.it',
    aurora: 'https://auroradigital.it',
    flutterModena: 'https://www.meetup.com/flutter-modena/',
    remoteCaching: 'https://pub.dev/packages/remote_caching',
    statusVaccini: 'https://github.com/EliaTolin/StatusVaccini',
    supawho: 'https://github.com/EliaTolin/supawho',
    tepio: 'https://trytepio.com',
    ztlElettrica: 'https://ztlelettrica.it',
  },
} as const

export type SiteConfig = typeof siteConfig
