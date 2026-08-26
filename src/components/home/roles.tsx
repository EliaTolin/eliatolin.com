import { useTranslations } from 'next-intl'
import { LogoTile, Section, SectionTitle } from '@/components/home/section'
import { projectLinks } from '@/config/project-links'

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
              <LogoTile
                name={item.name}
                tone={item.tone}
                fallback={
                  <span className="text-faint-foreground text-xs font-semibold">
                    logo
                  </span>
                }
                className="rounded-xl"
              />
              <div>
                {projectLinks[item.name] ? (
                  <a
                    href={projectLinks[item.name]}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-display decoration-accent hover:text-accent-bright block text-xl font-bold no-underline underline-offset-4 transition-colors hover:underline"
                  >
                    {item.name}
                  </a>
                ) : (
                  <div className="font-display text-xl font-bold">{item.name}</div>
                )}
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
