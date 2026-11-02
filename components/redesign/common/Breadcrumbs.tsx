'use client';

import { Link } from '@/lib/redesign/router';
import { ChevronRight } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

export interface Crumb {
  label: string;
  /** Omit for the current page */
  to?: string;
}

/** Visible breadcrumb trail. Pair with `breadcrumbJsonLd()` for structured data. */
export function Breadcrumbs({ items, className, onDark }: { items: Crumb[]; className?: string; onDark?: boolean }) {
  const all: Crumb[] = [{ label: 'Home', to: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-small', onDark ? 'text-navy-200' : 'text-ink-500')}>
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.to && !last ? (
                <Link to={c.to} className={cn('transition-colors', onDark ? 'hover:text-white' : 'hover:text-navy-700')}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={cn('font-medium', onDark ? 'text-white' : 'text-ink-900')}>
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
