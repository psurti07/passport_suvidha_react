import { HomePage } from '@/components/redesign/pages/HomePage';
import { JsonLd, faqPageJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { site } from '@/lib/redesign/data/site';
import { homeFaqs } from '@/lib/redesign/data/faqs';

export const metadata = pageMetadata({
  title: 'Passport Suvidha — Passport Application Assistance in India',
  description:
    'Guidance and assistance for Normal, Tatkal and Reissue passport applications across India. Private consultancy — government fees are paid separately on the official portal.',
  path: '/',
});

const organisation = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/assets/brand/logo-on-white.jpg`,
  telephone: site.phone.display,
  email: site.email.display,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.lines.slice(0, 2).join(', '),
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '17:00',
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function Page() {
  return (
    <>
      <JsonLd data={[organisation, faqPageJsonLd(homeFaqs)]} />
      <HomePage />
    </>
  );
}
