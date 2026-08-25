import { useTranslations } from 'next-intl'
import { Section, SectionTitle, Tile } from '@/components/home/section'

type Role = {
  name: string
  role: string
  tone: 'accent' | 'mint'
  text: string
  metric: string
  metricLabel: string
}

export function Roles() {
  const t = useTranslations('roles')
  const items = t.raw('items') as Role[]

  return (
    <Section id="roles" className="pt-32">
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="mt-10 grid gap-4.5 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.name} className="bg-surface rounded-[20px] border p-7">
            <div className="flex items-center gap-3.5">
              {/* Logo placeholder: swap for the real logo asset when provided. */}
              <Tile
                tone={item.tone}
                className="text-faint-foreground rounded-xl text-xs font-semibold"
              >
                logo
              </Tile>
              <div>
                <div className="font-display text-xl font-bold">{item.name}</div>
                <div className="text-muted-foreground mt-0.5 text-sm">{item.role}</div>
              </div>
            </div>
            <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
              {item.text}
            </p>
            <p className="mt-3.5 text-[15px] font-bold">
              {item.metric}{' '}
              <span className="text-muted-foreground font-normal">
                {item.metricLabel}
              </span>
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
