import ContactPage from '@/components/redesign/pages/ContactPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { site } from '@/lib/redesign/data/site';

const crumbs = [{ label: 'Contact us' }];

export const metadata = pageMetadata({
  title: 'Contact Us | Passport Suvidha',
  description: `Call ${site.phone.display}, email ${site.email.display} or visit our office in Surat. ${site.hoursShort}.`,
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <ContactPage />
    </>
  );
}
