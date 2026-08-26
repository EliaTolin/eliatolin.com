import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { logoDevUrl, pressOutlets } from '@/config/press'

function OutletRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-14 pr-14">
      {pressOutlets.map((outlet) => (
        <a
          key={outlet.domain}
          href={outlet.href}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={ariaHidden ? -1 : undefined}
          className="flex items-center gap-3 no-underline opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
        >
          <Image
            src={logoDevUrl(outlet.domain)}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="size-7 rounded-md"
          />
          <span className="text-sm font-semibold whitespace-nowrap">{outlet.name}</span>
        </a>
      ))}
    </div>
  )
}

export function PressMarquee() {
  const t = useTranslations('press')

  return (
    <section aria-label={t('title')} className="mt-28">
      <p className="text-faint-foreground mb-6 text-center text-xs font-semibold tracking-[0.14em] uppercase">
        {t('title')}
      </p>
      <div className="marquee">
        <div className="marquee-track">
          <OutletRow />
          <OutletRow ariaHidden />
        </div>
      </div>
    </section>
  )
}
