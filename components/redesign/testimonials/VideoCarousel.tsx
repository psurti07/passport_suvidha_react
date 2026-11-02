'use client';

import { useEffect, useMemo, useState } from 'react';
import type { VideoTestimonial } from '@/lib/redesign/types/testimonial';
import { checkAsset, type AssetStatus } from '@/lib/redesign/hooks/useAssetExists';
import { useCarousel } from '@/lib/redesign/hooks/useCarousel';
import { useAutoAdvance } from '@/lib/redesign/hooks/useAutoAdvance';
import { AutoplayProgress, AutoplayToggle } from '@/components/redesign/common/AutoplayToggle';
import { CarouselArrows, CarouselDots } from '@/components/redesign/common/CarouselControls';
import { VideoCard } from './VideoCard';
import { VideoModal } from './VideoModal';

/** Checks which MP4 files exist (HEAD requests only — no video data is downloaded). */
function useVideoStatuses(videos: VideoTestimonial[]): AssetStatus[] {
  const [statuses, setStatuses] = useState<AssetStatus[]>(() => videos.map(() => 'checking'));
  useEffect(() => {
    let active = true;
    Promise.all(videos.map((v) => checkAsset(v.videoUrl, 'video/'))).then((results) => {
      if (active) setStatuses(results.map((ok) => (ok ? 'available' : 'missing')));
    });
    return () => {
      active = false;
    };
  }, [videos]);
  return statuses;
}

interface VideoCarouselProps {
  videos: VideoTestimonial[];
  onDark?: boolean;
  /** "carousel" (homepage) or "grid" (testimonials page) */
  layout?: 'carousel' | 'grid';
}

/** Time each slide stays before auto-advancing (videos themselves never autoplay). */
const AUTOPLAY_MS = 3800;

/**
 * Desktop cards per row: 5 normally; with exactly 4 reels the row shows 4 wider
 * cards instead of leaving an empty fifth slot. (Static class names for Tailwind.)
 */
const DESKTOP_BASIS = {
  4: 'lg:basis-[calc((100%-3rem)/4)]',
  5: 'lg:basis-[calc((100%-4rem)/5)]',
} as const;
const GRID_COLS = {
  4: 'grid-cols-2 sm:grid-cols-4',
  5: 'grid-cols-3 lg:grid-cols-5 xl:grid-cols-6',
} as const;

/**
 * Compact Reels-style gallery: 3 cards on phones (~100–115px each), 3 on tablet,
 * 5 on desktop. The carousel (not the videos) auto-advances one card every 3.8s
 * and loops; it pauses on hover/focus/touch, off-screen, and while a video is open.
 * With layout="grid" the same cards render as a responsive grid.
 */
export function VideoCarousel({ videos, onDark = true, layout = 'carousel' }: VideoCarouselProps) {
  const c = useCarousel<HTMLUListElement>();
  const statuses = useVideoStatuses(videos);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const playable = useMemo(() => statuses.flatMap((s, i) => (s === 'available' ? [i] : [])), [statuses]);
  const auto = useAutoAdvance(c, { intervalMs: AUTOPLAY_MS, paused: openIndex !== null, enabled: layout === 'carousel' });
  const perRow = videos.length === 4 ? 4 : 5;

  if (layout === 'grid') {
    return (
      <div>
        <ul className={`grid gap-2 sm:gap-4 ${GRID_COLS[perRow]}`} aria-label="Customer video stories">
          {videos.map((v, i) => (
            <li key={v.id}>
              <VideoCard video={v} index={i} status={statuses[i]} onPlay={() => setOpenIndex(i)} />
            </li>
          ))}
        </ul>
        <VideoModal videos={videos} index={openIndex} playable={playable} onChange={setOpenIndex} />
      </div>
    );
  }

  return (
    <div {...auto.bind}>
      <ul
        ref={c.trackRef}
        className="snap-track -mx-4 gap-2 px-4 pb-3 pt-2 sm:-mx-6 sm:gap-3 sm:px-6 lg:mx-0 lg:gap-4 lg:px-0"
        aria-label="Customer video stories"
        // keyboard users can scroll the row even when no video card is playable yet
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
        {videos.map((v, i) => (
          <li
            key={v.id}
            className={`min-w-0 shrink-0 basis-[calc((100%-1rem)/3)] snap-start sm:basis-[calc((100%-1.5rem)/3)] ${DESKTOP_BASIS[perRow]}`}
          >
            <VideoCard video={v} index={i} status={statuses[i]} onPlay={() => setOpenIndex(i)} />
          </li>
        ))}
      </ul>

      {auto.active && c.pages > 1 && (
        <div className="mt-1">
          <AutoplayProgress slideKey={c.active} durationMs={AUTOPLAY_MS} running={auto.running} onDark={onDark} />
        </div>
      )}

      {/* Controls only when there is something to slide (e.g. 4 reels fit in one row on desktop) */}
      <div className={`mt-4 flex items-center justify-between gap-4 ${c.pages > 1 ? '' : 'hidden'}`}>
        <CarouselDots pages={c.pages} active={c.active} onSelect={c.scrollToIndex} label="video" onDark={onDark} className="justify-start" />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          {!auto.reducedMotion && <AutoplayToggle paused={auto.userPaused} onToggle={auto.toggle} label="video" onDark={onDark} />}
          <CarouselArrows label="video" canPrev={c.canPrev} canNext={c.canNext} onPrev={c.prev} onNext={c.next} onDark={onDark} />
        </div>
      </div>

      <VideoModal videos={videos} index={openIndex} playable={playable} onChange={setOpenIndex} />
    </div>
  );
}
