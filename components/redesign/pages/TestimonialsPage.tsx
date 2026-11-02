'use client';

import { useSearchParams } from '@/lib/redesign/router';
import { testimonials } from '@/lib/redesign/data/testimonials';
import { videoTestimonials } from '@/lib/redesign/data/videoTestimonials';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { TestimonialCard } from '@/components/redesign/testimonials/TestimonialCard';
import { VideoCarousel } from '@/components/redesign/testimonials/VideoCarousel';
import { FinalCta } from '@/components/redesign/home/FinalCta';
import { cn } from '@/lib/redesign/utils/cn';

const crumbs = [{ label: 'Customer stories' }];
const filters = [
  { id: 'all', label: 'All' },
  { id: 'Tatkal Passport', label: 'Tatkal' },
  { id: 'Normal Passport', label: 'Normal' },
] as const;

export default function TestimonialsPage() {
  const [params, setParams] = useSearchParams();
  const filter = filters.some((f) => f.id === params.get('service')) ? params.get('service')! : 'all';
  const list = filter === 'all' ? testimonials : testimonials.filter((t) => t.service === filter);
  const states = new Set(testimonials.map((t) => t.state)).size;


  return (
    <>
      <PageHero
        tone="navy"
        breadcrumbs={crumbs}
        eyebrow="Customer stories"
        title="Applicants across India have trusted us with their passports."
        description={`${testimonials.length} featured customers from ${states} states and union territories — from Arunachal Pradesh to Maharashtra.`}
      />

      <Section labelledBy="cards-title">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="cards-title" className="text-h2">
              Our customers
            </h2>
            <div className="flex gap-2" role="group" aria-label="Filter by service">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setParams(f.id === 'all' ? {} : { service: f.id }, { replace: true })}
                  className={cn(
                    'h-10 rounded-full px-4 text-small font-semibold transition-colors duration-fast',
                    filter === f.id ? 'bg-navy-700 text-white' : 'border border-line-300 bg-white text-ink-700 hover:border-navy-300 hover:text-navy-700',
                  )}
                >
                  {f.label}
                  <span className="ml-1.5 opacity-70 tabular">
                    {f.id === 'all' ? testimonials.length : testimonials.filter((t) => t.service === f.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {list.length} customers
          </p>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((t, i) => (
              <Reveal as="li" key={t.id} delay={(i % 4) * 60}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="navy" labelledBy="videos-title" className="overflow-hidden">
        <Guilloche size={900} className="pointer-events-none absolute -right-80 -top-80 text-white/[0.035]" strokeWidth={0.8} />
        <div className="container-wide relative">
          <SectionHeading
            id="videos-title"
            eyebrow="Video stories"
            title="Real People. Real Experiences."
            description="Watch our customers share their experiences with Passport Suvidha."
            onDark
          />
          <VideoCarousel videos={videoTestimonials} layout="grid" />
        </div>
      </Section>

      <div className="pt-14 lg:pt-20">
        <FinalCta />
      </div>
    </>
  );
}
