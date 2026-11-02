import { Compass, Eye, HeartHandshake, Headset, ReceiptText, ShieldCheck, Target, Users } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { PlaceholderMarker } from '@/components/redesign/common/Badge';
import { MediaCoverageGrid } from '@/components/redesign/about/MediaCoverageGrid';
import { StatsBand } from '@/components/redesign/home/StatsBand';
import { FinalCta } from '@/components/redesign/home/FinalCta';

const crumbs = [{ label: 'About us' }];

/** Vision / mission / values — adapted from the current About and Home pages. */
const pillars = [
  {
    icon: Eye,
    title: 'Our vision',
    text: 'Every Indian making the most of our services for their passport needs, so that confusion and apprehension are avoided and the road to a passport is smooth.',
  },
  {
    icon: Target,
    title: 'Our mission',
    text: 'To make passport services accessible to every individual seeking them.',
  },
  {
    icon: Compass,
    title: 'Our values',
    text: 'Transparency in our services, our process and our prices — with uncompromising service quality and a customer-first approach.',
  },
];

const commitments = [
  { icon: ReceiptText, title: 'Transparent pricing', text: 'No hidden fees or surprise charges — clear, upfront pricing for our consultancy services.' },
  { icon: Headset, title: 'Expert support', text: `A knowledgeable team to answer your questions, ${site.hoursShort}.` },
  { icon: ShieldCheck, title: 'Honest guidance', text: 'We are clear about what we do — and what only the passport authorities can decide.' },
  { icon: HeartHandshake, title: 'Customer first', text: 'Personalised support for every customer, from the first question to the appointment day.' },
];

function CompanyCard() {
  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: 'Registered name', value: site.legalName },
    { label: 'GSTIN', value: site.gstNumber },
    { label: 'Office', value: `${site.address.city}, ${site.address.region}` },
    { label: 'Hours', value: site.hoursShort },
    { label: 'Established', value: <PlaceholderMarker /> },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line-200 bg-white shadow-md">
      <div className="flex items-center gap-3 bg-navy-700 px-6 py-4 text-white">
        <Users className="h-5 w-5 text-gold-400" aria-hidden />
        <p className="font-semibold">Company details</p>
      </div>
      <dl className="divide-y divide-dashed divide-line-300 px-6">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-6 py-3.5 text-small">
            <dt className="text-ink-500">{r.label}</dt>
            <dd className="text-right font-semibold text-ink-900">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p aria-hidden className="truncate bg-paper-alt px-6 py-2.5 font-mono text-[0.6875rem] tracking-[0.18em] text-ink-400">
        P&lt;INDPASSPORT&lt;&lt;SUVIDHA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
      </p>
    </div>
  );
}

export default function AboutPage() {

  return (
    <>
      <PageHero
        tone="navy"
        breadcrumbs={crumbs}
        eyebrow="About us"
        title="Making the passport process simpler for every applicant."
        description="Passport Suvidha is a private consultancy that helps Indian citizens through their passport application — clearly, transparently and from the comfort of home."
        aside={<CompanyCard />}
      />

      <Section labelledBy="story-title">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading id="story-title" eyebrow="Our story" title="We go beyond ordinary — always." className="!mb-0" />
          <Reveal className="space-y-5 text-body-lg text-ink-500">
            <p>
              Making the passport application process simple, easy and accessible is what Passport Suvidha is built for. Backed by a
              customer-oriented team of experts, we help our customers fulfil their passport needs through a process that is easy and
              convenient.
            </p>
            <p>
              We are a private, independent consultancy. We guide you on documents, help you complete your application form accurately
              and support you with your appointment — while all decisions on your passport remain with the Government of India.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="pillars-title">
        <div className="container-wide">
          <SectionHeading id="pillars-title" eyebrow="What drives us" title="Vision, mission and values." align="center" />
          <ul className="grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80} className="rounded-2xl border border-line-200 bg-white p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-700 text-gold-400">
                  <p.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-h3">{p.title}</h3>
                <p className="mt-3 text-ink-500">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="commit-title">
        <div className="container-wide">
          <SectionHeading
            id="commit-title"
            eyebrow="Our commitment"
            title="What you can expect from us."
            action={
              <Button to="/contact" variant="outline">
                Talk to our team
              </Button>
            }
          />
          <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 60} className="flex gap-5 border-t border-line-200 py-7">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <c.icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h3 className="text-[1.125rem] font-semibold text-ink-900">{c.title}</h3>
                  <p className="mt-1.5 text-ink-500">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="alt" labelledBy="media-title">
        <div className="container-wide">
          <SectionHeading
            id="media-title"
            eyebrow="In the media"
            title="Featured coverage."
            description="Published stories about Passport Suvidha and our passport assistance services."
          />
          <MediaCoverageGrid />
        </div>
      </Section>

      <StatsBand />
      <FinalCta />
    </>
  );
}
