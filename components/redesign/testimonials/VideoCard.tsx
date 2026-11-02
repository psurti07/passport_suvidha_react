'use client';

import { Play } from 'lucide-react-redesign';
import type { VideoTestimonial } from '@/lib/redesign/types/testimonial';
import type { AssetStatus } from '@/lib/redesign/hooks/useAssetExists';
import { ImageWithFallback } from '@/components/redesign/common/ImageWithFallback';
import { cn } from '@/lib/redesign/utils/cn';
import { VideoPoster } from './VideoPoster';

interface VideoCardProps {
  video: VideoTestimonial;
  index: number;
  status: AssetStatus;
  onPlay: () => void;
}

export function videoLabel(video: VideoTestimonial, index: number) {
  return video.customerName || `Customer story ${String(index + 1).padStart(2, '0')}`;
}

/**
 * Compact Reels-style 9:16 card (works from ~100px wide). Only the poster is
 * loaded; the MP4 is requested when the modal opens. If the file is missing the
 * card shows "Coming soon" and is not clickable — no broken players.
 */
export function VideoCard({ video, index, status, onPlay }: VideoCardProps) {
  const label = videoLabel(video, index);
  const available = status === 'available';

  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={!available}
      aria-label={available ? `Play video: ${label}` : `${label} — video coming soon`}
      className={cn(
        'group relative block aspect-[9/16] w-full overflow-hidden rounded-xl bg-navy-900 text-left ring-1 ring-white/10 transition-[transform,box-shadow] duration-base ease-brand sm:rounded-2xl',
        available ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_36px_-18px_rgb(0_0_0/0.7)] hover:ring-white/30' : 'cursor-default',
      )}
    >
      <ImageWithFallback
        src={video.thumbnailUrl}
        alt=""
        width={720}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.04]"
        fallback={<VideoPoster index={index} />}
      />

      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />

      {/* small, refined play icon */}
      <span
        aria-hidden
        className={cn(
          'absolute left-1/2 top-[42%] grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-transform duration-base ease-brand sm:h-11 sm:w-11',
          available ? 'bg-white text-navy-900 shadow-md group-hover:scale-110' : 'bg-white/15 text-white ring-1 ring-inset ring-white/30 backdrop-blur-sm',
        )}
      >
        {available && (
          <span className="absolute inset-0 rounded-full ring-2 ring-white/60 opacity-0 group-hover:animate-[pulseRing_1.4s_ease-out_infinite] group-hover:opacity-100" />
        )}
        <Play className="ml-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" />
      </span>

      <span className="absolute inset-x-0 bottom-0 p-2 sm:p-3.5">
        {video.service && (
          <span className="mb-1 inline-block rounded-full bg-white/90 px-1.5 py-0.5 text-[0.5625rem] font-semibold text-navy-900 sm:text-[0.6875rem]">
            {video.service}
          </span>
        )}
        <span className="block truncate text-[0.6875rem] font-semibold leading-tight text-white sm:text-[0.875rem]">{label}</span>
        <span className="mt-0.5 block truncate text-[0.6875rem] text-white/70 sm:text-[0.75rem]">
          {status === 'checking' ? 'Loading…' : available ? 'Watch' : 'Coming soon'}
        </span>
      </span>
    </button>
  );
}
