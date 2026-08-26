/**
 * Logos for roles and products, keyed by the display name used in the
 * message catalogs (names are identical across locales).
 *
 * `bg` controls the tile behind the image: transparent marks that would
 * vanish on the dark page get a light plate; app icons with a baked
 * background need none.
 */
export const logos: Record<string, { src: string; bg?: 'light' }> = {
  Builtdifferent: { src: '/logos/builtdifferent.png' },
  'Aurora Digital': { src: '/logos/aurora-digital.png' },
  Ermanno: { src: '/logos/ermanno.png' },
  'Quiz Radioamatori': { src: '/logos/quiz-radioamatori.png' },
  HamQRG: { src: '/logos/hamqrg.png' },
  Tepio: { src: '/logos/tepio.png' },
  Acetaia: { src: '/logos/acetaia.png', bg: 'light' },
  'Modula SpA': { src: '/logos/modula.png', bg: 'light' },
  'Flutter Modena': { src: '/logos/flutter-modena.svg', bg: 'light' },
  'ZTL Elettrica': { src: '/logos/ztl-elettrica.png', bg: 'light' },
}
