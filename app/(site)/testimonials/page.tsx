import TestimonialsPage from '@/components/redesign/pages/TestimonialsPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';

const crumbs = [{ label: 'Customer stories' }];

// Reads query parameters during server rendering, so the full page is in the HTML
// instead of a client-side placeholder.
export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Customer Stories | Passport Suvidha',
  description: 'Customers from across India who completed their Normal and Tatkal passport applications with Passport Suvidha.',
  path: '/testimonials',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <TestimonialsPage />
    </>
  );
}
