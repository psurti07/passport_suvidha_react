'use client';

import { Check } from 'lucide-react-redesign';
import { APPLY_STEPS, type ApplyStepId } from '@/lib/redesign/config/applyFlow';
import { cn } from '@/lib/redesign/utils/cn';

interface ApplyProgressProps {
  current: ApplyStepId;
  /** Index of the furthest step reached; earlier steps can be revisited. */
  furthest: number;
  /** Whether a step can be opened from the progress bar (e.g. not before verification). */
  canOpen?: (id: ApplyStepId) => boolean;
  onSelect?: (id: ApplyStepId) => void;
  className?: string;
}

/**
 * Step indicator for the Apply Now journey.
 * Phones: "Step 2 of 5 · Verify mobile" with a segmented bar.
 * ≥ sm: numbered steps with labels; completed steps show a tick and can be revisited.
 */
export function ApplyProgress({ current, furthest, canOpen = () => true, onSelect, className }: ApplyProgressProps) {
  const currentIndex = APPLY_STEPS.findIndex((s) => s.id === current);
  const total = APPLY_STEPS.length;

  return (
    <nav aria-label="Application progress" className={className}>
      {/* Compact (phones) */}
      <div className="sm:hidden">
        {/* The step heading sits right below, so this line names the step count and what comes next */}
        <p className="flex items-baseline justify-between gap-3 text-small">
          <span className="tabular font-semibold text-ink-900">
            Step {currentIndex + 1} of {total}
          </span>
          {APPLY_STEPS[currentIndex + 1] && <span className="truncate text-ink-500">Next: {APPLY_STEPS[currentIndex + 1].label}</span>}
        </p>
        <div className="mt-2 grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }} aria-hidden>
          {APPLY_STEPS.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                'h-1.5 rounded-full transition-colors duration-base',
                i < currentIndex ? 'bg-navy-700' : i === currentIndex ? 'bg-gold-400' : 'bg-line-200',
              )}
            />
          ))}
        </div>
      </div>

      {/* Full (≥ sm) */}
      <ol className="hidden items-start sm:flex">
        {APPLY_STEPS.map((s, i) => {
          const done = i < currentIndex || (i <= furthest && i !== currentIndex);
          const isCurrent = i === currentIndex;
          const openable = !!onSelect && !isCurrent && i <= furthest && canOpen(s.id);
          const state = isCurrent ? 'current step' : done ? 'completed' : 'not started';
          const marker = (
            <>
              <span
                className={cn(
                  'relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-[0.8125rem] font-bold transition-colors duration-base',
                  isCurrent && 'border-navy-700 bg-navy-700 text-white ring-4 ring-navy-100',
                  done && !isCurrent && 'border-navy-700 bg-white text-navy-700',
                  !done && !isCurrent && 'border-line-300 bg-white text-ink-400',
                )}
              >
                {done && !isCurrent ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  'mt-2 block text-center text-[0.8125rem] leading-tight',
                  isCurrent ? 'font-semibold text-ink-900' : done ? 'font-medium text-ink-700' : 'text-ink-500',
                )}
              >
                {s.label}
                <span className="sr-only"> ({state})</span>
              </span>
            </>
          );
          return (
            <li key={s.id} className="relative flex flex-1 flex-col items-center" aria-current={isCurrent ? 'step' : undefined}>
              {i > 0 && (
                <span
                  aria-hidden
                  className={cn(
                    'absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 transition-colors duration-base',
                    i <= currentIndex ? 'bg-navy-700' : 'bg-line-200',
                  )}
                />
              )}
              {openable ? (
                <button
                  type="button"
                  onClick={() => onSelect(s.id)}
                  className="group flex flex-col items-center rounded-lg px-1 outline-none focus-visible:shadow-focus"
                >
                  {marker}
                </button>
              ) : (
                <span className="flex flex-col items-center px-1">{marker}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
