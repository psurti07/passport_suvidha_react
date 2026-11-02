import type { ReactNode } from 'react';
import { cn } from '@/lib/redesign/utils/cn';

type Tone = 'navy' | 'gold' | 'neutral' | 'outline' | 'on-dark';

const tones: Record<Tone, string> = {
  navy: 'bg-navy-50 text-navy-700 ring-1 ring-inset ring-navy-100',
  gold: 'bg-gold-100 text-gold-700 ring-1 ring-inset ring-gold-400/50',
  neutral: 'bg-paper-alt text-ink-700 ring-1 ring-inset ring-line-200',
  outline: 'text-ink-500 ring-1 ring-inset ring-line-300',
  'on-dark': 'bg-white/10 text-white ring-1 ring-inset ring-white/20',
};

export function Badge({ children, tone = 'navy', className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] font-semibold leading-none',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small marker shown next to numbers/content awaiting client confirmation. */
export function PlaceholderMarker({ className, label = 'To be confirmed', onDark }: { className?: string; label?: string; onDark?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-dashed px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide',
        onDark ? 'border-gold-400/60 bg-gold-400/10 text-gold-400' : 'border-warning/60 bg-warning/5 text-warning',
        className,
      )}
      title="Placeholder — awaiting confirmation from Passport Suvidha"
    >
      {label}
    </span>
  );
}
