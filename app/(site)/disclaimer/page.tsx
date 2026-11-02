import LegalPage from '@/components/redesign/pages/LegalPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { getLegalDoc } from '@/lib/redesign/data/legal';

const doc = getLegalDoc('disclaimer');

export const metadata = pageMetadata({ title: `${doc.title} | Passport Suvidha`, description: doc.description, path: '/disclaimer' });

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ label: doc.title }])} />
      <LegalPage slug="disclaimer" />
    </>
  );
}
