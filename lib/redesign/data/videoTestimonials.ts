import type { VideoTestimonial } from '@/lib/redesign/types/testimonial';

/**
 * Customer video reels (vertical 9:16 MP4, H.264 + AAC, shown in this order).
 *
 * Files: /public/assets/testimonials/videos/passport-reel-NN.mp4 — the original
 * files supplied by the client, unchanged. Posters: /public/assets/testimonials/
 * thumbnails/passport-reel-NN.jpg (a frame from each video, native resolution).
 * Videos load only when a visitor opens one (posters are lazy-loaded images).
 *
 * To add a reel: add both files with the next number and a record below.
 * A missing file is detected automatically — the card shows "Coming soon"
 * instead of a broken player.
 *
 * Only fill in `customerName` / `service` once the person's identity is confirmed
 * by the client; until then cards are labelled "Customer story 01" etc.
 */
const VIDEO_DIR = '/assets/testimonials/videos';
const THUMB_DIR = '/assets/testimonials/thumbnails';

const reel = (n: number): VideoTestimonial => {
  const id = `passport-reel-${String(n).padStart(2, '0')}`;
  return {
    id,
    customerName: '',
    service: '',
    videoUrl: `${VIDEO_DIR}/${id}.mp4`,
    thumbnailUrl: `${THUMB_DIR}/${id}.jpg`,
  };
};

export const videoTestimonials: VideoTestimonial[] = [reel(1), reel(2), reel(3), reel(4)];
