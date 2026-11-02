'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

function range(page: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: Array<number | '…'> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

export function Pagination({ page, totalPages, onChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;
  const btn = 'grid h-11 min-w-11 place-items-center rounded-full px-3 text-[0.9375rem] font-semibold transition-colors duration-fast';
  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-1.5', className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={cn(btn, 'border border-line-300 text-navy-900 hover:bg-navy-50 disabled:pointer-events-none disabled:opacity-40')}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <ul className="flex items-center gap-1.5">
        {range(page, totalPages).map((p, i) =>
          p === '…' ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 text-ink-400">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onChange(p)}
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                className={cn(btn, p === page ? 'bg-navy-700 text-white' : 'text-ink-700 hover:bg-navy-50')}
              >
                {p}
              </button>
            </li>
          ),
        )}
      </ul>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={cn(btn, 'border border-line-300 text-navy-900 hover:bg-navy-50 disabled:pointer-events-none disabled:opacity-40')}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}
