import SiteMapPage from '@/components/redesign/pages/SiteMapPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';

const crumbs = [{ label: 'Site map' }];

export const metadata = pageMetadata({
  title: 'Site Map | Passport Suvidha',
  description: 'All pages on the Passport Suvidha website.',
  path: '/site-map',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <SiteMapPage />
    </>
  );
}
