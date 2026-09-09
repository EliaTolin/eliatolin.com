import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { use } from 'react'

import { Link } from '@/i18n/navigation'
import { localePath, routing, type Locale } from '@/i18n/routing'
import { Container } from '@/components/ui/container'
import { ObfuscatedEmail } from '@/components/obfuscated-email'

const ROUTE = '/privacy'

type Section = { title: string; body: string }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })

  return {
    title: t('title'),
    description: t('intro'),
    alternates: {
      canonical: localePath(locale as Locale, ROUTE),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l, ROUTE)])),
        'x-default': localePath(routing.defaultLocale, ROUTE),
      },
    },
  }
}

export default function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return <PrivacyContent />
}

function PrivacyContent() {
  const t = useTranslations('privacy')
  const sections = t.raw('sections') as Section[]

  return (
    <Container className="py-24 sm:py-32">
      <p className="text-faint-foreground text-xs font-semibold tracking-[0.14em] uppercase">
        {t('updated')}
      </p>
      <h1 className="font-display mt-4 text-[2.6rem] font-extrabold tracking-tight sm:text-[3.2rem]">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mt-6 text-[17px] leading-relaxed text-pretty">
        {t('intro')}
      </p>

      <div className="mt-14 flex flex-col gap-11">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-bold">{section.title}</h2>
            <p className="text-muted-foreground mt-2.5 text-[17px] leading-relaxed text-pretty">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-14 border-t pt-8 text-[17px]">
        {t('contactLabel')}{' '}
        <ObfuscatedEmail
          showAddress
          className="decoration-accent hover:text-accent-bright underline decoration-2 underline-offset-4 transition-colors"
        />
      </p>

      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground mt-10 inline-block text-sm no-underline transition-colors"
      >
        ← {t('backHome')}
      </Link>
    </Container>
  )
}
