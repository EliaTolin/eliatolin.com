import { useTranslations } from 'next-intl'
import { LogoTile, Section, SectionTitle } from '@/components/home/section'
import { projectLinks } from '@/config/project-links'

type Project = {
  emoji: string
  tone: 'accent' | 'mint'
  name: string
  text: string
  metric: string
}

export function Projects() {
  const t = useTranslations('projects')
  const items = t.raw('items') as Project[]

  return (
    <Section id="projects" className="pt-32">
      <SectionTitle>{t('title')}</SectionTitle>
      <p className="text-muted-foreground mt-3 text-[17px]">{t('note')}</p>
      <div className="mt-11 flex flex-col">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col gap-4 border-t py-6 last:border-b sm:flex-row sm:items-center sm:gap-6 sm:px-2"
          >
            <LogoTile
              name={item.name}
              tone={item.tone}
              fallback={item.emoji}
              className="text-[22px]"
            />
            <div className="flex-1">
              {projectLinks[item.name] ? (
                <a
                  href={projectLinks[item.name]}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-display decoration-accent hover:text-accent-bright text-xl font-bold no-underline underline-offset-4 transition-colors hover:underline"
                >
                  {item.name}
                </a>
              ) : (
                <span className="font-display text-xl font-bold">{item.name}</span>
              )}
              <p className="text-muted-foreground mt-1 text-[15px] leading-relaxed">
                {item.text}
              </p>
            </div>
            <span className="text-sm font-semibold whitespace-nowrap">{item.metric}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
