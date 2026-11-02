'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react-redesign';
import type { VideoTestimonial } from '@/lib/redesign/types/testimonial';
import { Modal } from '@/components/redesign/common/Modal';
import { videoLabel } from './VideoCard';

interface VideoModalProps {
  videos: VideoTestimonial[];
  /** Index into `videos`, or null when closed */
  index: number | null;
  /** Indexes of videos whose files exist */
  playable: number[];
  onChange: (index: number | null) => void;
}

/**
 * Plays a local MP4 with native controls (play/pause, mute, progress, fullscreen).
 * Playback starts from the user's click; it is paused and unloaded on close
 * because the <video> element unmounts.
 */
export function VideoModal({ videos, index, playable, onChange }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const open = index !== null;
  const video = open ? videos[index] : null;
  const pos = open ? playable.indexOf(index) : -1;
  const prevIndex = pos > 0 ? playable[pos - 1] : null;
  const nextIndex = pos >= 0 && pos < playable.length - 1 ? playable[pos + 1] : null;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      /* autoplay can be blocked; native controls remain available */
    });
    // Pause if the visitor switches tab or minimises the browser.
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') el.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      el.pause();
      // Once the <video> has left the page, release its media resource (network + decoder)
      // straight away. (Skipped while it is still mounted, e.g. React StrictMode re-runs.)
      if (!el.isConnected) {
        el.removeAttribute('src');
        el.load();
      }
    };
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Arrow keys switch videos unless focus is on the video (where they seek)
      if (document.activeElement === videoRef.current) return;
      if (e.key === 'ArrowRight' && nextIndex !== null) onChange(nextIndex);
      if (e.key === 'ArrowLeft' && prevIndex !== null) onChange(prevIndex);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, nextIndex, prevIndex, onChange]);

  const navBtn =
    'grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30';

  return (
    <Modal open={open} onClose={() => onChange(null)} title={video ? videoLabel(video, index!) : 'Video'} tone="dark">
      {video && (
        <div className="flex flex-col items-center">
          <div className="relative aspect-[9/16] h-[min(80vh,calc((100vw-1.5rem)*16/9))] max-h-[820px] overflow-hidden rounded-[20px] bg-black shadow-lg">
            <video
              key={video.id}
              ref={videoRef}
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              data-autofocus
            >
              Your browser does not support HTML5 video.
            </video>
          </div>
          <div className="mt-4 flex w-full items-center justify-between gap-4 text-white">
            <button type="button" className={navBtn} onClick={() => prevIndex !== null && onChange(prevIndex)} disabled={prevIndex === null} aria-label="Previous video">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <p className="font-semibold">{videoLabel(video, index!)}</p>
              {video.service && <p className="text-small text-white/70">{video.service}</p>}
            </div>
            <button type="button" className={navBtn} onClick={() => nextIndex !== null && onChange(nextIndex)} disabled={nextIndex === null} aria-label="Next video">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
