import { useTranslations } from 'next-intl'
import { LogoTile, Section, SectionTitle, Tile } from '@/components/home/section'
import { cn } from '@/lib/utils'

type Step = {
  emoji: string
  tone: 'accent' | 'mint'
  title: string
  text: string
  celebration?: string
  /** Key into the logos map; the emoji tile is the fallback. */
  logo?: string
  pressLabel?: string
  press?: { name: string; href: string }[]
  /** Optional call-to-visit rendered under the step. Opens in a new tab. */
  link?: { label: string; href: string }
}

export function Story() {
  const t = useTranslations('story')
  const steps = t.raw('steps') as Step[]

  return (
    <Section id="story" className="max-w-3xl pt-32">
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="mt-13 flex flex-col gap-11">
        {steps.map((step) => (
          <div key={step.title} className="flex items-start gap-6">
            {step.logo ? (
              <LogoTile name={step.logo} tone={step.tone} fallback={step.emoji} />
            ) : (
              <Tile tone={step.tone}>{step.emoji}</Tile>
            )}
            <div>
              <h3 className="font-display mt-1 text-2xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-[17px] leading-relaxed">
                {step.text}
              </p>
              {step.press && step.press.length > 0 && (
                <p className="text-muted-foreground mt-3.5 text-sm leading-relaxed">
                  {step.pressLabel}{' '}
                  {step.press.map((outlet, i) => (
                    <span key={outlet.href}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <a
                        href={outlet.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="decoration-accent text-foreground hover:text-accent-bright underline decoration-1 underline-offset-4 transition-colors"
                      >
                        {outlet.name}
                      </a>
                    </span>
                  ))}
                </p>
              )}
              {step.link && (
                <p className="mt-3.5 text-[15px] font-semibold">
                  <a
                    href={step.link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="decoration-accent text-foreground hover:text-accent-bright underline decoration-2 underline-offset-4 transition-colors"
                  >
                    {step.link.label}
                  </a>
                </p>
              )}
              {step.celebration && (
                <p
                  className={cn(
                    'mt-3.5 font-semibold',
                    step.tone === 'accent' ? 'text-accent-bright' : 'text-mint-bright',
                  )}
                >
                  {step.celebration}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
