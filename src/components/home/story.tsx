import { useTranslations } from 'next-intl'
import { Section, SectionTitle, Tile } from '@/components/home/section'
import { cn } from '@/lib/utils'

type Step = {
  emoji: string
  tone: 'accent' | 'mint'
  title: string
  text: string
  celebration?: string
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
            <Tile tone={step.tone}>{step.emoji}</Tile>
            <div>
              <h3 className="font-display mt-1 text-2xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-[17px] leading-relaxed">
                {step.text}
              </p>
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
