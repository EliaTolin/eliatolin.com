/**
 * Logos for roles and products, keyed by the display name used in the
 * message catalogs (names are identical across locales).
 *
 * `bg` controls the tile behind the image: transparent marks that would
 * vanish on the dark page get a light plate; app icons with a baked
 * background need none. Entries missing here (Builtdifferent — consent
 * pending; ZTL Elettrica, Flutter Modena — no asset yet) fall back to the
 * emoji/placeholder tile.
 */
export const logos: Record<string, { src: string; bg?: 'light' }> = {
  'Aurora Digital': { src: '/logos/aurora-digital.png' },
  Ermanno: { src: '/logos/ermanno.png' },
  'Quiz Radioamatori': { src: '/logos/quiz-radioamatori.png' },
  HamQRG: { src: '/logos/hamqrg.png' },
  Tepio: { src: '/logos/tepio.png' },
  Acetaia: { src: '/logos/acetaia.png', bg: 'light' },
}
