import { ArrowRight, ClipboardList, Lightbulb } from 'lucide-react-redesign';
import { services } from '@/lib/redesign/data/services';
import { faqs } from '@/lib/redesign/data/faqs';
import { site } from '@/lib/redesign/data/site';
import { formInformation, formTips } from '@/lib/redesign/data/requirements';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { Accordion } from '@/components/redesign/common/Accordion';
import { ServiceCard } from '@/components/redesign/services/ServiceCard';
import { ServiceComparison } from '@/components/redesign/services/ServiceComparison';
import { HowItWorks } from '@/components/redesign/home/HowItWorks';
import { FinalCta } from '@/components/redesign/home/FinalCta';

const crumbs = [{ label: 'Services' }];
const serviceFaqs = ['what-we-do', 'normal-vs-tatkal', 'fee-includes-govt', 'guarantee', 'submit'].map((id) => faqs.find((f) => f.id === id)!);

export default function ServicesPage() {

  return (
    <>
      <PageHero
        tone="navy"
        breadcrumbs={crumbs}
        eyebrow="Our services"
        title="Passport assistance for every kind of application."
        description="Whether it’s your first passport, an urgent trip or a renewal, our team guides you through documents, form filling and your appointment."
        actions={
          <>
            <Button to="/apply-passport" size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
              Apply Now
            </Button>
            <Button to="/requirements" size="lg" variant="outline-light">
              Check requirements
            </Button>
          </>
        }
      />

      <Section labelledBy="svc-list-title">
        <div className="container-wide">
          <h2 id="svc-list-title" className="sr-only">
            Services
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 80} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="soft" labelledBy="compare-title">
        <div className="container-wide">
          <SectionHeading
            id="compare-title"
            eyebrow="Compare"
            title="Which service is right for you?"
            description="Our fee covers consultancy only. Government passport fees are set by the Government of India and paid on the official portal."
          />
          <Reveal>
            <ServiceComparison />
          </Reveal>
        </div>
      </Section>

      <HowItWorks />

      <Section labelledBy="prep-title">
        <div className="container-wide">
          <SectionHeading id="prep-title" eyebrow="Be prepared" title="Before you fill in the form." />
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="rounded-2xl border border-line-200 bg-white p-6">
              <ClipboardList className="h-7 w-7 text-navy-700" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-h3">Information you’ll need</h3>
              <ul className="mt-4 space-y-3">
                {formInformation.map((t) => (
                  <li key={t} className="flex gap-3 text-ink-700">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="rounded-2xl bg-navy-700 p-6 text-navy-100">
              <Lightbulb className="h-7 w-7 text-gold-400" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-h3 text-white">Tips for form filling</h3>
              <ul className="mt-4 space-y-3">
                {formTips.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="alt" labelledBy="svc-faq-title">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="svc-faq-title"
            eyebrow="FAQ"
            title="Common questions about our services."
            action={
              <Button to="/faq" variant="link" iconRight={<ArrowRight className="h-4 w-4" />}>
                All FAQs
              </Button>
            }
            className="!flex-col !items-start"
          />
          <Reveal>
            <Accordion items={serviceFaqs.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))} />
          </Reveal>
        </div>
      </Section>

      <div className="pt-14 lg:pt-20">
        <FinalCta />
      </div>
    </>
  );
}
