import { CalendarCheck, CreditCard, FileUp, Info, UserRound } from 'lucide-react-redesign';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { HOME_SECTIONS } from '@/lib/redesign/config/preview';

/**
 * Process condensed from the current site's 6-step "How it works".
 * Wording follows the Disclaimer: we assist and guide; submission,
 * verification and issuance are done by the passport authorities.
 */
const steps = [
  {
    icon: UserRound,
    title: 'Register',
    text: 'Share your basic details and choose Normal, Tatkal or Reissue with a 36 or 60-page booklet.',
  },
  {
    icon: CreditCard,
    title: 'Pay the consultancy fee',
    text: 'Pay our service fee through secure payment options. Government fees are paid separately on the official portal.',
  },
  {
    icon: FileUp,
    title: 'Share your documents',
    text: 'Upload your identity, address and date-of-birth proofs and photographs for our team to check.',
  },
  {
    icon: CalendarCheck,
    title: 'Application guidance',
    text: 'Our experts help prepare your application details and guide you through booking your appointment.',
  },
];

export function HowItWorks() {
  return (
    <Section id={HOME_SECTIONS.howItWorks} tone="white" labelledBy="how-title" className="overflow-hidden">
      <div className="container-wide">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="Four clear steps, with an expert beside you."
          description="A simple path from your first question to your passport office appointment."
          align="center"
        />

        <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
          {/* connecting line (desktop) */}
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-navy-200 lg:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:pb-0 lg:text-center">
              {/* vertical line (mobile/tablet) */}
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute bottom-0 left-7 top-14 border-l-2 border-dashed border-navy-200 lg:hidden" />
              )}
              <div className="group/step relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-navy-700 shadow-sm ring-2 ring-navy-700 transition-colors duration-base hover:bg-navy-700 hover:text-gold-400">
                <s.icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gold-400 text-[0.75rem] font-bold text-navy-900 tabular">
                  {i + 1}
                </span>
              </div>
              <div className="pt-1 lg:mt-5 lg:pt-0">
                <h3 className="text-h3">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-500 lg:mx-auto lg:max-w-[250px]">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl bg-navy-50 p-4 text-small text-ink-700 sm:items-center sm:px-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy-700 sm:mt-0" aria-hidden />
          <p>
            <strong className="font-semibold text-ink-900">Then:</strong> visit the Passport Seva Kendra on your appointment date.
            Verification, approval, issuance and delivery are carried out by the passport authorities.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
