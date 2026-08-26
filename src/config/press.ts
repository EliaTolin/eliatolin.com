/**
 * Press outlets that covered Elia's work, with their real wordmarks
 * (scraped from each outlet's site) rendered solid white by the strip.
 * Sanremonews and TG Roseto expose no usable wordmark; ModenaToday's
 * solid-block mark breaks the white inversion — they stay out until a
 * good asset shows up.
 */
export const pressWordmarks = [
  {
    name: 'il Resto del Carlino',
    src: '/press/carlino.svg',
    href: 'https://www.ilrestodelcarlino.it/cronaca/vaccino-covid-app-46d76a55',
  },
  {
    name: 'Gazzetta di Modena',
    src: '/press/gazzetta.svg',
    href: 'https://www.gazzettadimodena.it/modena/cronaca/2021/05/07/news/l-idea-di-elia-l-applicazione-che-dice-tutto-sui-vaccini-1.40246570',
  },
  {
    name: 'La Pressa',
    src: '/press/lapressa.svg',
    href: 'https://www.lapressa.it/articoli/societa/status-vaccini',
  },
  {
    name: 'Redacon',
    src: '/press/redacon.png',
    href: 'https://www.redacon.it/2021/06/04/lideatore-dellapp-che-rivela-tutto-sui-vaccini-e-di-baiso-e-si-chiama-elia-tolin/',
  },
  {
    name: 'Stampa Reggiana',
    src: '/press/stampareggiana.png',
    href: 'https://www.stampareggiana.it/2025/11/20/ai-apprendimento-e-universita-una-giornata-di-studi-al-tecnopolo-il-21-novembre/',
  },
  {
    name: 'TRC Modena',
    src: '/press/trcmodena.png',
    href: 'https://trcmodena.it/',
  },
] as const
