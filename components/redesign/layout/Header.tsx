'use client';

import { useMemo, useState } from 'react';
import { Link, useLocation } from '@/lib/redesign/router';
import { ArrowRight, Menu, Search, UserRound } from 'lucide-react-redesign';
import { mainNav } from '@/lib/redesign/data/site';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE, resolveLink } from '@/lib/redesign/config/preview';
import { useScrolled } from '@/lib/redesign/hooks/useScrolled';
import { useActiveSection } from '@/lib/redesign/hooks/useActiveSection';
import { Button } from '@/components/redesign/common/Button';
import { SmartLink, SmartNavLink } from '@/components/redesign/common/SmartLink';
import { cn } from '@/lib/redesign/utils/cn';
import { ServicesDropdown } from './ServicesDropdown';
import { MobileNav } from './MobileNav';
import { SearchPalette } from './SearchPalette';

/** Section id a nav item points to in preview mode (for the scroll-spy active state). */
export function navSectionId(to: string): string | undefined {
  const r = resolveLink(to);
  return r.kind === 'anchor' ? r.sectionId : undefined;
}

export function useNavActiveSection() {
  const ids = useMemo(
    () => [...new Set(mainNav.map((i) => navSectionId(i.to)).filter((id): id is string => !!id && id !== HOME_SECTIONS.top))],
    [],
  );
  return useActiveSection(ids, HOME_SECTIONS.top, HOMEPAGE_PREVIEW_MODE);
}

export function Header() {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const activeSection = useNavActiveSection();
  const isHome = useLocation().pathname === '/';
  // Clear frosted glass over the homepage photo; deeper navy glass once scrolled (or on other pages)
  const overPhoto = isHome && !scrolled;

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-slow ease-brand"
      style={{ transform: scrolled ? 'translateY(10px)' : 'translateY(calc(var(--topbar-h) + 8px))' }}
    >
      <div
        className={cn(
          'pointer-events-auto mx-auto flex h-[var(--hdrbar-h)] w-[calc(100%-1.75rem)] max-w-[1320px] items-center justify-between gap-3 rounded-[20px] border pl-3.5 pr-2 backdrop-blur-[18px] transition-[background-color,border-color,box-shadow] duration-slow ease-brand sm:px-5 lg:h-[78px] lg:w-[92%] lg:rounded-[24px] lg:px-6',
          overPhoto
            ? 'border-white/[0.16] bg-navy-950/40 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(255_255_255/0.08)] lg:border-white/20 lg:bg-white/10'
            : 'border-white/10 bg-navy-900/85 shadow-[0_16px_40px_-20px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(255_255_255/0.06)]',
        )}
      >
        <Link
          to="/"
          onClick={(e) => {
            if (window.location.pathname === '/' && !window.location.hash) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            }
          }}
          className="flex min-h-10 shrink-0 items-center"
          aria-label="Passport Suvidha — home"
        >
          {/* Light-text presentation of the original logo (icon unchanged) for dark backgrounds */}
          <img src="/assets/brand/logo-light.png" alt="Passport Suvidha" width={728} height={268} className="h-9 w-auto sm:h-10 lg:h-[52px]" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {mainNav.map((item) => (
              <li key={item.to} className={cn(item.wideOnly && 'hidden xl:block')}>
                {item.children && !HOMEPAGE_PREVIEW_MODE ? (
                  <ServicesDropdown item={item} />
                ) : (
                  <SmartNavLink
                    to={item.to}
                    end={item.to === '/'}
                    active={navSectionId(item.to) === activeSection}
                    className={({ isActive }) =>
                      cn(
                        'group/nav relative flex h-11 items-center px-2.5 text-[0.9375rem] font-medium transition-colors duration-fast xl:px-3.5',
                        isActive ? 'text-gold-400' : 'text-white/85 hover:text-white',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            'absolute bottom-0.5 left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full transition-transform duration-base ease-brand',
                            isActive ? 'scale-x-100 bg-gold-400' : 'scale-x-0 bg-white/70 group-hover/nav:scale-x-100',
                          )}
                        />
                      </>
                    )}
                  </SmartNavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white lg:h-11 lg:w-11"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <SmartLink
            to="/signin"
            className="hidden h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-[0.9375rem] font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10 xl:inline-flex"
            disabledClassName="!opacity-90"
          >
            <UserRound className="h-4 w-4" aria-hidden />
            Sign in
          </SmartLink>
          <Button to="/apply-passport" size="sm" className="hidden !h-10 !px-4 min-[430px]:inline-flex sm:!h-11 sm:!px-5 lg:!h-12 lg:!px-6 lg:text-[0.9375rem]" iconRight={<ArrowRight className="h-4 w-4" />}>
            Apply Now
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/[0.08] text-white transition-colors hover:bg-white/15 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
