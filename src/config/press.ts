/**
 * Press outlets that covered Elia's work (Status Vaccini, 2021).
 * Icons come from logo.dev via their publishable key (safe client-side).
 */
export const LOGO_DEV_TOKEN = 'pk_FGp2p-b9R5uRvbh3ThWm-g'

export function logoDevUrl(domain: string): string {
  return `https://img.logo.dev/${domain}?token=${LOGO_DEV_TOKEN}&size=64&format=png&theme=dark&retina=true`
}

export const pressOutlets = [
  {
    name: 'il Resto del Carlino',
    domain: 'ilrestodelcarlino.it',
    href: 'https://www.ilrestodelcarlino.it/cronaca/vaccino-covid-app-46d76a55',
  },
  {
    name: 'Gazzetta di Modena',
    domain: 'gazzettadimodena.it',
    href: 'https://www.gazzettadimodena.it/modena/cronaca/2021/05/07/news/l-idea-di-elia-l-applicazione-che-dice-tutto-sui-vaccini-1.40246570',
  },
  {
    name: 'ModenaToday',
    domain: 'modenatoday.it',
    href: 'https://www.modenatoday.it/attualita/app-monitoraggio-vaccini-italia-modena-3-maggio-2021.html',
  },
  {
    name: 'La Pressa',
    domain: 'lapressa.it',
    href: 'https://www.lapressa.it/articoli/societa/status-vaccini',
  },
  {
    name: 'Sanremonews',
    domain: 'sanremonews.it',
    href: 'https://www.sanremonews.it/2021/05/23/leggi-notizia/argomenti/altre-notizie/articolo/status-vaccini-lapp-che-informa-sulla-campagna-vaccinale-anti-covid-sviluppata-dal-bordig.html',
  },
  {
    name: 'Redacon',
    domain: 'redacon.it',
    href: 'https://www.redacon.it/2021/06/04/lideatore-dellapp-che-rivela-tutto-sui-vaccini-e-di-baiso-e-si-chiama-elia-tolin/',
  },
  {
    name: 'Stampa Reggiana',
    domain: 'stampareggiana.it',
    href: 'https://www.stampareggiana.it/2025/11/20/ai-apprendimento-e-universita-una-giornata-di-studi-al-tecnopolo-il-21-novembre/',
  },
  {
    name: 'TG Roseto',
    domain: 'tgroseto.it',
    href: 'https://www.tgroseto.it/2021/10/elia-tolin-informatica-a-disposizione-del-covid-19/',
  },
] as const
