/**
 * Homepage photography slots — STOCK / LICENSED IMAGES ONLY.
 * Client customer photos are used exclusively in the testimonials section.
 *
 * Drop optimised files into /public/assets/home/ with these names and they
 * replace the branded placeholders automatically. See public/assets/home/README.md
 * for the source and licence of each image.
 */
export interface HomeImage {
  src: string;
  alt: string;
  /** CSS object-position for the crop */
  position?: string;
}

/**
 * Responsive hero photographs supplied by the client (passport + airport composition
 * is part of each image). Desktop and mobile are different assets — do not crop one
 * into the other. Width/height are the files' real pixel sizes.
 */
export const heroImages = {
  desktop: { src: '/assets/home/hero-desktop.webp', width: 1983, height: 793 },
  mobile: { src: '/assets/home/hero-mobile.webp', width: 887, height: 1774 },
} as const;

export const homeImages: Record<'assistance', HomeImage> = {
  assistance: {
    src: '/assets/home/passport-document-assistance.webp',
    alt: 'An applicant at a desk in India filling in application documents',
    position: 'center 30%',
  },
};
