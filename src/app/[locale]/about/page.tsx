import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { use } from 'react'

import { Container } from '@/components/ui/container'
import { localePath, routing, type Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: localePath(locale as Locale, '/about'),
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, localePath(l, '/about')]),
      ),
    },
  }
}

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return <About />
}

function About() {
  const t = useTranslations('about')

  return (
    <Container className="py-20 sm:py-28">
      <h1 className="font-display text-4xl tracking-tight text-balance sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty">{t('lead')}</p>
      <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed text-pretty">
        {t('body')}
      </p>
    </Container>
  )
}
