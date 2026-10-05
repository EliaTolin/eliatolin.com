import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Section, SectionTitle } from '@/components/home/section'

type Offer = {
  title: string
  text: string
  highlight: string
  stats: { value: string; label: string }[]
  /** Separate brand the offer is sold under, shown as a logo link at the bottom. */
  brand?: { courses: string; cta: string }
}

const BRANDS = {
  training: {
    name: 'AuroraForma',
    href: siteConfig.links.auroraforma,
    logo: '/logos/auroraforma.svg',
  },
} as const

const PENCIL = {
  accent: 'oklch(0.72 0.15 40)',
  mint: 'oklch(0.72 0.15 160)',
  amber: 'oklch(0.78 0.13 90)',
} as const

/** A stat with a hand-drawn colored-pencil circle around the number. */
function PencilStat({
  value,
  label,
  color,
  tilt,
}: {
  value: string
  label: string
  color: keyof typeof PENCIL
  tilt: number
}) {
  return (
    <span className="inline-flex items-baseline gap-2.5">
      <span className="relative inline-block px-3 py-1">
        <svg
          viewBox="0 0 120 52"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 size-full"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          <path
            d="M10 26 C 12 10, 45 4, 72 5 S 114 12 112 27 S 88 48 56 47 S 8 42 10 26 Z M14 24 C 18 12, 48 7, 74 8"
            fill="none"
            stroke={PENCIL[color]}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
        <span className="font-display relative text-[22px] font-extrabold tracking-tight">
          {value}
        </span>
      </span>
      <span className="text-muted-foreground text-sm">{label}</span>
    </span>
  )
}

function OfferCard({
  offer,
  colors,
  brand,
}: {
  offer: Offer
  colors: (keyof typeof PENCIL)[]
  brand?: (typeof BRANDS)[keyof typeof BRANDS]
}) {
  return (
    <div className="bg-surface flex flex-col rounded-[20px] border p-7">
      <h3 className="font-display text-xl font-bold">{offer.title}</h3>
      <p className="text-muted-foreground mt-3.5 flex-1 text-[15px] leading-relaxed">
        {offer.text}
        <strong className="text-foreground font-semibold">{offer.highlight}</strong>
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
        {offer.stats.map((stat, i) => (
          <PencilStat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            color={colors[i % colors.length] ?? 'accent'}
            tilt={i % 2 === 0 ? -2 : 2}
          />
        ))}
      </div>
      {brand && offer.brand && (
        <a
          href={brand.href}
          target="_blank"
          rel="noreferrer noopener"
          className="group mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-5"
        >
          {/* Wordmark viewBox is 6221×888. */}
          <Image
            src={brand.logo}
            alt={brand.name}
            width={140}
            height={20}
            className="h-5 w-auto"
          />
          <span className="text-muted-foreground font-mono text-xs">
            {offer.brand.courses}
          </span>
          <span className="decoration-mint group-hover:text-foreground ml-auto text-sm font-bold underline decoration-2 underline-offset-4">
            {offer.brand.cta}
          </span>
        </a>
      )}
    </div>
  )
}

export function Business() {
  const t = useTranslations('business')

  return (
    <Section id="business" className="pt-30">
      <SectionTitle>{t('title')}</SectionTitle>
      <p className="text-muted-foreground mt-3 max-w-2xl text-[17px]">{t('intro')}</p>
      <div className="mt-10 grid gap-4.5 md:grid-cols-2">
        <OfferCard offer={t.raw('dev') as Offer} colors={['amber']} />
        <OfferCard
          offer={t.raw('training') as Offer}
          colors={['mint']}
          brand={BRANDS.training}
        />
      </div>
      <p className="text-muted-foreground mt-7 max-w-3xl text-sm leading-relaxed">
        {t('sectors')}
      </p>
      <p className="mt-6 text-base">
        {t('ctaQuestion')}{' '}
        <a
          href={siteConfig.links.aurora}
          target="_blank"
          rel="noreferrer noopener"
          className="decoration-accent hover:text-accent-bright font-bold underline decoration-2 underline-offset-4"
        >
          {t('ctaAction')}
        </a>
      </p>
    </Section>
  )
}
