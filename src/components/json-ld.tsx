import { siteConfig } from '@/config/site'
import { localePath, type Locale } from '@/i18n/routing'

/**
 * Person + Organization + WebSite + WebPage + product structured data.
 *
 * The rule that shapes this file: a node whose `@id` is SHARED across both
 * locale pages (Person, WebSite, the Organizations) must never carry a literal
 * value that differs between the `/` and `/en` renders. One identifier
 * asserting two different facts is a contradiction, and a consumer merging by
 * `@id` resolves it arbitrarily — whichever page it crawled last wins.
 * Locale-specific text therefore lives only on the WebPage node, whose `@id`
 * is the page's own URL and so genuinely differs per locale.
 */

// Shared across locales — deliberately not translated per render.
const personDescription =
  'Computer scientist e imprenditore. Costruisco prodotti digitali e affianco le aziende come sviluppatore e consulente.'

const pageDescriptions: Record<Locale, string> = {
  it: 'Computer scientist e imprenditore. Costruisco prodotti digitali e affianco le aziende come sviluppatore e consulente.',
  en: 'Computer scientist and entrepreneur. I build digital products and work with companies as a developer and consultant.',
}

const orgDescriptions: Record<'aurora' | 'ermanno', Record<Locale, string>> = {
  aurora: {
    it: 'La mia attività di consulenza: sviluppo software su misura e formazione AI per i team delle aziende.',
    en: 'My consulting practice: custom software development and AI training for company dev teams.',
  },
  ermanno: {
    it: 'Le spedizioni si smistano da sole: dai DDT del gestionale ai mezzi, ai corrieri, alla dashboard.',
    en: 'Shipments dispatch themselves: from raw transport documents to trucks, couriers and one live dashboard.',
  },
}

type ProductType = 'SoftwareApplication' | 'SoftwareSourceCode'

type ProductNode = {
  name: string
  url: string
  type: ProductType
  /** Best-effort classification from the copy — not checked against a store listing. */
  applicationCategory?: string
  programmingLanguage?: string
  publisherOrgId?: string
  description: Record<Locale, string>
}

const products: ProductNode[] = [
  {
    name: 'Quiz Radioamatori',
    url: siteConfig.links.quizRadioamatori,
    type: 'SoftwareApplication',
    applicationCategory: 'EducationalApplication',
    description: {
      it: "L'app per l'esame da radioamatore che non esisteva negli store: l'ho scritta mentre studiavo per l'esame.",
      en: "The ham-radio exam app that didn't exist in the stores: I wrote it while studying for the exam myself.",
    },
  },
  {
    name: 'HamQRG',
    url: siteConfig.links.hamqrg,
    type: 'SoftwareApplication',
    applicationCategory: 'UtilitiesApplication',
    description: {
      it: 'I ripetitori radio intorno a te, in tutto il mondo. Gratuita, con un livello Pro opzionale.',
      en: 'Every radio repeater around you, anywhere in the world. Free, with an optional Pro tier.',
    },
  },
  {
    name: 'Tepio',
    url: siteConfig.links.tepio,
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    description: {
      it: 'Prepara le cold call con un brief AI per ogni chiamata. Lo usa ogni giorno il team di Ermanno.',
      en: 'Preps your cold calls with an AI brief for every conversation. The Ermanno team uses it daily.',
    },
  },
  {
    name: 'ZTL Elettrica',
    url: siteConfig.links.ztlElettrica,
    type: 'SoftwareApplication',
    applicationCategory: 'TravelApplication',
    description: {
      it: "Le ZTL e i parcheggi per le auto elettriche, città per città, su un'unica mappa. Gratis.",
      en: "Italy's limited-traffic zones and EV parking perks, city by city, on a single map. Free.",
    },
  },
  {
    name: 'Acetaia',
    url: siteConfig.links.acetaia,
    type: 'SoftwareApplication',
    applicationCategory: 'BusinessApplication',
    // acetaia.auroradigital.it is a subdomain of Aurora Digital's own domain:
    // real evidence of the publisher relationship, not an inference.
    publisherOrgId: `${siteConfig.links.aurora}/#organization`,
    description: {
      it: 'Le botti di aceto balsamico si gestivano su Excel o su carta. Ora no.',
      en: 'Balsamic vinegar barrels used to be managed on Excel or paper. Not anymore.',
    },
  },
  {
    name: 'remote_caching',
    url: siteConfig.links.remoteCaching,
    type: 'SoftwareSourceCode',
    programmingLanguage: 'Dart',
    description: {
      it: 'Pacchetto Flutter open source per la cache delle chiamate API remote, con durata configurabile.',
      en: 'An open-source Flutter package for caching remote API calls, with a configurable duration.',
    },
  },
  {
    name: 'Supawho',
    url: siteConfig.links.supawho,
    // Verified via the GitHub API (repos/EliaTolin/supawho.language) — Go, not Dart.
    type: 'SoftwareSourceCode',
    programmingLanguage: 'Go',
    description: {
      it: 'Strumento open source per passare tra più account Supabase in pochi secondi, con i token salvati in modo sicuro.',
      en: 'Switch between multiple Supabase accounts in seconds. Tokens are stored securely.',
    },
  },
  {
    name: 'Status Vaccini',
    url: siteConfig.links.statusVaccini,
    // Verified via the GitHub API (repos/EliaTolin/StatusVaccini.language).
    type: 'SoftwareSourceCode',
    programmingLanguage: 'Dart',
    description: {
      it: 'La prima app in Italia per seguire la campagna vaccinale Covid. Open source, scritta in Flutter.',
      en: "Italy's first app for tracking the Covid vaccination campaign. Open source, built with Flutter.",
    },
  },
]

/**
 * Press coverage, as machine-readable corroboration of the Person entity.
 * Headlines and dates verified against each outlet's own page.
 *
 * TRC Modena is deliberately absent: its entry in `src/config/press.ts` points
 * at the outlet's homepage rather than an article, and that page does not
 * mention Elia. Add it here once there is a real article URL.
 */
const pressMentions = [
  {
    headline:
      "Vaccino Covid, ecco l'app con la mappa completa delle somministrazioni in Italia",
    url: 'https://www.ilrestodelcarlino.it/cronaca/vaccino-covid-app-46d76a55',
    publisherName: 'il Resto del Carlino',
  },
  {
    headline: "L'idea di Elia: l'applicazione che dice tutto sui vaccini",
    url: 'https://www.gazzettadimodena.it/modena/cronaca/2021/05/07/news/l-idea-di-elia-l-applicazione-che-dice-tutto-sui-vaccini-1.40246570',
    publisherName: 'Gazzetta di Modena',
    datePublished: '2021-05-07',
  },
  {
    headline: "Status Vaccini, la 'App' che non c'era creata da uno studente Unimore",
    url: 'https://www.lapressa.it/articoli/societa/status-vaccini',
    publisherName: 'La Pressa',
  },
  {
    headline:
      "L'ideatore dell'app che rivela tutto sui vaccini è di Baiso e si chiama Elia Tolin",
    url: 'https://www.redacon.it/2021/06/04/lideatore-dellapp-che-rivela-tutto-sui-vaccini-e-di-baiso-e-si-chiama-elia-tolin/',
    publisherName: 'Redacon',
    datePublished: '2021-06-04',
  },
  {
    headline:
      'AI, apprendimento e Università, una giornata di studi al Tecnopolo il 21 novembre',
    url: 'https://www.stampareggiana.it/2025/11/20/ai-apprendimento-e-universita-una-giornata-di-studi-al-tecnopolo-il-21-novembre/',
    publisherName: 'Stampa Reggiana',
    datePublished: '2025-11-20',
  },
]

export function JsonLd({ locale }: { locale: Locale }) {
  const personId = `${siteConfig.url}/#person`
  const websiteId = `${siteConfig.url}/#website`
  const auroraId = `${siteConfig.links.aurora}/#organization`
  const ermannoId = `${siteConfig.links.ermanno}/#organization`
  const builtdifferentId = `${siteConfig.links.builtdifferent}/#organization`
  // Trailing slash stripped: the Meetup URL ends with one, which would
  // otherwise produce a double slash in the @id.
  const flutterModenaId = `${siteConfig.links.flutterModena.replace(/\/$/, '')}/#organization`

  // No trailing slash on the root, so this matches the `rel=canonical` Next
  // emits (its metadata resolver collapses a root path to the bare origin).
  const pageUrl = new URL(localePath(locale), siteConfig.url)
    .toString()
    .replace(/\/$/, '')

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: 'Elia Tolin',
    url: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/photos/elia.jpg`,
      width: 750,
      height: 900,
    },
    jobTitle: 'Computer Scientist',
    description: personDescription,
    birthPlace: {
      '@type': 'Place',
      name: 'Sanremo',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sanremo',
        addressCountry: 'IT',
      },
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Università degli Studi di Modena e Reggio Emilia',
      alternateName: 'UNIMORE',
      url: 'https://www.unimore.it',
    },
    // The Role pattern, so each employer records the actual title held there
    // instead of a bare Organization mention.
    worksFor: [
      {
        '@type': 'OrganizationRole',
        roleName: 'Co-founder & CTO',
        worksFor: { '@id': ermannoId },
      },
      {
        '@type': 'OrganizationRole',
        roleName: 'Founder',
        startDate: '2022',
        worksFor: { '@id': auroraId },
      },
      {
        // No startDate: the site says 2023, PRODUCT.md flags the vault as
        // mid-2024. Left out until Elia confirms which is right.
        '@type': 'OrganizationRole',
        roleName: 'Head of Tech',
        worksFor: { '@id': builtdifferentId },
      },
    ],
    founder: [{ '@id': ermannoId }, { '@id': auroraId }, { '@id': flutterModenaId }],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      // Free text, not an official O*NET-SOC code.
      occupationalCategory: 'Software Development',
    },
    knowsAbout: [
      'Flutter',
      'Next.js',
      'Supabase',
      'ESP32 and STM32 firmware',
      'Computer vision',
      'Generative AI',
      'Software architecture',
    ],
    subjectOf: pressMentions.map((mention) => ({
      '@type': 'Article',
      headline: mention.headline,
      url: mention.url,
      ...(mention.datePublished ? { datePublished: mention.datePublished } : {}),
      publisher: { '@type': 'Organization', name: mention.publisherName },
    })),
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      // Verified-publisher profile that owns the remote_caching package.
      'https://pub.dev/publishers/eliatolin.it',
      siteConfig.links.flutterModena,
    ],
  }

  const aurora = {
    '@type': 'Organization',
    '@id': auroraId,
    name: 'Aurora Digital',
    url: siteConfig.links.aurora,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logos/aurora-digital.png`,
      width: 512,
      height: 362,
    },
    foundingDate: '2022',
    founder: { '@id': personId },
    description: orgDescriptions.aurora[locale],
  }

  const ermanno = {
    '@type': 'Organization',
    '@id': ermannoId,
    name: 'Ermanno',
    url: siteConfig.links.ermanno,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logos/ermanno.png`,
      width: 512,
      height: 512,
    },
    founder: { '@id': personId },
    description: orgDescriptions.ermanno[locale],
  }

  // Elia is Head of Tech here, not a founder — no founder claim. Kept minimal:
  // this site is not the authoritative source for a third party's entity data.
  const builtdifferent = {
    '@type': 'Organization',
    '@id': builtdifferentId,
    name: 'Builtdifferent',
    url: siteConfig.links.builtdifferent,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/logos/builtdifferent.png`,
      width: 447,
      height: 447,
    },
  }

  const flutterModena = {
    '@type': 'Organization',
    '@id': flutterModenaId,
    name: 'Flutter Modena',
    url: siteConfig.links.flutterModena,
    logo: `${siteConfig.url}/logos/flutter-modena.svg`,
    founder: { '@id': personId },
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    // An array, identical on every render. A single value here previously
    // flipped between it-IT and en-US depending on which page emitted it —
    // one @id asserting two contradictory facts.
    inLanguage: ['it-IT', 'en-US'],
    publisher: { '@id': personId },
  }

  // One node per locale URL. Its @id is the page's own canonical URL, so it
  // can never collide with the other locale the way the shared WebSite @id did.
  const webpage = {
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: siteConfig.name,
    description: pageDescriptions[locale],
    inLanguage: locale === 'it' ? 'it-IT' : 'en-US',
    isPartOf: { '@id': websiteId },
    mainEntity: { '@id': personId },
  }

  const productNodes = products.map((product) => ({
    '@type': product.type,
    '@id': `${product.url}/#software`,
    name: product.name,
    url: product.url,
    description: product.description[locale],
    creator: { '@id': personId },
    ...(product.publisherOrgId ? { publisher: { '@id': product.publisherOrgId } } : {}),
    ...(product.applicationCategory
      ? { applicationCategory: product.applicationCategory }
      : {}),
    ...(product.programmingLanguage
      ? { programmingLanguage: product.programmingLanguage }
      : {}),
  }))

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      aurora,
      ermanno,
      builtdifferent,
      flutterModena,
      website,
      webpage,
      ...productNodes,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
