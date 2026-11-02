import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passportsuvidha.com';

/**
 * /robots.txt — production allows crawling of public pages; every other deployment
 * (preview, staging) blocks all crawlers. Set NEXT_PUBLIC_SITE_ENV=production only on
 * the live site.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/portal', '/api/', '/signin', '/payment-response'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
