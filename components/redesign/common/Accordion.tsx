'use client';

import { INERT } from '@/lib/redesign/utils/inert';
import { useId, useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow several panels open at once */
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  /** Heading level for the trigger wrapper (keeps document outline valid) */
  headingLevel?: 'h3' | 'h4';
}

/**
 * WAI-ARIA accordion: button[aria-expanded] controls a labelled region.
 * Height animation uses the grid-rows 0fr → 1fr technique (no JS measuring).
 */
export function Accordion({ items, multiple = false, defaultOpen = [], className, headingLevel: H = 'h3' }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const baseId = useId();

  const toggle = (id: string) =>
    setOpen((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : multiple ? [...cur, id] : [id]));

  return (
    <div className={cn('divide-y divide-line-200 border-y border-line-200', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const btnId = `${baseId}-${item.id}-btn`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <H className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-4 text-left text-base font-semibold text-ink-900 transition-colors duration-fast hover:text-navy-700"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-base ease-brand',
                    isOpen ? 'rotate-45 border-navy-700 bg-navy-700 text-white' : 'border-line-300 text-navy-700 group-hover:border-navy-300',
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                </span>
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-base ease-brand',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
              inert={isOpen ? undefined : INERT}
            >
              <div className="overflow-hidden">
                <div className="max-w-prose pb-5 pr-12 text-[0.9375rem] leading-relaxed text-ink-500">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
