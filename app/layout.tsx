import type { Metadata, Viewport } from 'next';
import { Tracking } from '@/components/tracking/Tracking';

/**
 * Root layout shared by both route groups:
 *   app/(site)    — the redesigned pages (scoped stylesheet, redesign header/footer)
 *   app/(legacy)  — the original application's pages (its own stylesheet, navbar/footer)
 * It renders no styles or chrome of its own, so neither group affects the other.
 * Tracking is mounted here once, for every page, and only when enabled (see .env.example).
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://passportsuvidha.com';
const indexable = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Preview and staging deployments must never be indexed
  robots: indexable ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#00457E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The redesign's intro script adds classes to <html> before hydration
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Tracking />
      </body>
    </html>
  );
}
