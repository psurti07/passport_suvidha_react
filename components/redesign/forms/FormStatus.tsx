import { AlertTriangle, CheckCircle2, PlugZap } from 'lucide-react-redesign';
import type { ReactNode } from 'react';
import { site } from '@/lib/redesign/data/site';
import { cn } from '@/lib/redesign/utils/cn';
import type { SubmitResult } from '@/lib/redesign/services/formsService';
import { EmailText } from '@/components/redesign/common/EmailText';

/**
 * Honest result banner for form submissions. In "not-connected" mode it says
 * plainly that nothing was sent, and offers the real phone/email instead.
 */
export function FormStatus({ result, successMessage, className }: { result: SubmitResult | null; successMessage?: ReactNode; className?: string }) {
  if (!result) return null;

  const variants = {
    'not-connected': {
      icon: PlugZap,
      cls: 'border-warning/30 bg-warning/5',
      iconCls: 'text-warning',
      title: 'This form is not connected yet',
      body: (
        <>
          Your details were checked but <strong className="font-semibold text-ink-900">not sent</strong> — this form isn’t linked to our
          systems yet. Please call <a className="font-semibold text-navy-700 underline" href={site.phone.href}>{site.phone.display}</a> or email{' '}
          <a className="font-semibold text-navy-700 underline" href={site.email.href}><EmailText email={site.email.display} /></a>.
        </>
      ),
    },
    success: {
      icon: CheckCircle2,
      cls: 'border-success/30 bg-success/5',
      iconCls: 'text-success',
      title: 'Thank you',
      body: (result.kind === 'success' && result.message) || successMessage || 'We have received your details.',
    },
    error: {
      icon: AlertTriangle,
      cls: 'border-danger/30 bg-danger/5',
      iconCls: 'text-danger',
      title: 'Something went wrong',
      body: result.kind === 'error' ? result.message : '',
    },
  } as const;

  const v = variants[result.kind];
  return (
    <div role="status" aria-live="polite" className={cn('flex gap-3 rounded-lg border p-4 text-small leading-relaxed text-ink-700', v.cls, className)}>
      <v.icon className={cn('mt-0.5 h-5 w-5 shrink-0', v.iconCls)} aria-hidden />
      <div>
        <p className="font-semibold text-ink-900">{v.title}</p>
        <p className="mt-0.5">{v.body}</p>
      </div>
    </div>
  );
}
