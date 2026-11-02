import type { Metadata } from 'next';
import '@/styles/redesign.css';
import { Layout } from '@/components/redesign/layout/Layout';
import NotFoundPage from '@/components/redesign/pages/NotFoundPage';
import { DOCUMENT_STYLE } from '@/lib/redesign/intro';

export const metadata: Metadata = { title: 'Page not found | Passport Suvidha', robots: { index: false, follow: true } };

/** 404 for every route, shown in the redesign's layout. */
export default function NotFound() {
  return (
    <div className="ps-site">
      <style dangerouslySetInnerHTML={{ __html: DOCUMENT_STYLE }} />
      <Layout>
        <NotFoundPage />
      </Layout>
    </div>
  );
}
