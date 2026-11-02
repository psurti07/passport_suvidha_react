import type { VideoTestimonial } from '@/lib/redesign/types/testimonial';

/**
 * Customer video reels (vertical 9:16 MP4, H.264 + AAC, shown in this order).
 *
 * Files: /public/assets/testimonials/videos/passport-reel-NN.mp4 and the client's
 * /public/customers/videos/{slug}.mp4 (also used by the original Apply form), unchanged.
 * Posters: /public/assets/testimonials/thumbnails/ (a frame from each video, native
 * resolution). Videos load only when a visitor opens one (posters are lazy-loaded images).
 *
 * To add a reel: add the video and poster files and a record below.
 * A missing file is detected automatically — the card shows "Coming soon"
 * instead of a broken player.
 *
 * Only fill in `customerName` / `service` once the person's identity is confirmed
 * by the client; until then cards are labelled "Customer story 01" etc.
 */
const VIDEO_DIR = '/assets/testimonials/videos';
const THUMB_DIR = '/assets/testimonials/thumbnails';

const CUSTOMER_VIDEO_DIR = '/customers/videos';

const reel = (n: number, customerName = '', service = ''): VideoTestimonial => {
  const id = `passport-reel-${String(n).padStart(2, '0')}`;
  return {
    id,
    customerName,
    service,
    videoUrl: `${VIDEO_DIR}/${id}.mp4`,
    thumbnailUrl: `${THUMB_DIR}/${id}.jpg`,
  };
};

const customerReel = (id: string, customerName: string, service: string): VideoTestimonial => ({
  id,
  customerName,
  service,
  videoUrl: `${CUSTOMER_VIDEO_DIR}/${id}.mp4`,
  thumbnailUrl: `${THUMB_DIR}/${id}.jpg`,
});

export const videoTestimonials: VideoTestimonial[] = [
  reel(1, 'Narendra Singh Chundawat', 'Normal Passport'),
  reel(2, 'Jugal Kishore', 'Normal Passport'),
  reel(3, 'Jacob Paron', 'Tatkal Passport'),
  customerReel('rajesh-kumar-negi', 'Rajesh Kumar Negi', 'Normal Passport'),
  customerReel('ashutosh-mahajan', 'Ashutosh Mahajan', 'Normal Passport'),
  customerReel('rasikbhai-kanani', 'Rasikbhai Kanani', 'Normal Passport'),
  customerReel('patil-dayanand-santaram', 'Patil Dayanand Santaram', 'Tatkal Passport'),
  customerReel('monika-gohil', 'Monika Gohil', 'Normal Passport'),
  customerReel('satyamoorthi-jeyaguru', 'Satyamoorthi Jeyaguru', 'Normal Passport'),
  reel(4),
];
