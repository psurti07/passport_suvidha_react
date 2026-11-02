import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the last listed section whose top has passed
 * just below the sticky header, or `fallback` (e.g. "top") before the first one.
 * Used for the navigation active state in homepage preview mode.
 */
export function useActiveSection(ids: string[], fallback: string, enabled = true): string {
  const [active, setActive] = useState(fallback);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      const offset = 140; // header + breathing room
      let current = fallback;
      let best = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0 && top > best) {
          best = top;
          current = id;
        }
      }
      // At the very bottom of the page, the last visible target wins
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        const last = [...ids].reverse().find((id) => document.getElementById(id));
        if (last) current = last;
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, fallback, enabled]);

  return active;
}
