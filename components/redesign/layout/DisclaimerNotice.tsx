'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getPortalRoot } from '@/lib/redesign/utils/portal';
import { Link } from '@/lib/redesign/router';
import { Check, ExternalLink, ShieldAlert } from 'lucide-react-redesign';
import { DISCLAIMER_NOTICE } from '@/lib/redesign/config/disclaimerNotice';
import { OFFICIAL_PORTAL_URL } from '@/lib/redesign/data/requirements';
import { useDialog } from '@/lib/redesign/hooks/useDialog';

const readAck = () => {
  try {
    return window.sessionStorage.getItem(DISCLAIMER_NOTICE.storageKey) === '1';
  } catch {
    return false;
  }
};
const writeAck = () => {
  try {
    window.sessionStorage.setItem(DISCLAIMER_NOTICE.storageKey, '1');
  } catch {
    /* storage unavailable (private mode) — the notice simply shows again next load */
  }
};

/** Resolves once the page has loaded and the brand intro (first visit) has finished. */
function whenPageReady(cb: () => void) {
  const root = document.documentElement;
  let mo: MutationObserver | null = null;
  const afterIntro = () => {
    if (!root.classList.contains('intro-active')) return cb();
    mo = new MutationObserver(() => {
      if (!root.classList.contains('intro-active')) {
        mo?.disconnect();
        cb();
      }
    });
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
  };
  if (document.readyState === 'complete') afterIntro();
  else window.addEventListener('load', afterIntro, { once: true });
  return () => {
    window.removeEventListener('load', afterIntro);
    mo?.disconnect();
  };
}

/**
 * IMPORTANT NOTICE modal — private-consultancy disclaimer and fee information,
 * shown once per session. Mounted once in the Layout, so route changes never
 * re-trigger it. Content and timing: src/config/disclaimerNotice.ts.
 */
export function DisclaimerNotice() {
  const [open, setOpen] = useState(false);
  const dismissed = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!DISCLAIMER_NOTICE.enabled || readAck()) return;
    let timer = 0;
    const tryOpen = () => {
      if (dismissed.current || readAck()) return;
      // Never stack on top of another open dialog (menu, search, video) — wait for it to close.
      if (document.querySelector('[aria-modal="true"]')) {
        timer = window.setTimeout(tryOpen, 1000);
        return;
      }
      setOpen(true);
    };
    const stop = whenPageReady(() => {
      timer = window.setTimeout(tryOpen, DISCLAIMER_NOTICE.delayMs);
    });
    return () => {
      stop();
      window.clearTimeout(timer);
    };
  }, []);

  const acknowledge = useCallback(() => {
    writeAck();
    setOpen(false);
  }, []);

  // Escape closes the notice for this visit without recording an acknowledgement.
  const dismiss = useCallback(() => {
    dismissed.current = true;
    setOpen(false);
  }, []);

  useDialog(open, panelRef, dismiss);

  // Keep the page behind the dialog out of reach of keyboard and screen readers.
  useEffect(() => {
    const app = document.getElementById('ps-app');
    if (!open || !app) return;
    app.setAttribute('inert', '');
    return () => app.removeAttribute('inert');
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div aria-hidden className="absolute inset-0 animate-[fadeIn_200ms_ease-out] bg-navy-950/70 backdrop-blur-[2px]" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-title"
        aria-describedby="notice-intro"
        tabIndex={-1}
        className="relative flex max-h-[min(92dvh,760px)] w-full max-w-[640px] animate-[modalIn_260ms_var(--ease-out)] flex-col overflow-hidden rounded-t-[24px] bg-white shadow-lg outline-none sm:rounded-[24px]"
      >
        {/* Header */}
        <div className="relative shrink-0 bg-navy-900 px-5 py-4 text-white sm:px-7 sm:py-5">
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-gold-400" />
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-400 text-navy-900">
              <ShieldAlert className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 id="notice-title" tabIndex={-1} data-autofocus className="text-[1.0625rem] outline-none focus:shadow-none focus-visible:shadow-none font-bold uppercase tracking-[0.08em] text-white sm:text-[1.125rem]">
                Important Notice
              </h2>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 text-[0.9375rem] leading-relaxed text-ink-700 sm:px-7 sm:py-6">
          <p id="notice-intro" className="rounded-xl bg-navy-50 p-4 font-semibold text-navy-900 ring-1 ring-inset ring-navy-100">
            Passport Suvidha is an independent Private Passport Consultancy, not a government website or affiliated with any government authority.
          </p>
          <p className="mt-4">
            We provide online passport application assistance only. Passport approval, verification and issuance are handled by the concerned government
            authorities. We do not guarantee approval or processing time.
          </p>

          {/* Fees — consultancy fee kept visually separate from government fees */}
          <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col justify-center rounded-xl bg-gold-100 p-4 ring-1 ring-inset ring-gold-400/60">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold-700">Consultancy Fee</p>
              <p className="mt-1 text-[1.75rem] font-bold leading-none text-navy-900">{DISCLAIMER_NOTICE.consultancyFee}</p>
            </div>
            <div className="rounded-xl p-4 ring-1 ring-inset ring-line-200">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-navy-500">Applicable Government Fee</p>
              <table className="mt-2 w-full text-[0.875rem]">
                <caption className="sr-only">Applicable government passport fees</caption>
                <tbody className="divide-y divide-line-200">
                  {DISCLAIMER_NOTICE.governmentFees.map((f) => (
                    <tr key={f.service}>
                      <th scope="row" className="py-1.5 pr-3 text-left font-normal text-ink-700">
                        {f.service}
                      </th>
                      <td className="whitespace-nowrap py-1.5 text-right font-semibold tabular-nums text-ink-900">{f.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4">
            Government fees are separate from our consultancy fee. Please verify applicable government fees on the{' '}
            <a href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-700 underline decoration-navy-200 underline-offset-4 hover:decoration-navy-700">
              official Passport Seva website
              <ExternalLink className="ml-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
          <p className="mt-3">Customers must provide accurate information and genuine documents.</p>
          <p className="mt-3 text-ink-500">
            By continuing, you acknowledge that Passport Suvidha is a private consultancy and agree to our Terms &amp; Conditions and Refund Policy.
          </p>
        </div>

        {/* Footer: legal links + acknowledgement */}
        <div className="shrink-0 border-t border-line-200 bg-paper-alt px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-7">
          <p className="mb-3 flex items-center justify-center gap-3 text-small sm:mb-0 sm:justify-start">
            <Link to="/terms" target="_blank" rel="noopener" className="font-semibold text-navy-700 underline decoration-navy-200 underline-offset-4 hover:decoration-navy-700">
              Terms &amp; Conditions<span className="sr-only"> (opens in a new tab)</span>
            </Link>
            <span aria-hidden className="text-line-300">|</span>
            <Link to="/refund-policy" target="_blank" rel="noopener" className="font-semibold text-navy-700 underline decoration-navy-200 underline-offset-4 hover:decoration-navy-700">
              Refund Policy<span className="sr-only"> (opens in a new tab)</span>
            </Link>
          </p>
          <button
            type="button"
            onClick={acknowledge}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-6 text-[0.9375rem] font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-500 sm:w-auto"
          >
            <Check className="h-4 w-4" aria-hidden />I Understand &amp; Continue
          </button>
        </div>
      </div>
    </div>,
    getPortalRoot(),
  );
}
