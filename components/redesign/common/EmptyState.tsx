import type { ReactNode } from 'react';
import { cn } from '@/lib/redesign/utils/cn';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  tone?: 'neutral' | 'error';
  /** Use 'h1' when the empty state is the whole page (e.g. article not found) */
  headingLevel?: 'p' | 'h1' | 'h2';
}

export function EmptyState({ icon, title, description, action, className, tone = 'neutral', headingLevel: Title = 'p' }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center rounded-2xl border border-dashed border-line-300 bg-white px-6 py-14 text-center', className)}>
      <span
        className={cn(
          'grid h-14 w-14 place-items-center rounded-full',
          tone === 'error' ? 'bg-danger/10 text-danger' : 'bg-navy-50 text-navy-700',
        )}
        aria-hidden
      >
        {icon}
      </span>
      <Title className="mt-5 text-[1.125rem] font-semibold text-ink-900">{title}</Title>
      {description && <div className="mt-2 max-w-md text-ink-500">{description}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
