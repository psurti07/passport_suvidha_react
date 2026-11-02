import { ArrowRight } from 'lucide-react-redesign';
import { services } from '@/lib/redesign/data/services';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { ServiceCard } from '@/components/redesign/services/ServiceCard';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';

export function ServicesPreview() {
  return (
    <Section id={HOME_SECTIONS.services} tone="soft" labelledBy="services-title">
      <div className="container-wide">
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          title="Assistance for every kind of passport application."
          description="Whether it’s your first passport, an urgent trip or a renewal, our team guides you through each step."
          action={
            !HOMEPAGE_PREVIEW_MODE && (
              <Button to="/services" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
                All services
              </Button>
            )
          }
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 90} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
