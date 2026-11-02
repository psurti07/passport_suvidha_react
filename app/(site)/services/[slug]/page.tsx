import { notFound } from 'next/navigation';
import ServiceDetailPage from '@/components/redesign/pages/ServiceDetailPage';
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { getServiceBySlug, services } from '@/lib/redesign/data/services';
import { site } from '@/lib/redesign/data/site';

type Props = { params: Promise<{ slug: string }> };

// Only the three service pages exist; any other slug is a 404
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} Assistance | Passport Suvidha`,
    description: service.detail.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ label: 'Services', to: '/services' }, { label: service.name }]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} application assistance`,
            serviceType: 'Passport application consultancy',
            provider: { '@type': 'Organization', name: site.legalName, url: site.url },
            areaServed: 'IN',
            description: service.detail.metaDescription,
          },
          faqPageJsonLd(service.detail.faqs),
        ]}
      />
      <ServiceDetailPage />
    </>
  );
}
