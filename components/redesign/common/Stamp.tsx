'use client';

import { useId } from 'react';
import { Plane } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

/** Circular "entry stamp" mark used as a decorative accent. */
export function Stamp({ className, text = 'PASSPORT SUVIDHA • ASSISTANCE • INDIA • ' }: { className?: string; text?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={cn('relative grid place-items-center', className)} aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path id={`stamp-${id}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
        <text fill="currentColor" fontSize="9.6" fontWeight="700" letterSpacing="2.1">
          <textPath href={`#stamp-${id}`}>{text}</textPath>
        </text>
      </svg>
      <Plane className="relative h-[26%] w-[26%] -rotate-45" strokeWidth={1.75} />
    </div>
  );
}
