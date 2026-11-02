import FaqPage from '@/components/redesign/pages/FaqPage';
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { faqs } from '@/lib/redesign/data/faqs';

// Reads ?q= and ?category= during server rendering (full FAQ list in the HTML)
export const dynamic = 'force-dynamic';

export const metadata = pageMetadata({
  title: 'Frequently Asked Questions | Passport Suvidha',
  description: 'Answers about Passport Suvidha’s passport assistance services, documents, fees and support.',
  path: '/faq',
});

export default function Page() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ label: 'FAQ' }]), faqPageJsonLd(faqs)]} />
      <FaqPage />
    </>
  );
}
