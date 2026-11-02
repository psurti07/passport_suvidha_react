'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@/lib/redesign/router';
import { SmartLink } from '@/components/redesign/common/SmartLink';
import { ArrowRight, Headset, Mail, MessageSquare, Phone, X } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { cn } from '@/lib/redesign/utils/cn';

/**
 * Mobile: a sticky bottom bar (Call + Apply Now) — the two most important actions.
 * Desktop: a single compact "Talk to an expert" button that opens contact options.
 *
 * INTEGRATION: the current site has a live chat widget ("Expert Passport
 * Consultant"). If the developer re-enables it, mount it here and remove the
 * popover so only one floating element is shown.
 */
export function QuickActions() {
  const [open, setOpen] = useState(false);
  // On the application page itself, the bar only offers a call button.
  const onApplyPage = useLocation().pathname === '/apply-passport';
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/[0.08] bg-white/90 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_32px_-18px_rgb(4_30_56/0.45)] backdrop-blur-xl backdrop-saturate-150 lg:hidden">
        <div className="mx-auto flex max-w-md gap-2.5">
          <a
            href={site.phone.href}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white text-[0.9375rem] font-semibold text-navy-900 transition-colors active:bg-navy-50"
          >
            <Phone className="h-4 w-4 text-navy-700" /> Call us
          </a>
          {!onApplyPage && (
            <SmartLink
              to="/apply-passport"
              className="flex h-11 flex-[1.4] items-center justify-center gap-2 rounded-full bg-gold-400 text-[0.9375rem] font-semibold text-navy-900 shadow-[0_6px_16px_-8px_rgb(200_160_0/0.9)] transition-colors active:bg-gold-500"
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </SmartLink>
          )}
        </div>
      </div>

      {/* Desktop help button */}
      <div ref={ref} className="fixed bottom-6 right-6 z-40 hidden lg:block">
        {open && (
          <div
            id="quick-help"
            role="dialog"
            aria-label="Talk to an expert"
            className="absolute bottom-16 right-0 w-80 animate-[dropIn_200ms_ease-out] overflow-hidden rounded-xl border border-line-200 bg-white shadow-lg"
          >
            <div className="bg-navy-700 px-5 py-4 text-white">
              <p className="font-semibold">Talk to a passport expert</p>
              <p className="mt-0.5 text-small text-navy-100">{site.hoursShort}</p>
            </div>
            <ul className="p-2">
              {[
                { href: site.phone.href, icon: Phone, label: 'Call us', sub: site.phone.display },
                { href: site.email.href, icon: Mail, label: 'Email us', sub: site.email.display },
              ].map((a) => (
                <li key={a.label}>
                  <a href={a.href} className="flex items-center gap-3 rounded-lg p-3 hover:bg-navy-50">
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-navy-50 text-navy-700">
                      <a.icon className="h-[18px] w-[18px]" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink-900">{a.label}</span>
                      <span className="block text-small text-ink-500">{a.sub}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <SmartLink to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg p-3 hover:bg-navy-50">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-navy-50 text-navy-700">
                    <MessageSquare className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink-900">Send a message</span>
                    <span className="block text-small text-ink-500">We reply by email</span>
                  </span>
                </SmartLink>
              </li>
            </ul>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="quick-help"
          className={cn(
            'flex h-14 items-center gap-2.5 rounded-full pl-4 pr-5 font-semibold shadow-md transition-colors duration-fast',
            open ? 'bg-white text-navy-900 ring-1 ring-line-300' : 'bg-navy-700 text-white hover:bg-navy-800',
          )}
        >
          {open ? <X className="h-5 w-5" /> : <Headset className="h-5 w-5 text-gold-400" />}
          {open ? 'Close' : 'Talk to an expert'}
        </button>
      </div>
    </>
  );
}
