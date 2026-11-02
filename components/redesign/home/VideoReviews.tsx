import { videoTestimonials } from '@/lib/redesign/data/videoTestimonials';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { VideoCarousel } from '@/components/redesign/testimonials/VideoCarousel';
import { HOME_SECTIONS } from '@/lib/redesign/config/preview';

export function VideoReviews() {
  return (
    <Section id={HOME_SECTIONS.videos} tone="brand" labelledBy="videos-title" className="overflow-hidden" compact>
      <Guilloche size={900} className="pointer-events-none absolute -left-80 -top-80 text-white/[0.035]" strokeWidth={0.8} />
      <div className="container-wide relative">
        <SectionHeading
          id="videos-title"
          eyebrow="Video stories"
          title="Stories From Our Customers"
          description="Real experiences shared by people who chose Passport Suvidha."
          onDark
        />
        <Reveal>
          <VideoCarousel videos={videoTestimonials} />
        </Reveal>
      </div>
    </Section>
  );
}
