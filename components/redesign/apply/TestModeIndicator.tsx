'use client';

import { useState } from 'react';
import { FlaskConical, X } from 'lucide-react-redesign';
import { DEMO_OTP } from '@/lib/redesign/config/applyFlow';
import { applicationAdapter } from '@/lib/redesign/services/applicationService';

/**
 * Small test-environment indicator, outside the page design. Renders only while the local
 * simulation is active, which can never happen with NEXT_PUBLIC_SITE_ENV=production or a
 * connected backend, so customers never see it. It tells whoever is testing what is
 * simulated, because the page itself carries no demo messaging.
 */
export function TestModeIndicator({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  if (!applicationAdapter.demo) return null;

  return (
    <div data-test-indicator className={className}>
      {open ? (
        <div className="w-72 max-w-full rounded-xl border border-warning/40 bg-white p-3.5 text-[0.8125rem] leading-relaxed text-ink-700 shadow-lg">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 font-bold text-warning">
              <FlaskConical className="h-4 w-4" aria-hidden />
              Test environment
            </p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close test information" className="rounded p-0.5 text-ink-500 hover:text-ink-900">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Nothing is sent: no SMS, no data, no payment.</li>
            <li>
              Code <strong className="tabular">{DEMO_OTP.valid}</strong> continues, <strong className="tabular">{DEMO_OTP.expired}</strong> shows the expired state, any other shows an error.
            </li>
            <li>Police stations are samples. Fees are placeholders until confirmed.</li>
          </ul>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-white/95 px-3 py-1.5 text-[0.75rem] font-semibold text-warning shadow-sm"
        >
          <FlaskConical className="h-3.5 w-3.5" aria-hidden />
          Test environment
        </button>
      )}
    </div>
  );
}
