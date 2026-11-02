/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLIENT PREVIEW MODE
 * ─────────────────────────────────────────────────────────────────────────────
 *  true  → only the homepage is accessible. Internal routes redirect to the
 *          matching homepage section; links become section anchors, and links
 *          with no homepage equivalent are shown as "available at launch".
 *  false → the full website (all pages, routes and links) is restored.
 *
 *  Nothing is deleted in preview mode — every page, component and data file
 *  stays in the project. Change this ONE value to switch modes.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const HOMEPAGE_PREVIEW_MODE = false;

/** Homepage section ids (used for anchors, scroll-spy and redirects). */
export const HOME_SECTIONS = {
  top: 'top',
  services: 'services',
  howItWorks: 'how-it-works',
  requirements: 'requirements',
  about: 'about',
  customers: 'customers',
  videos: 'video-stories',
  blog: 'blog',
  faq: 'faq',
  apply: 'apply',
  contact: 'contact',
  locations: 'locations',
  disclaimer: 'footer-disclaimer',
} as const;

/**
 * Where each internal route points while in preview mode.
 * Routes not listed here have no homepage equivalent and are shown disabled.
 */
const ROUTE_TO_SECTION: Record<string, string> = {
  '/': HOME_SECTIONS.top,
  '/about': HOME_SECTIONS.about,
  '/services': HOME_SECTIONS.services,
  '/services/normal-passport': HOME_SECTIONS.services,
  '/services/tatkal-passport': HOME_SECTIONS.services,
  '/services/reissue-passport': HOME_SECTIONS.services,
  '/requirements': HOME_SECTIONS.requirements,
  '/locations': HOME_SECTIONS.locations,
  '/blogs': HOME_SECTIONS.blog,
  '/testimonials': HOME_SECTIONS.customers,
  '/faq': HOME_SECTIONS.faq,
  '/contact': HOME_SECTIONS.contact,
  '/apply-passport': HOME_SECTIONS.apply,
  '/disclaimer': HOME_SECTIONS.disclaimer,
};

export type ResolvedLink =
  | { kind: 'route'; to: string }
  | { kind: 'anchor'; to: string; sectionId: string }
  | { kind: 'disabled' };

/** Resolve an internal path for the current mode. External URLs are not passed here. */
export function resolveLink(to: string): ResolvedLink {
  if (!HOMEPAGE_PREVIEW_MODE) return { kind: 'route', to };
  const path = to.split(/[?#]/)[0] || '/';
  const sectionId = ROUTE_TO_SECTION[path];
  if (!sectionId) return { kind: 'disabled' };
  return { kind: 'anchor', to: sectionId === HOME_SECTIONS.top ? '/' : `/#${sectionId}`, sectionId };
}

/** Section to redirect an internal route to (preview mode), or the top of the homepage. */
export function redirectTargetFor(path: string): string {
  const id = ROUTE_TO_SECTION[path];
  return id && id !== HOME_SECTIONS.top ? `/#${id}` : '/';
}

export const PREVIEW_DISABLED_TITLE = 'Available when the full website launches';

/** Smooth-scroll to a homepage section, honouring reduced motion and the sticky header (scroll-margin). */
export function scrollToSection(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (id === HOME_SECTIONS.top) {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
