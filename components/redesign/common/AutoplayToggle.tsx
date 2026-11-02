'use client';

import { Pause, Play } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

/** Pause/Play control for auto-advancing carousels (required for auto-moving content). */
export function AutoplayToggle({ paused, onToggle, label, onDark }: { paused: boolean; onToggle: () => void; label: string; onDark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      aria-label={paused ? `Play ${label} slideshow` : `Pause ${label} slideshow`}
      className={cn(
        'grid h-12 w-12 place-items-center rounded-full border transition-colors',
        onDark ? 'border-white/20 text-white hover:border-white/50 hover:bg-white/10' : 'border-line-300 bg-white text-navy-900 hover:border-navy-700',
      )}
    >
      {paused ? <Play className="h-4 w-4" fill="currentColor" /> : <Pause className="h-4 w-4" fill="currentColor" />}
    </button>
  );
}

/** Thin progress line that restarts on every slide and freezes while paused. */
export function AutoplayProgress({ slideKey, durationMs, running, onDark }: { slideKey: number; durationMs: number; running: boolean; onDark?: boolean }) {
  return (
    <div aria-hidden className={cn('h-0.5 overflow-hidden rounded-full', onDark ? 'bg-white/15' : 'bg-line-200')}>
      <span
        key={slideKey}
        className="block h-full origin-left rounded-full bg-gold-400"
        style={{ animation: `ps-carouselProgress ${durationMs}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }}
      />
    </div>
  );
}
