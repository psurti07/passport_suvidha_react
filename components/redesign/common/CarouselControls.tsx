'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

interface CarouselControlsProps {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onDark?: boolean;
  className?: string;
}

export function CarouselArrows({ label, canPrev, canNext, onPrev, onNext, onDark, className }: CarouselControlsProps) {
  const btn = cn(
    'grid h-12 w-12 place-items-center rounded-full border transition-all duration-fast ease-brand disabled:cursor-not-allowed disabled:opacity-35',
    onDark
      ? 'border-white/20 text-white enabled:hover:border-white/50 enabled:hover:bg-white/10'
      : 'border-line-300 bg-white text-navy-900 enabled:hover:border-navy-700 enabled:hover:bg-navy-700 enabled:hover:text-white',
  );
  return (
    <div className={cn('flex items-center gap-2', className)} role="group" aria-label={`${label} navigation`}>
      <button type="button" className={btn} onClick={onPrev} disabled={!canPrev} aria-label={`Previous ${label}`}>
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button type="button" className={btn} onClick={onNext} disabled={!canNext} aria-label={`Next ${label}`}>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

interface DotsProps {
  pages: number;
  active: number;
  onSelect: (i: number) => void;
  label: string;
  onDark?: boolean;
  className?: string;
}

/** Progress dots. Buttons are 24px tall for touch while the visible dot stays small. */
export function CarouselDots({ pages, active, onSelect, label, onDark, className }: DotsProps) {
  if (pages <= 1) return null;
  return (
    <div className={cn('hidden items-center justify-center gap-1 sm:flex', className)}>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Go to ${label} ${i + 1} of ${pages}`}
          aria-current={i === active ? 'true' : undefined}
          className="group grid h-6 place-items-center px-0.5"
        >
          <span
            className={cn(
              'block h-1.5 rounded-full transition-all duration-base ease-brand',
              i === active
                ? cn('w-6', onDark ? 'bg-gold-400' : 'bg-navy-700')
                : cn('w-1.5', onDark ? 'bg-white/30 group-hover:bg-white/60' : 'bg-line-300 group-hover:bg-navy-300'),
            )}
          />
        </button>
      ))}
    </div>
  );
}
