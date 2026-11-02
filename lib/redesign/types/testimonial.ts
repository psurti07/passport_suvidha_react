export type PassportServiceType = 'Tatkal Passport' | 'Normal Passport';
export type PassportPages = 36 | 60;

export interface Testimonial {
  id: string;
  fullName: string;
  service: PassportServiceType;
  pages: PassportPages;
  city: string;
  state: string;
  /**
   * Optional photo URL. If omitted it is derived from the customer's name:
   * /assets/testimonials/images/{slug}.jpg — missing files fall back to initials.
   */
  imageUrl?: string;
  /** CSS object-position for the portrait crop, e.g. 'center 30%' (keeps the face in frame) */
  imagePosition?: string;
  /** Written feedback. Leave undefined unless the customer actually provided it. */
  quote?: string;
}

export interface VideoTestimonial {
  id: string;
  /** Leave empty until the customer's identity is confirmed. */
  customerName: string;
  /** Optional service label, e.g. "Tatkal Passport". */
  service: string;
  videoUrl: string;
  thumbnailUrl: string;
}
