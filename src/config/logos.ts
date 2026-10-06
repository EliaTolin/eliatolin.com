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
  'Aurora Digital': { src: '/logos/auroradigital-simbolo.svg' },
  // Compact mark for square tiles; the role card uses the wordmark instead.
  AuroraForma: { src: '/logos/auroraforma-simbolo.svg' },
  Ermanno: { src: '/logos/ermanno.png' },
  'Quiz Radioamatori': { src: '/logos/quiz-radioamatori.png' },
  HamQRG: { src: '/logos/hamqrg.png' },
  Tepio: { src: '/logos/tepio.png' },
  Acetaia: { src: '/logos/acetaia.png', bg: 'light' },
  'Modula SpA': { src: '/logos/modula.png', bg: 'light' },
  'Flutter Modena': { src: '/logos/flutter-modena.svg', bg: 'light' },
  'ZTL Elettrica': { src: '/logos/ztl-elettrica.png', bg: 'light' },
}

/**
 * Brands shown by their full wordmark in place of the name (in the role
 * cards), not by a square tile. `className` sets the rendered height.
 * Light-on-dark variants; `width`/`height` keep the source aspect ratio.
 */
export const wordmarks: Record<
  string,
  { src: string; width: number; height: number; className: string }
> = {
  // Same type scale as AuroraForma's: the taller viewBox (1050 vs 888) is
  // the descender of the "g", hence h-7 against h-6.
  'Aurora Digital': {
    src: '/logos/auroradigital.svg',
    width: 164,
    height: 28,
    className: 'h-7',
  },
  // Its wave symbol is Aurora Digital's: only the wordmark tells them apart.
  AuroraForma: {
    src: '/logos/auroraforma.svg',
    width: 168,
    height: 24,
    className: 'h-6',
  },
}
