/**
 * Page metadata and structured data for the redesigned routes (server-side, Next.js
 * Metadata API). Replaces the Vite site's client-side useDocumentMeta hook, so titles,
 * descriptions, canonical URLs, Open Graph tags and JSON-LD are in the initial HTML.
 */
import type { Metadata } from 'next';
import { site } from '@/lib/redesign/data/site';
import type { FaqItem } from '@/lib/redesign/types/faq';

export interface PageMetaInput {
  title: string;
  description?: string;
  /** Path such as "/about". */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** Keep this page out of search results (empty states, utility pages). */
  noindex?: boolean;
}

/** Preview and staging deployments are never indexed (NEXT_PUBLIC_SITE_ENV !== 'production'). */
export const INDEXABLE = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export function pageMetadata({ title, description = site.description, path, image, type = 'website', noindex = false }: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  const img = new URL(image ?? '/assets/brand/logo-on-white.jpg', site.url).toString();
  const index = INDEXABLE && !noindex;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { siteName: site.name, title, description, url, type, images: [{ url: img }], locale: 'en_IN' },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

export interface Crumb {
  label: string;
  to?: string;
}

export function breadcrumbJsonLd(items: Crumb[]) {
  const all: Crumb[] = [{ label: 'Home', to: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${site.url}${c.to}` } : {}),
    })),
  };
}

export function faqPageJsonLd(faqs: Pick<FaqItem, 'question' | 'answer'>[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
}

/** Renders JSON-LD in the server HTML. `<` is escaped so content cannot close the script. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }} />
      ))}
    </>
  );
}
