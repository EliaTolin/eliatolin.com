/**
 * Press outlets that covered Elia's work, with their real wordmarks
 * (scraped from each outlet's site) rendered solid white by the strip.
 * Sanremonews and TG Roseto expose no usable wordmark; ModenaToday's
 * solid-block mark breaks the white inversion — they stay out until a
 * good asset shows up.
 *
 * `width`/`height` are the asset's intrinsic pixel size (SVG viewBox for the
 * vectors). The strip renders every mark at a fixed 28px height, but the
 * attributes still have to be there: without them the browser cannot reserve
 * the right width for a raster mark before it downloads, and the row shifts.
 */
export const pressWordmarks = [
  {
    name: 'il Resto del Carlino',
    src: '/press/carlino.svg',
    width: 211,
    height: 26,
    href: 'https://www.ilrestodelcarlino.it/cronaca/vaccino-covid-app-46d76a55',
  },
  {
    name: 'Gazzetta di Modena',
    src: '/press/gazzetta.svg',
    width: 489,
    height: 63,
    href: 'https://www.gazzettadimodena.it/modena/cronaca/2021/05/07/news/l-idea-di-elia-l-applicazione-che-dice-tutto-sui-vaccini-1.40246570',
  },
  {
    name: 'La Pressa',
    src: '/press/lapressa.svg',
    width: 798,
    height: 163,
    href: 'https://www.lapressa.it/articoli/societa/status-vaccini',
  },
  {
    name: 'Redacon',
    src: '/press/redacon.png',
    width: 544,
    height: 180,
    href: 'https://www.redacon.it/2021/06/04/lideatore-dellapp-che-rivela-tutto-sui-vaccini-e-di-baiso-e-si-chiama-elia-tolin/',
  },
  {
    name: 'Stampa Reggiana',
    src: '/press/stampareggiana.png',
    width: 1200,
    height: 180,
    href: 'https://www.stampareggiana.it/2025/11/20/ai-apprendimento-e-universita-una-giornata-di-studi-al-tecnopolo-il-21-novembre/',
  },
  {
    name: 'TRC Modena',
    src: '/press/trcmodena.png',
    width: 241,
    height: 168,
    href: 'https://trcmodena.it/',
  },
] as const
