import { useTranslations } from 'next-intl'
import { pressWordmarks } from '@/config/press'

function WordmarkRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-20 pr-20">
      {pressWordmarks.map((outlet) => (
        <a
          key={outlet.src}
          href={outlet.href}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={ariaHidden ? -1 : undefined}
          className="opacity-50 transition duration-300 hover:opacity-100"
        >
          {/* brightness(0) invert(1) renders every wordmark solid white. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static assets, several SVG with intrinsic sizing */}
          <img
            src={outlet.src}
            alt={outlet.name}
            width={outlet.width}
            height={outlet.height}
            loading="lazy"
            decoding="async"
            className="h-7 w-auto brightness-0 invert"
          />
        </a>
      ))}
    </div>
  )
}

export function PressMarquee() {
  const t = useTranslations('press')

  return (
    <section aria-label={t('title')} className="mt-28">
      <p className="text-faint-foreground mb-7 text-center text-xs font-semibold tracking-[0.14em] uppercase">
        {t('title')}
      </p>
      <div className="marquee">
        <div className="marquee-track">
          <WordmarkRow />
          <WordmarkRow ariaHidden />
        </div>
      </div>
    </section>
  )
}
