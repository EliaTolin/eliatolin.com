import { siteConfig } from '@/config/site'
import { type Locale } from '@/i18n/routing'

const descriptions: Record<Locale, string> = {
  it: 'Computer scientist e imprenditore. Costruisco prodotti digitali e affianco le aziende come sviluppatore e consulente.',
  en: 'Computer scientist and entrepreneur. I build digital products and work with companies as a developer and consultant.',
}

/** Person + WebSite structured data for search engines. */
export function JsonLd({ locale }: { locale: Locale }) {
  const person = {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: 'Elia Tolin',
    url: siteConfig.url,
    image: `${siteConfig.url}/photos/elia.jpg`,
    jobTitle: 'Computer Scientist',
    description: descriptions[locale],
    birthPlace: { '@type': 'Place', name: 'Sanremo, Italia' },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Università degli Studi di Modena e Reggio Emilia',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Builtdifferent',
        url: siteConfig.links.builtdifferent,
      },
      { '@type': 'Organization', name: 'Ermanno', url: siteConfig.links.ermanno },
      { '@type': 'Organization', name: 'Aurora Digital', url: siteConfig.links.aurora },
    ],
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: locale === 'it' ? 'it-IT' : 'en-US',
    publisher: { '@id': `${siteConfig.url}/#person` },
  }

  const data = { '@context': 'https://schema.org', '@graph': [person, website] }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
