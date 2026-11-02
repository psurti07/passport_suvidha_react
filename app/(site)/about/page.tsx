import AboutPage from '@/components/redesign/pages/AboutPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';

const crumbs = [{ label: 'About us' }];

export const metadata = pageMetadata({
  title: 'About Us | Passport Suvidha',
  description: 'Passport Suvidha is a private consultancy helping Indian citizens with Normal, Tatkal and Reissue passport applications. Learn about our vision, values and team.',
  path: '/about',
});

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <AboutPage />
    </>
  );
}
