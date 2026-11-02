import LocationsPage from '@/components/redesign/pages/LocationsPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';

const crumbs = [{ label: 'Locations' }];

export const metadata = pageMetadata({
  title: 'Passport Office Locations | Passport Suvidha',
  description: 'Find your nearest Passport Seva Kendra and visit the Passport Suvidha office in Surat, Gujarat.',
  path: '/locations',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <LocationsPage />
    </>
  );
}
