'use client';

import { useEffect, useRef, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, Info, Loader2 } from 'lucide-react-redesign';
import { Button } from '@/components/redesign/common/Button';
import { cn } from '@/lib/redesign/utils/cn';

interface StepFrameProps {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  onSubmit: () => void;
  onBack?: () => void;
  backLabel?: string;
  submitLabel?: string;
  busy?: boolean;
  busyLabel?: string;
  /** Step-level message (server error, not connected…) shown above the buttons. */
  alert?: { tone: 'error' | 'info'; message: ReactNode } | null;
  formRef?: React.RefObject<HTMLFormElement>;
  /** Number of field errors — announced in a summary after a failed Continue. */
  errorCount?: number;
  hideSubmit?: boolean;
  footerNote?: ReactNode;
  /** Move focus to the heading when the step opens (not on first page load). */
  focusOnMount?: boolean;
  /** The step places its own action (Review & Pay): no Back/Continue row. */
  hideFooter?: boolean;
}

/**
 * Shared shell for every Apply Now step: heading (focused when the step opens so
 * screen readers announce it), fields, an optional alert and Back/Continue.
 */
export function StepFrame({
  title,
  description,
  children,
  onSubmit,
  onBack,
  backLabel = 'Back',
  submitLabel = 'Continue',
  busy,
  busyLabel = 'Please wait…',
  alert,
  formRef,
  errorCount = 0,
  hideSubmit,
  footerNote,
  focusOnMount = true,
  hideFooter,
}: StepFrameProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (focusOnMount) headingRef.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (!busy) onSubmit();
  };

  return (
    <form ref={formRef} onSubmit={handle} noValidate aria-labelledby="apply-step-title" aria-busy={busy || undefined}>
      <header className="mb-5">
        <h2 id="apply-step-title" ref={headingRef} tabIndex={-1} className="text-[1.25rem] font-bold leading-tight text-ink-900 outline-none sm:text-[1.375rem]">
          {title}
        </h2>
        {description && <p className="mt-1 text-[0.9375rem] text-ink-500">{description}</p>}
      </header>

      {children}

      {errorCount > 1 && (
        <p className="mt-5 flex items-center gap-2 text-small font-medium text-danger" role="status">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
          Please correct the {errorCount} highlighted fields.
        </p>
      )}

      {alert && !hideFooter && (
        <div
          role={alert.tone === 'error' ? 'alert' : 'status'}
          className={cn(
            'mt-5 flex gap-2.5 rounded-lg border px-3.5 py-3 text-small',
            alert.tone === 'error' ? 'border-danger/30 bg-danger/5 text-ink-900' : 'border-navy-100 bg-navy-50/70 text-ink-700',
          )}
        >
          {alert.tone === 'error' ? (
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
          ) : (
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden />
          )}
          <div>{alert.message}</div>
        </div>
      )}

      {!hideFooter && (
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-line-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {onBack ? (
          <Button type="button" variant="ghost" size="md" onClick={onBack} disabled={busy} iconLeft={<ArrowLeft className="h-4 w-4" aria-hidden />}>
            {backLabel}
          </Button>
        ) : (
          footerNote ?? <span />
        )}
        {!hideSubmit && (
          <Button
            type="submit"
            size="md"
            className="w-full sm:w-auto sm:min-w-[11rem]"
            disabled={busy}
            iconLeft={busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : undefined}
            iconRight={busy ? undefined : <ArrowRight className="h-4 w-4" aria-hidden />}
          >
            {busy ? busyLabel : submitLabel}
          </Button>
        )}
      </div>
      )}
      {onBack && footerNote && <div className="mt-4">{footerNote}</div>}
    </form>
  );
}

/** Group of related fields with a small heading. */
export function FieldSection({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn('space-y-4', className)} aria-label={title}>
      <h3 className="flex items-center gap-2.5 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-navy-700">
        {title}
        <span aria-hidden className="h-px flex-1 bg-line-200" />
      </h3>
      {children}
    </section>
  );
}
