import ServicesPage from '@/components/redesign/pages/ServicesPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { services } from '@/lib/redesign/data/services';
import { site } from '@/lib/redesign/data/site';

export const metadata = pageMetadata({
  title: 'Passport Services — Normal, Tatkal & Reissue | Passport Suvidha',
  description:
    'Compare Passport Suvidha’s assistance for Normal, Tatkal and Reissue passport applications. Consultancy only — government fees are paid separately.',
  path: '/services',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ label: 'Services' }]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: `${site.url}/services/${s.slug}` })),
          },
        ]}
      />
      <ServicesPage />
    </>
  );
}
