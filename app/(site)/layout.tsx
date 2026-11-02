import type { Metadata } from 'next';
import '@/styles/redesign.css';
import { Layout } from '@/components/redesign/layout/Layout';
import { LiveChat } from '@/components/tracking/LiveChat';
import { DOCUMENT_STYLE, INTRO_SCRIPT, INTRO_STYLE } from '@/lib/redesign/intro';

/**
 * Layout for every redesigned page. Everything renders inside `.ps-site`, the scope of
 * styles/redesign.css, so the redesign and the original application's styles never mix.
 */
export const metadata: Metadata = {
  icons: { icon: '/assets/brand/favicon.png', apple: '/assets/brand/apple-touch-icon.png' },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ps-site">
      {/* Runs while the HTML is parsed, before first paint: holds content back for the brand intro */}
      <style dangerouslySetInnerHTML={{ __html: `${DOCUMENT_STYLE} ${INTRO_STYLE}` }} />
      <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      <Layout>{children}</Layout>
      <LiveChat />
    </div>
  );
}
