import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives a CSS scroll-snap track (`.snap-track`). Native swipe/trackpad
 * scrolling just works; this hook adds prev/next buttons, dot navigation
 * and an "active slide" index. No carousel library needed.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>() {
  const trackRef = useRef<T>(null);
  const [state, setState] = useState({ canPrev: false, canNext: false, active: 0, count: 0, pages: 1 });

  const getSlides = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = getSlides();
    if (!items.length) return;
    const max = track.scrollWidth - track.clientWidth;
    const left = track.scrollLeft;
    const base = items[0].offsetLeft;
    const step = items[1] ? items[1].offsetLeft - base : track.clientWidth;
    const perView = Math.max(1, Math.floor((track.clientWidth + 8) / step));
    // Nothing to scroll (all slides fit) → a single page, whatever the rounding above says.
    const pages = max <= 4 ? 1 : Math.max(1, items.length - perView + 1);
    let active = Math.round(left / step);
    if (left >= max - 4) active = pages - 1;
    setState({
      canPrev: left > 4,
      canNext: left < max - 4,
      active: Math.min(Math.max(active, 0), pages - 1),
      count: items.length,
      pages,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [update]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const items = getSlides();
    if (!track || !items.length) return;
    const i = Math.max(0, Math.min(index, items.length - 1));
    track.scrollTo({ left: items[i].offsetLeft - items[0].offsetLeft, behavior: 'smooth' });
  }, []);

  const prev = useCallback(() => scrollToIndex(state.active - 1), [scrollToIndex, state.active]);
  const next = useCallback(() => scrollToIndex(state.active + 1), [scrollToIndex, state.active]);

  return { trackRef, ...state, prev, next, scrollToIndex };
}
