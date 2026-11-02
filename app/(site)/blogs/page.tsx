import BlogsPage from '@/components/redesign/pages/BlogsPage';
import { JsonLd, breadcrumbJsonLd, pageMetadata } from '@/lib/redesign/seo';
import { BLOG_ENABLED } from '@/lib/redesign/config/content';

// Reads ?page= and ?category= during server rendering
export const dynamic = 'force-dynamic';

// While there are no published articles the page is an empty state kept out of search results
export const metadata = BLOG_ENABLED
  ? pageMetadata({
      title: 'Blog — Passport Guides & Updates | Passport Suvidha',
      description: 'Guides, document tips and company news from Passport Suvidha.',
      path: '/blogs',
    })
  : pageMetadata({ title: 'Blog | Passport Suvidha', description: 'Passport guides from Passport Suvidha are on the way.', path: '/blogs', noindex: true });

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ label: 'Blog' }])} />
      <BlogsPage />
    </>
  );
}
