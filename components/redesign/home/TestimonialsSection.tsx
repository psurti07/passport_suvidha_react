import { ArrowRight } from 'lucide-react-redesign';
import { testimonials } from '@/lib/redesign/data/testimonials';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { TestimonialCarousel } from '@/components/redesign/testimonials/TestimonialCarousel';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';

/**
 * Also used on the Apply page with `showAllLink={false}`, where leaving the page for the
 * full stories list would discard the application in progress.
 */
export function TestimonialsSection({ showAllLink = true }: { showAllLink?: boolean }) {
  return (
    <Section id={HOME_SECTIONS.customers} tone="warm" labelledBy="customers-title" className="overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          id="customers-title"
          eyebrow="Customer stories"
          title="Applicants across India have trusted us with their passports."
          description="From Arunachal Pradesh to Maharashtra — customers who completed their Normal and Tatkal applications with Passport Suvidha."
          action={
            showAllLink &&
            !HOMEPAGE_PREVIEW_MODE && (
              <Button to="/testimonials" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
                All stories
              </Button>
            )
          }
        />
        <Reveal>
          <TestimonialCarousel items={testimonials} />
        </Reveal>
      </div>
    </Section>
  );
}
