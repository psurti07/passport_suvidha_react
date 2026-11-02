'use client';

import { INERT } from '@/lib/redesign/utils/inert';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getPortalRoot } from '@/lib/redesign/utils/portal';
import { NavLink, useLocation } from '@/lib/redesign/router';
import { ArrowRight, ChevronDown, Mail, Phone, X } from 'lucide-react-redesign';
import { mainNav, site } from '@/lib/redesign/data/site';
import { HOMEPAGE_PREVIEW_MODE, resolveLink, scrollToSection } from '@/lib/redesign/config/preview';
import { useDialog } from '@/lib/redesign/hooks/useDialog';
import { Logo } from '@/components/redesign/common/Logo';
import { Button } from '@/components/redesign/common/Button';
import { SmartNavLink } from '@/components/redesign/common/SmartLink';
import { cn } from '@/lib/redesign/utils/cn';
import { EmailText } from '@/components/redesign/common/EmailText';

/** Full-height slide-in navigation for < 1024px. */
export function MobileNav({ open, onClose, activeSection }: { open: boolean; onClose: () => void; activeSection?: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(location.pathname.startsWith('/services'));
  useDialog(open, panelRef, onClose);

  // Close on any navigation (including same-page hash changes in preview mode)
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  if (!open) return null;

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative flex min-h-[52px] items-center justify-between rounded-xl px-4 text-[1.0625rem] font-semibold transition-colors',
      isActive ? 'bg-white/10 text-white before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-gold-400' : 'text-navy-100 hover:bg-white/5 hover:text-white',
    );

  /** Close first, then scroll (the dialog's scroll lock would otherwise swallow the scroll). */
  const closeThenScroll = (to: string) => () => {
    const r = resolveLink(to);
    onClose();
    if (r.kind === 'anchor') window.setTimeout(() => scrollToSection(r.sectionId), 60);
  };

  return createPortal(
    <div className="fixed inset-0 z-[90] lg:hidden">
      <div className="absolute inset-0 animate-[fadeIn_200ms_ease-out] bg-navy-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-y-0 right-0 flex w-full max-w-[420px] animate-[sheetIn_300ms_cubic-bezier(0.22,1,0.36,1)] flex-col bg-navy-900 shadow-lg"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/10 px-4">
          <Logo onClick={onClose} onDark />
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {mainNav.map((item) =>
              item.children && !HOMEPAGE_PREVIEW_MODE ? (
                <li key={item.to}>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services"
                    onClick={() => setServicesOpen((o) => !o)}
                    className="flex min-h-[52px] w-full items-center justify-between rounded-xl px-4 text-[1.0625rem] font-semibold text-navy-100 hover:bg-white/5"
                  >
                    {item.label}
                    <ChevronDown className={cn('h-5 w-5 text-navy-300 transition-transform duration-base', servicesOpen && 'rotate-180')} />
                  </button>
                  <div
                    id="mobile-services"
                    className={cn('grid transition-[grid-template-rows] duration-base ease-brand', servicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                    inert={servicesOpen ? undefined : INERT}
                  >
                    <ul className="ml-4 overflow-hidden border-l border-white/10 pl-3">
                      <li>
                        <NavLink to={item.to} end className={linkCls}>
                          All services
                        </NavLink>
                      </li>
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <NavLink to={c.to} className={linkCls}>
                            <span>
                              <span className="block">{c.label}</span>
                              {c.description && <span className="block text-small font-normal text-navy-300">{c.description}</span>}
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.to}>
                  <SmartNavLink
                    to={item.to}
                    end={item.to === '/'}
                    active={resolveLink(item.to).kind === 'anchor' && (resolveLink(item.to) as { sectionId: string }).sectionId === activeSection}
                    className={linkCls}
                    onNavigate={closeThenScroll(item.to)}
                  >
                    {() => item.label}
                  </SmartNavLink>
                </li>
              ),
            )}
            <li>
              <SmartNavLink to="/signin" className={linkCls}>
                {() => (
                  <>
                    Sign in
                    {HOMEPAGE_PREVIEW_MODE && <span className="text-small font-normal text-navy-300">At launch</span>}
                  </>
                )}
              </SmartNavLink>
            </li>
          </ul>

          <div className="mt-6 space-y-3 rounded-2xl bg-white/5 p-4 text-small ring-1 ring-inset ring-white/10">
            <a href={site.phone.href} className="flex items-center gap-3 font-semibold text-white">
              <Phone className="h-4 w-4 text-gold-400" /> {site.phone.display}
            </a>
            <a href={site.email.href} className="flex min-w-0 items-center gap-3 font-semibold text-white">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" /> <EmailText email={site.email.display} className="min-w-0" />
            </a>
            <p className="text-navy-300">{site.hoursShort}</p>
          </div>
        </nav>

        <div className="shrink-0 border-t border-white/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button to="/apply-passport" size="lg" className="w-full" iconRight={<ArrowRight className="h-5 w-5" />} onClick={closeThenScroll('/apply-passport')}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>,
    getPortalRoot(),
  );
}
