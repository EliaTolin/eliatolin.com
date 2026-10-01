import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { use } from 'react'

import { Link } from '@/i18n/navigation'
import { localePath, routing, type Locale } from '@/i18n/routing'
import { Container } from '@/components/ui/container'
import { ObfuscatedEmail } from '@/components/obfuscated-email'
import { BookingCalendar } from '@/components/booking/booking-calendar'

const ROUTE = '/call'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'booking' })

  return {
    title: t('metaTitle'),
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

export default function CallPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  return <CallContent />
}

function CallContent() {
  const t = useTranslations('booking')
  const steps = t.raw('steps') as string[]

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <p className="text-faint-foreground text-xs font-semibold tracking-[0.14em] uppercase">
          {t('eyebrow')}
        </p>
        <h1 className="font-display mt-4 text-[2.6rem] font-extrabold tracking-tight sm:text-[3.2rem]">
          {t('title')}
        </h1>
        <p className="text-muted-foreground mt-6 text-[17px] leading-relaxed text-pretty">
          {t('intro')}
        </p>

        <ol className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-[15px] leading-snug">
              <span className="bg-accent-soft text-accent-bright font-display flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </Container>

      {/* Wider than the text column: Cal.com only puts the time slots beside the
          month grid when it has room, otherwise it stacks them underneath. */}
      <div className="px-gutter mx-auto mt-12 w-full max-w-5xl">
        <BookingCalendar notice={t('notice')} />
      </div>

      <Container>
        <p className="mt-14 border-t pt-8 text-[17px]">
          {t('emailLabel')}{' '}
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
    </div>
  )
}
