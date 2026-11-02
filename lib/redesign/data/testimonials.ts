import type { Testimonial } from '@/lib/redesign/types/testimonial';
import { slugify } from '@/lib/redesign/utils/text';

/**
 * Verified customers supplied by the client.
 * DO NOT edit names, services, cities or states.
 * No written quotes have been supplied — do not add any unless the customer provided them.
 *
 * Photos: original customer photos live in /public/assets/testimonials/images/
 * named after the customer (e.g. gopi-kato.jpg) and are picked up automatically.
 * A missing file falls back to the customer's initials. `imagePosition` sets the
 * focal point of the 4:5 portrait crop so faces stay visible.
 */
const customers: Array<Omit<Testimonial, 'id'>> = [
  { fullName: 'Gopi Kato', service: 'Tatkal Passport', pages: 36, city: 'West Siang', state: 'Arunachal Pradesh', imagePosition: 'center 40%' },
  { fullName: 'Supratik Nag', service: 'Normal Passport', pages: 36, city: 'Darjiling', state: 'West Bengal', imagePosition: 'center 100%' },
  { fullName: 'Jacob Paron', service: 'Tatkal Passport', pages: 60, city: 'East Siang', state: 'Arunachal Pradesh', imagePosition: 'center 30%' },
  { fullName: 'Brajmohan Singh', service: 'Normal Passport', pages: 36, city: 'Hardoi', state: 'Uttar Pradesh', imagePosition: 'center 15%' },
  { fullName: 'Mugala Saul', service: 'Normal Passport', pages: 36, city: 'KarimNagar', state: 'Telangana', imagePosition: 'center 70%' },
  { fullName: 'Jitendra Anand Jha', service: 'Tatkal Passport', pages: 36, city: 'Thane', state: 'Maharashtra', imagePosition: 'center 35%' },
  { fullName: 'Rajesh Kumar Palai', service: 'Normal Passport', pages: 36, city: 'Cuttack', state: 'Odisha', imagePosition: 'center 50%' },
  { fullName: 'Ankur', service: 'Tatkal Passport', pages: 36, city: 'North East Delhi', state: 'Delhi', imagePosition: 'center 35%' },
];

export const TESTIMONIAL_IMAGE_DIR = '/assets/testimonials/images';

export const testimonials: Testimonial[] = customers.map((c) => {
  const slug = slugify(c.fullName);
  return { ...c, id: slug, imageUrl: c.imageUrl ?? `${TESTIMONIAL_IMAGE_DIR}/${slug}.jpg` };
});
