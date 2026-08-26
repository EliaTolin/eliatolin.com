import { useTranslations } from 'next-intl'
import { siteConfig } from '@/config/site'
import { Section, SectionTitle, Tile } from '@/components/home/section'

type Offer = {
  emoji: string
  title: string
  text: string
  highlight: string
  chips: string[]
}

function OfferCard({ offer, tone }: { offer: Offer; tone: 'accent' | 'mint' }) {
  return (
    <div className="bg-surface flex flex-col rounded-[20px] border p-7">
      <div className="flex items-center gap-4">
        <Tile tone={tone}>{offer.emoji}</Tile>
        <h3 className="font-display text-xl font-bold">{offer.title}</h3>
      </div>
      <p className="text-muted-foreground mt-4 flex-1 text-[15px] leading-relaxed">
        {offer.text}
        <strong className="text-foreground font-semibold">{offer.highlight}</strong>
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {offer.chips.map((chip) => (
          <span
            key={chip}
            className="text-muted-foreground rounded-lg border px-3 py-1 text-[13px] font-medium"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Business() {
  const t = useTranslations('business')
  const stats = t.raw('stats') as { value: string; label: string }[]

  return (
    <Section id="business" className="pt-30">
      {/* Soft coral wash behind the panel keeps the section from sinking into the page black. */}
      <div
        className="rounded-[28px] border p-8 sm:p-12"
        style={{
          background:
            'radial-gradient(90% 120% at 15% 0%, oklch(0.72 0.15 40 / 0.07) 0%, transparent 55%), radial-gradient(80% 100% at 100% 100%, oklch(0.72 0.15 160 / 0.05) 0%, transparent 50%), rgb(20 20 23 / 0.5)',
        }}
      >
        <SectionTitle>{t('title')}</SectionTitle>
        <p className="text-muted-foreground mt-3 max-w-2xl text-[17px]">{t('intro')}</p>

        <div className="mt-9 grid gap-4.5 md:grid-cols-2">
          <OfferCard offer={t.raw('dev') as Offer} tone="accent" />
          <OfferCard offer={t.raw('training') as Offer} tone="mint" />
        </div>

        <div className="mt-9 grid gap-6 border-t pt-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-accent-bright text-3xl font-extrabold tracking-tight">
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-1 text-sm leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="text-faint-foreground mt-8 max-w-3xl text-sm leading-relaxed">
          {t('sectors')}
        </p>
        <p className="mt-6 text-base">
          {t('ctaQuestion')}{' '}
          <a
            href={`mailto:${siteConfig.email}`}
            className="decoration-accent hover:text-accent-bright font-bold underline decoration-2 underline-offset-4"
          >
            {t('ctaAction')}
          </a>
        </p>
      </div>
    </Section>
  )
}
