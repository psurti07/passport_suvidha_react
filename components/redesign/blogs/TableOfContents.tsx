'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/redesign/utils/cn';

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Sticky "On this page" list that highlights the section currently in view. */
export function TableOfContents({ items, className }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className={className}>
      <p className="text-eyebrow uppercase text-ink-400">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-line-200">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? 'location' : undefined}
              className={cn(
                '-ml-px block border-l-2 py-1.5 text-small transition-colors',
                i.level === 3 ? 'pl-7' : 'pl-4',
                active === i.id ? 'border-navy-700 font-semibold text-navy-700' : 'border-transparent text-ink-500 hover:text-ink-900',
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
