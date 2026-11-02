import { Clock, FileCheck2, Headset, MapPin, ReceiptText, UserCheck } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { homeImages } from '@/lib/redesign/data/home';
import { HOME_SECTIONS } from '@/lib/redesign/config/preview';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { ImageWithFallback } from '@/components/redesign/common/ImageWithFallback';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { Stamp } from '@/components/redesign/common/Stamp';

const benefits = [
  {
    icon: UserCheck,
    title: 'Dedicated assistance',
    text: 'Personalised support for every customer, from the first question to your appointment day.',
  },
  {
    icon: FileCheck2,
    title: 'Document checks before you apply',
    text: 'Our team reviews your documents and details to help you avoid errors that cause delays.',
  },
  {
    icon: ReceiptText,
    title: 'Transparent pricing',
    text: 'A clear consultancy fee, shown upfront. Government fees are paid separately on the official portal.',
  },
  {
    icon: Headset,
    title: 'Real people to talk to',
    text: `Reach our team by phone or email, ${site.hoursShort}.`,
  },
];

/**
 * Visual slot: add a real office/team photo at /public/assets/images/why-choose-us.jpg
 * (recommended 1200×1400). Until then a branded composition with the verified
 * office details is shown.
 */
function VisualFallback() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-navy-700 ring-1 ring-white/10">
      <Guilloche size={700} className="absolute -bottom-40 -left-40 text-gold-400/20" strokeWidth={0.7} />
      <Stamp className="animate-slow-spin absolute right-7 top-7 h-24 w-24 text-white/25" />
      <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white p-5 shadow-lg sm:inset-x-6 sm:bottom-6">
        <p className="text-eyebrow uppercase text-ink-400">Visit our office</p>
        <div className="mt-3 flex gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
          <address className="not-italic text-small leading-relaxed text-ink-700">
            {site.address.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>
        <div className="mt-3 flex gap-3 border-t border-line-200 pt-3">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
          <p className="text-small text-ink-700">{site.hoursShort} · Sunday closed</p>
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUs() {
  const img = homeImages.assistance;
  return (
    <Section id={HOME_SECTIONS.about} tone="navy" labelledBy="why-title" className="overflow-hidden">
      <div className="container-wide relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal variant="image" className="order-2 mx-auto w-full max-w-[400px] lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-navy-800 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
            <ImageWithFallback
              src={img.src}
              alt={img.alt}
              width={1280}
              height={1600}
              sizes="(min-width: 1024px) 400px, 90vw"
              style={{ objectPosition: img.position }}
              className="absolute inset-0 h-full w-full object-cover"
              fallback={<VisualFallback />}
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="why-title"
            eyebrow="Why Passport Suvidha"
            title="Expert guidance, without the guesswork."
            description="Applying for a passport involves forms, documents and appointments. We make each part clearer, so you can apply with confidence."
            onDark
            className="!mb-6"
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 80}
                className="group flex gap-3.5 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-inset ring-white/10 transition-[background-color,box-shadow] duration-base hover:bg-white/[0.07] hover:ring-white/20 sm:p-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.08] text-gold-400 ring-1 ring-inset ring-white/10 transition-colors duration-base group-hover:bg-white/[0.12]">
                  <b.icon className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden />
                </span>
                <div>
                  <h3 className="text-[1rem] font-semibold text-white">{b.title}</h3>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-navy-100/75">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
