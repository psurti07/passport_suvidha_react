'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from '@/lib/redesign/router';
import { TopInfoBar } from './TopInfoBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { QuickActions } from './QuickActions';
import { BrandIntro } from './BrandIntro';
import { DisclaimerNotice } from './DisclaimerNotice';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);

  useEffect(() => {
    const samePage = prevPath.current === pathname;
    prevPath.current = pathname;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = samePage && !reduce ? 'smooth' : 'auto';

    if (hash) {
      // wait a frame so the section exists (e.g. after a preview-mode redirect)
      const id = hash.slice(1);
      const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start', behavior }));
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior });
  }, [pathname, hash]);
  return null;
}

/**
 * The top bar + floating header overlay the homepage hero photograph.
 * Every other page gets a navy band of the same height so they sit on navy.
 */
function PageTopSpacer() {
  const isHome = useLocation().pathname === '/';
  if (isHome) return null;
  return <div aria-hidden className="h-[calc(var(--topbar-h)+var(--hdrbar-h)+24px)] bg-navy-900" />;
}

/**
 * Site chrome for every redesigned page. `#ps-app` is made inert while the Important
 * Notice is open; overlays render into `#ps-portal` (inside the scoped `.ps-site` wrapper).
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div id="ps-app">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-navy-700 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <BrandIntro />
        <ScrollToTop />
        <TopInfoBar />
        <Header />
        <PageTopSpacer />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <QuickActions />
      </div>
      <DisclaimerNotice />
      <div id="ps-portal" />
    </>
  );
}
