import ApplyPage from '@/components/redesign/pages/ApplyPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';

const crumbs = [{ label: 'Apply now' }];

// Reads query parameters during server rendering, so the full page is in the HTML
// instead of a client-side placeholder.
export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Apply for Passport Assistance | Passport Suvidha',
  description: 'Start your Normal or Tatkal passport application with expert assistance from Passport Suvidha.',
  path: '/apply-passport',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ApplyPage />
    </>
  );
}
