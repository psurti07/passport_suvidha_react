'use client';

import { useState } from 'react';
import { Check } from 'lucide-react-redesign';
import type { RequirementSet } from '@/lib/redesign/data/requirements';
import { cn } from '@/lib/redesign/utils/cn';

/**
 * Document checklist. When `interactive`, applicants can tick items off
 * (kept in component state only — nothing is stored or sent).
 */
export function RequirementChecklist({ set, interactive = false, className }: { set: RequirementSet; interactive?: boolean; className?: string }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setDone((cur) => {
      const next = new Set(cur);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-line-200 bg-white', className)}>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line-200 bg-paper-alt px-6 py-5">
        <div>
          <h3 className="text-h3">{set.title}</h3>
          <p className="mt-1 text-small text-ink-500">{set.description}</p>
        </div>
        {interactive && (
          <p className="text-small font-semibold text-navy-700 tabular" aria-live="polite">
            {done.size} of {set.items.length} ready
          </p>
        )}
      </div>
      <ol className="divide-y divide-line-200">
        {set.items.map((item, i) => {
          const checked = done.has(i);
          const content = (
            <>
              <span
                aria-hidden
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 text-[0.75rem] font-bold tabular transition-colors duration-fast',
                  checked ? 'border-navy-700 bg-navy-700 text-white' : 'border-navy-200 text-navy-700',
                )}
              >
                {checked ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className="pt-0.5">
                <span className={cn('block font-medium text-ink-900', checked && 'text-ink-500 line-through decoration-ink-400')}>{item.label}</span>
                {item.note && <span className="mt-0.5 block text-small text-ink-500">{item.note}</span>}
              </span>
            </>
          );
          return (
            <li key={item.label}>
              {interactive ? (
                <label className="flex cursor-pointer items-start gap-4 px-6 py-4 transition-colors hover:bg-navy-50/50">
                  <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(i)} />
                  {content}
                </label>
              ) : (
                <div className="flex items-start gap-4 px-6 py-4">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
