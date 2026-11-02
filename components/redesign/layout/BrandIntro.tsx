'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { cn } from '@/lib/redesign/utils/cn';

/**
 * One-time brand intro (≈2.3s), shown on the first page load of a browser session.
 *
 *  0.00s  yellow line sweeps across the navy screen
 *  0.35s  passport mark rises in (scale + opacity + 10px lift)
 *  0.70s  "PASSPORT SUVIDHA" reveals letter by letter; yellow rule draws beneath
 *  1.70s  navy curtain lifts upward (cinematic easing) revealing the page
 *
 * - Skipped entirely for prefers-reduced-motion and for repeat views in the same session.
 * - index.html adds `intro-active intro-pending` before React loads so there is no white flash;
 *   it also removes them after 4s as a failsafe, so content can never stay hidden.
 * - The page renders underneath immediately; only scrolling is locked while the intro plays.
 */
export const INTRO_STORAGE_KEY = 'ps:intro-seen';
const EXIT_AT = 1700;
const EXIT_MS = 650;
const NAME = ['PASSPORT', 'SUVIDHA'];

function shouldPlay(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !window.sessionStorage.getItem(INTRO_STORAGE_KEY);
  } catch {
    return false;
  }
}

function clearRootClasses() {
  document.documentElement.classList.remove('intro-active', 'intro-pending');
}

export function BrandIntro() {
  // 'pending' until mounted: sessionStorage and matchMedia are not available during server rendering.
  // Until then the page stays covered by html.intro-active / intro-pending (set before first paint).
  const [phase, setPhase] = useState<'pending' | 'play' | 'exit' | 'done'>('pending');
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    if (shouldPlay()) setPhase('play');
    else {
      clearRootClasses();
      setPhase('done');
    }
  }, []);

  // Playing: remember for this session and schedule the exit.
  useEffect(() => {
    if (phase !== 'play') return;
    document.documentElement.classList.remove('intro-pending');
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      /* storage unavailable — intro may replay next load, which is harmless */
    }
    const t = window.setTimeout(() => setPhase('exit'), EXIT_AT);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Scroll lock while visible; release + unmount after the curtain lifts.
  useEffect(() => {
    if (phase === 'done') return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    let t: number | undefined;
    if (phase === 'exit') {
      root.classList.remove('intro-active'); // lets page entrance animations play as the curtain rises
      t = window.setTimeout(() => setPhase('done'), EXIT_MS);
    }
    return () => {
      root.style.overflow = prev;
      if (t) window.clearTimeout(t);
    };
  }, [phase]);

  // Escape skips
  useEffect(() => {
    if (phase !== 'play') return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPhase('exit');
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  if (phase === 'done' || phase === 'pending') return null;
  const exiting = phase === 'exit';
  let letterIndex = 0;

  return (
    <div
      role="dialog"
      aria-label="Passport Suvidha"
      className={cn(
        'fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-navy-900 transition-transform ease-cinematic',
        exiting && '-translate-y-full',
      )}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
    >
      {/* soft security-print texture */}
      <Guilloche
        size={900}
        className="intro-fade pointer-events-none absolute left-1/2 top-1/2 h-[140vmin] w-[140vmin] -translate-x-1/2 -translate-y-1/2 text-gold-400/[0.06]"
        strokeWidth={0.6}
      />
      {/* phase 1 — light streak */}
      <span aria-hidden className="intro-streak absolute left-0 top-1/2 h-px w-full origin-left bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className={cn('relative flex flex-col items-center px-6 transition-[transform,opacity] duration-500 ease-cinematic', exiting && '-translate-y-10 opacity-0')}>
        {logoOk && (
          <img
            src="/assets/brand/logo-mark.png"
            alt=""
            width={177}
            height={260}
            onError={() => setLogoOk(false)}
            className="intro-mark h-24 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] sm:h-28"
          />
        )}

        <p className="mt-7 flex flex-wrap justify-center gap-x-[0.6em] text-[clamp(1.25rem,1rem+1.6vw,2rem)] font-bold tracking-[0.28em]" aria-label="Passport Suvidha">
          {NAME.map((word, w) => (
            <span key={word} aria-hidden className={cn('flex', w === 1 ? 'text-gold-400' : 'text-white')}>
              {[...word].map((ch) => {
                const i = letterIndex++;
                return (
                  <span key={i} className="inline-block overflow-hidden">
                    <span className="intro-letter inline-block" style={{ '--i': i } as CSSProperties}>
                      {ch}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <span aria-hidden className="intro-rule mt-5 h-[3px] w-24 origin-center rounded-full bg-gold-400" />
      </div>

      <button
        type="button"
        onClick={() => setPhase('exit')}
        className="intro-fade absolute bottom-6 right-6 rounded-full border border-white/20 px-4 py-2 text-small font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
      >
        Skip intro
      </button>
    </div>
  );
}
