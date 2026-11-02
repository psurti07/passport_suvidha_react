import { ArrowRight, Mail, Phone } from 'lucide-react-redesign';
import { homeFaqs } from '@/lib/redesign/data/faqs';
import { site } from '@/lib/redesign/data/site';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Accordion } from '@/components/redesign/common/Accordion';
import { Button } from '@/components/redesign/common/Button';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';
import { EmailText } from '@/components/redesign/common/EmailText';

export function FaqPreview() {
  return (
    <Section id={HOME_SECTIONS.faq} tone="white" labelledBy="faq-title">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Questions, answered."
            description="Clear answers about how our consultancy works. For anything else, our team is a call away."
            className="!mb-6"
          />
          <Reveal className="rounded-2xl bg-navy-50 p-5 sm:p-6">
            <p className="font-semibold text-ink-900">Still have a question?</p>
            <ul className="mt-4 space-y-3 text-small">
              <li>
                <a href={site.phone.href} className="inline-flex items-center gap-3 font-semibold text-navy-700 hover:underline">
                  <Phone className="h-4 w-4" aria-hidden /> {site.phone.display}
                </a>
              </li>
              <li>
                <a href={site.email.href} className="inline-flex min-w-0 items-center gap-3 font-semibold text-navy-700 hover:underline">
                  <Mail className="h-4 w-4 shrink-0" aria-hidden /> <EmailText email={site.email.display} className="min-w-0" />
                </a>
              </li>
            </ul>
            <p className="mt-4 text-small text-ink-500">{site.hoursShort}</p>
          </Reveal>
        </div>

        <Reveal>
          <Accordion
            items={homeFaqs.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))}
            defaultOpen={[homeFaqs[0].id]}
          />
          {!HOMEPAGE_PREVIEW_MODE && (
            <Button to="/faq" variant="link" className="mt-6" iconRight={<ArrowRight className="h-4 w-4" />}>
              View all FAQs
            </Button>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
