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
    github: 'https://github.com/EliaTolin',
    linkedin: 'https://www.linkedin.com/in/eliatolin/',
    repository: 'https://github.com/EliaTolin/eliatolin.com',
  },
} as const

export type SiteConfig = typeof siteConfig
