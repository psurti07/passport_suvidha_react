'use client';

import { useId, useRef, type ReactNode } from 'react';
import { ChevronDown, PencilLine, type LucideIcon } from 'lucide-react-redesign';
import { Button } from '@/components/redesign/common/Button';
import { INERT } from '@/lib/redesign/utils/inert';
import { cn } from '@/lib/redesign/utils/cn';

interface ReviewAccordionProps {
  title: string;
  icon: LucideIcon;
  /** One line shown while collapsed, so nothing important is hidden entirely. */
  preview: string;
  rows: Array<[string, ReactNode]>;
  editLabel: string;
  onEdit: () => void;
  open: boolean;
  onToggle: () => void;
}

/** One section of the Review & Pay summary. The Edit action appears only when expanded. */
export function ReviewAccordion({ title, icon: Icon, preview, rows, editLabel, onEdit, open, onToggle }: ReviewAccordionProps) {
  const id = useId();
  const root = useRef<HTMLElement>(null);

  const toggle = () => {
    onToggle();
    // Opening near the bottom of the screen: bring the section into view once it has grown
    if (!open) {
      window.setTimeout(() => {
        const r = root.current?.getBoundingClientRect();
        if (r && r.bottom > window.innerHeight) root.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 260);
    }
  };

  return (
    <section ref={root} className={cn('scroll-mt-28 rounded-xl border bg-white transition-[border-color,box-shadow] duration-base', open ? 'border-navy-200 shadow-sm' : 'border-line-200 hover:border-navy-200')}>
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={toggle}
          className="flex min-h-[3.75rem] w-full items-center gap-3 rounded-xl px-4 py-3 text-left outline-none focus-visible:shadow-focus"
        >
          <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.9375rem] font-semibold text-ink-900">{title}</span>
            <span className={cn('block truncate text-[0.8125rem] text-ink-500', open && 'sr-only')}>{preview}</span>
          </span>
          <ChevronDown aria-hidden className={cn('h-5 w-5 shrink-0 text-ink-500 transition-transform duration-base', open && 'rotate-180')} />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        inert={open ? undefined : INERT}
        className={cn('grid transition-[grid-template-rows] duration-base ease-brand', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-line-200 px-4 pb-4 pt-3.5">
            <dl className="grid gap-x-6 gap-y-3 text-small sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k} className="min-w-0">
                  <dt className="text-[0.75rem] font-medium uppercase tracking-[0.04em] text-ink-500">{k}</dt>
                  <dd className="mt-0.5 break-words font-medium text-ink-900">{v || '—'}</dd>
                </div>
              ))}
            </dl>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onEdit} iconLeft={<PencilLine className="h-3.5 w-3.5" aria-hidden />}>
              {editLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
