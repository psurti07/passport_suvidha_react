import { useEffect, useRef, useState, type FocusEvent } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Carousel {
  active: number;
  pages: number;
  scrollToIndex: (i: number) => void;
}

interface Options {
  intervalMs: number;
  /** Extra pause condition, e.g. a video modal is open */
  paused?: boolean;
  enabled?: boolean;
}

/**
 * Auto-advances a useCarousel() one slide at a time and loops back to the start.
 *
 * Pauses while: hovered, keyboard-focused, touched, off-screen, the tab is hidden,
 * `paused` is true, or the user pressed Pause. Never runs under
 * prefers-reduced-motion (WCAG 2.2.2). Spread `bind` on the carousel wrapper.
 */
export function useAutoAdvance<T extends HTMLElement = HTMLDivElement>(c: Carousel, { intervalMs, paused = false, enabled = true }: Options) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<T>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const active = enabled && !reduced && !userPaused;
  const running = active && !paused && !hovered && !focused && !touching && onScreen && pageVisible && c.pages > 1;

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Re-armed on every slide change, so manual navigation restarts the timer.
  const { active: index, pages, scrollToIndex } = c;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => scrollToIndex(index >= pages - 1 ? 0 : index + 1), intervalMs);
    return () => window.clearTimeout(t);
  }, [running, index, pages, scrollToIndex, intervalMs]);

  const bind = {
    ref: rootRef,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    // keyboard focus only — a mouse click on an arrow shouldn't stop the slideshow
    onFocus: (e: FocusEvent) => setFocused((e.target as HTMLElement).matches(':focus-visible')),
    onBlur: (e: FocusEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
    },
    onTouchStart: () => setTouching(true),
    onTouchEnd: () => window.setTimeout(() => setTouching(false), 1500),
  };

  return {
    bind,
    /** autoplay is on (not user-paused / reduced motion) */
    active,
    /** currently advancing */
    running,
    userPaused,
    toggle: () => setUserPaused((p) => !p),
    reducedMotion: reduced,
  };
}
