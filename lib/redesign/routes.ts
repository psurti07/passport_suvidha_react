/**
 * Routes rendered by the redesign (app/(site)). Every other path belongs to the
 * original application (app/(legacy) and app/api) and is linked with a full page load.
 */
export const REDESIGN_ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/normal-passport',
  '/services/tatkal-passport',
  '/services/reissue-passport',
  '/requirements',
  '/locations',
  '/contact',
  '/faq',
  '/testimonials',
  '/blogs',
  '/apply-new',
  '/disclaimer',
  '/site-map',
] as const;

/** Original application routes kept unchanged (see docs/ROUTE_COMPATIBILITY.md). */
export const LEGACY_ROUTES = [
  '/apply-passport',
  '/signin',
  '/check-application-status',
  '/feeCalculator',
  '/portal',
  '/payment-response',
  '/privacy-policy',
  '/terms',
  '/terms-of-service',
  '/refund-policy',
  '/accessibility',
  '/process',
  '/schedule-slot',
  '/schedule-success',
  '/cardoffer',
  '/cardoffer-response',
  '/staroffer',
  '/staroffer-response',
  '/bumperoffer',
  '/bumperoffer-response',
] as const;

export function isRedesignPath(href: string): boolean {
  if (!href.startsWith('/') || href.startsWith('//')) return false;
  const path = href.split(/[?#]/)[0] || '/';
  if (path === '/') return true;
  if (path.startsWith('/blogs/')) return true;
  return (REDESIGN_ROUTES as readonly string[]).includes(path.replace(/\/$/, ''));
}
