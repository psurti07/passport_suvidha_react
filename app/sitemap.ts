import type { MetadataRoute } from 'next';
import { BLOG_ENABLED } from '@/lib/redesign/config/content';
import { services } from '@/lib/redesign/data/services';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passportsuvidha.com';

/**
 * /sitemap.xml — public, indexable pages only (no portal, sign-in, payment or offer
 * pages). The original site has no sitemap; this one is new.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    '/services',
    ...services.map((s) => `/services/${s.slug}`),
    '/requirements',
    '/locations',
    '/contact',
    '/faq',
    '/testimonials',
    '/apply-passport',
    '/check-application-status',
    '/feeCalculator',
    ...(BLOG_ENABLED ? ['/blogs'] : []),
    '/disclaimer',
    '/privacy-policy',
    '/terms',
    '/terms-of-service',
    '/refund-policy',
    '/accessibility',
    '/site-map',
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/apply-passport' ? 0.9 : 0.6,
  }));
}
