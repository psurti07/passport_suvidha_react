import RequirementsPage from '@/components/redesign/pages/RequirementsPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';

const crumbs = [{ label: 'Requirements' }];

// Reads query parameters during server rendering, so the full page is in the HTML
// instead of a client-side placeholder.
export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Passport Document Requirements | Passport Suvidha',
  description: 'Document checklists for fresh, reissue and minor passport applications, with tips for filling in the application form.',
  path: '/requirements',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <RequirementsPage />
    </>
  );
}
