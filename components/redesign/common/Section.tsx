import type { ReactNode } from 'react';
import { cn } from '@/lib/redesign/utils/cn';
import { Reveal } from './Reveal';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /**
   * Background system — pick for rhythm, never alternate mechanically:
   * white · alt (#F5F9FC very light blue) · soft (#EEF5FA) · warm · brand (#00457E) · navy (#062B4F)
   */
  tone?: 'white' | 'alt' | 'soft' | 'warm' | 'brand' | 'navy';
  /** Tighter vertical padding for supporting sections */
  compact?: boolean;
  /** Accessible name for the landmark — pass the heading id */
  labelledBy?: string;
}

const tones = {
  white: 'bg-paper',
  alt: 'bg-paper-alt',
  soft: 'bg-navy-50',
  warm: 'bg-paper-warm',
  brand: 'bg-navy-700 text-navy-100',
  navy: 'bg-navy-900 text-navy-100',
};

export function Section({ id, children, className, tone = 'white', labelledBy, compact }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(compact ? 'section-y-sm' : 'section-y', 'relative', tones[tone], className)}>
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  onDark?: boolean;
  action?: ReactNode;
  className?: string;
}

/**
 * Section heading with an index-style eyebrow. Left-aligned by default, with an
 * optional action (e.g. "View all") on the right at desktop widths.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  onDark,
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <Reveal
      className={cn(
        'mb-8 flex flex-col gap-5 lg:mb-10',
        centered ? 'items-center text-center' : action ? 'lg:flex-row lg:items-end lg:justify-between' : 'items-start',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('eyebrow mb-3 flex items-center gap-3', centered && 'justify-center', onDark && 'text-gold-400')}>
            <span aria-hidden className={cn('h-px w-6', onDark ? 'bg-gold-400' : 'bg-navy-300')} />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className={cn('text-h2', onDark && 'text-white')}>
          {title}
        </h2>
        {description && (
          <p className={cn('mt-3 text-body-lg', onDark ? 'text-navy-100/80' : 'text-ink-500')}>{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
