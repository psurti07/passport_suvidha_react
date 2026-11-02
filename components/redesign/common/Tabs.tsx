'use client';

import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/redesign/utils/cn';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
}

/** WAI-ARIA tabs (roving tabindex, arrow/Home/End keys). Controlled, so the active tab can live in the URL. */
export function Tabs({ items, value, onChange, label, className }: TabsProps) {
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const index = Math.max(0, items.findIndex((t) => t.id === value));

  const onKeyDown = (e: KeyboardEvent) => {
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:inline-flex sm:rounded-full sm:border sm:border-line-200 sm:bg-white sm:p-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map((t, i) => {
          const active = i === index;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${base}-panel-${t.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(t.id)}
              className={cn(
                'flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 text-[0.9375rem] font-semibold transition-colors duration-fast',
                active ? 'bg-navy-700 text-white shadow-xs' : 'border border-line-200 bg-white text-ink-700 hover:text-navy-700 sm:border-transparent sm:bg-transparent',
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t, i) => (
        <div
          key={t.id}
          id={`${base}-panel-${t.id}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={i !== index}
          tabIndex={0}
          className="mt-8 outline-none"
        >
          {i === index && t.content}
        </div>
      ))}
    </div>
  );
}
