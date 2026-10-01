import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { use } from 'react'

import { Link } from '@/i18n/navigation'
import { localePath, routing, type Locale } from '@/i18n/routing'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/home/section'
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

/** Staggered entrance delay for the `.rise` animation in globals.css. */
const delay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties

function CallContent() {
  const t = useTranslations('booking')
  const steps = t.raw('steps') as string[]

  return (
    <div className="overflow-x-clip pb-24 sm:pb-32">
      <Section className="relative flex flex-col items-center gap-16 pt-20 sm:pt-24 lg:flex-row lg:gap-20">
        {/* Soft accent glow behind the hero — decoration only. */}
        <div
          aria-hidden="true"
          className="bg-accent/20 pointer-events-none absolute top-10 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full blur-[120px] lg:-right-20 lg:left-auto lg:translate-x-0"
        />

        <div className="lg:flex-[1.3]">
          <h1
            className="rise font-display text-[2.6rem] leading-[1.06] font-extrabold tracking-tight text-balance sm:text-[3.6rem]"
            style={delay(0)}
          >
            {t('headlineStart')}
            <span className="decoration-accent underline decoration-wavy decoration-[0.09em] underline-offset-8 [text-decoration-skip-ink:none]">
              {t('headlineHighlight')}
            </span>
            {t('headlineEnd')}
          </h1>
          <p
            className="rise text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed text-pretty"
            style={delay(120)}
          >
            {t('intro')}
          </p>
          <a
            href="#calendar"
            className="rise bg-accent-deep text-foreground mt-10 inline-block rounded-full px-8 py-3.5 text-base font-bold no-underline transition-opacity hover:opacity-90"
            style={delay(240)}
          >
            {t('ctaScroll')}
          </a>
        </div>

        <div
          className="rise relative w-full max-w-xs lg:max-w-none lg:flex-[0.7]"
          style={delay(180)}
        >
          <Image
            src="/photos/elia-call.jpg"
            alt={t('photoAlt')}
            width={1024}
            height={1536}
            priority
            className="aspect-4/5 w-full rounded-[28px] object-cover object-top"
          />
          <InviteCard
            title={t('inviteTitle')}
            withLabel={t('inviteWith')}
            status={t('inviteStatus')}
          />
        </div>
      </Section>

      <Section className="mt-24">
        <h2 className="text-faint-foreground text-xs font-semibold tracking-[0.14em] uppercase">
          {t('stepsTitle')}
        </h2>
        <ol className="relative mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {/* Line joining the three numbers on wide screens. */}
          <div
            aria-hidden="true"
            className="from-accent/60 via-border to-border absolute top-4 right-[16%] left-4 hidden h-px bg-linear-to-r sm:block"
          />
          {steps.map((step, i) => (
            <li key={step} className="relative flex items-start gap-3.5 sm:flex-col">
              <span className="bg-background ring-accent/40 text-accent-bright font-display relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-1">
                {i + 1}
              </span>
              <span className="pt-1 text-[17px] leading-snug sm:pt-0">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* Wider than the text column: Cal.com only puts the time slots beside the
          month grid when it has room, otherwise it stacks them underneath. */}
      <div id="calendar" className="px-gutter mx-auto mt-16 w-full max-w-5xl scroll-mt-8">
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

/** Calendar-invite card floating over the portrait — purely decorative. */
function InviteCard({
  title,
  withLabel,
  status,
}: {
  title: string
  withLabel: string
  status: string
}) {
  return (
    <div
      aria-hidden="true"
      className="bg-surface/90 absolute -bottom-8 -left-6 flex w-64 -rotate-3 items-stretch gap-3.5 rounded-2xl border p-4 shadow-2xl shadow-black/50 backdrop-blur-md sm:-left-10"
    >
      <span className="bg-accent w-1 shrink-0 rounded-full" />
      <div className="min-w-0">
        <p className="font-display truncate text-base font-bold">{title}</p>
        <p className="text-muted-foreground mt-0.5 truncate text-sm">{withLabel}</p>
        <p className="bg-mint-soft text-mint-bright mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold">
          <span className="bg-mint-bright size-1.5 rounded-full" />
          {status}
        </p>
      </div>
    </div>
  )
}
