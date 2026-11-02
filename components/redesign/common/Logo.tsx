'use client';

import { Link } from '@/lib/redesign/router';
import { cn } from '@/lib/redesign/utils/cn';

/**
 * Original Passport Suvidha logo (unaltered artwork, background removed).
 * File: /public/assets/brand/logo.png (728×268). Replace with an official SVG
 * when available — keep the same aspect ratio.
 */
/**
 * `onDark`: the logo's navy lettering is unreadable on navy, so it sits on a small
 * white plate (the artwork itself is unchanged). Swap for an official reversed
 * logo when the client supplies one.
 */
export function Logo({ className, onClick, compact, onDark }: { className?: string; onClick?: () => void; compact?: boolean; onDark?: boolean }) {
  return (
    <Link
      to="/"
      onClick={(e) => {
        onClick?.();
        // Already on the homepage: smooth-scroll to the top instead of a no-op navigation
        if (window.location.pathname === '/' && !window.location.hash) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
      }}
      className={cn(
        'inline-flex shrink-0 items-center',
        onDark && 'rounded-lg bg-white px-2.5 py-1.5 shadow-[0_4px_14px_-6px_rgb(0_0_0/0.5)]',
        className,
      )}
      aria-label="Passport Suvidha — home"
    >
      <img
        src="/assets/brand/logo.png"
        alt="Passport Suvidha"
        width={728}
        height={268}
        className={cn('w-auto transition-[height] duration-base ease-brand', onDark ? (compact ? 'h-8' : 'h-9') : compact ? 'h-10' : 'h-11 sm:h-12')}
      />
    </Link>
  );
}
