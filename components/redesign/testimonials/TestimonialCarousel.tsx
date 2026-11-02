'use client';

import type { Testimonial } from '@/lib/redesign/types/testimonial';
import { useCarousel } from '@/lib/redesign/hooks/useCarousel';
import { useAutoAdvance } from '@/lib/redesign/hooks/useAutoAdvance';
import { CarouselArrows, CarouselDots } from '@/components/redesign/common/CarouselControls';
import { AutoplayProgress, AutoplayToggle } from '@/components/redesign/common/AutoplayToggle';
import { TestimonialCard } from './TestimonialCard';

/** Time each slide stays before auto-advancing. */
const AUTOPLAY_MS = 3000;

/**
 * Swipeable, keyboard-accessible testimonial carousel (1.3 / 2 / 3 / 4 cards visible)
 * that auto-advances every 3 seconds and loops (see useAutoAdvance for pause rules).
 */
export function TestimonialCarousel({ items, autoplay = true }: { items: Testimonial[]; autoplay?: boolean }) {
  const c = useCarousel<HTMLUListElement>();
  const auto = useAutoAdvance(c, { intervalMs: AUTOPLAY_MS, enabled: autoplay });

  return (
    <div {...auto.bind}>
      <ul
        ref={c.trackRef}
        className="snap-track -mx-4 gap-4 px-4 pb-4 pt-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
        aria-label="Customer testimonials"
        aria-live={auto.running ? 'off' : 'polite'}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            c.next();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            c.prev();
          }
        }}
      >
        {items.map((t, i) => (
          <li
            key={t.id}
            className="min-w-0 shrink-0 basis-[76%] snap-start min-[480px]:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/4)]"
            aria-label={`${i + 1} of ${items.length}`}
          >
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>

      {auto.active && c.pages > 1 && (
        <div className="mt-1">
          <AutoplayProgress slideKey={c.active} durationMs={AUTOPLAY_MS} running={auto.running} />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-4">
        <CarouselDots pages={c.pages} active={c.active} onSelect={c.scrollToIndex} label="testimonial" className="min-w-0 flex-wrap justify-start" />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {autoplay && !auto.reducedMotion && <AutoplayToggle paused={auto.userPaused} onToggle={auto.toggle} label="testimonial" />}
          <CarouselArrows label="testimonial" canPrev={c.canPrev} canNext={c.canNext} onPrev={c.prev} onNext={c.next} />
        </div>
      </div>
    </div>
  );
}
