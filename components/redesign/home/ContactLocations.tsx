import { Clock, ExternalLink, Mail, MapPin, Navigation, Phone, ReceiptText } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { OFFICIAL_PORTAL_URL } from '@/lib/redesign/data/requirements';
import { HOME_SECTIONS } from '@/lib/redesign/config/preview';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { EmailText } from '@/components/redesign/common/EmailText';

/**
 * Homepage contact + office location (verified details only). Serves the
 * CONTACT and LOCATIONS navigation items in homepage preview mode.
 */
export function ContactLocations() {
  const mapQuery = encodeURIComponent(site.address.lines.join(', '));
  const channels = [
    { icon: Phone, label: 'Phone support', value: site.phone.display, href: site.phone.href, isEmail: false },
    { icon: Mail, label: 'Email support', value: site.email.display, href: site.email.href, isEmail: true },
  ];

  return (
    <Section id={HOME_SECTIONS.contact} tone="soft" labelledBy="contact-title">
      <div className="container-wide grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="min-w-0">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact & locations"
            title="Talk to our team, or visit us in Surat."
            description="Questions about documents, services or an application in progress? We’re here to help."
            className="!mb-6"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 70}>
                <a
                  href={c.href}
                  className="group flex h-full min-w-0 items-center gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-line-200 transition-[box-shadow,transform] duration-base hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-700 text-gold-400">
                    <c.icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-small text-ink-500">{c.label}</span>
                    {c.isEmail ? (
                      <EmailText email={c.value} className="block text-[0.9375rem] font-semibold leading-snug text-ink-900 group-hover:text-navy-700" />
                    ) : (
                      <span className="block whitespace-nowrap text-[0.9375rem] font-semibold leading-snug text-ink-900 group-hover:text-navy-700">{c.value}</span>
                    )}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={140} className="mt-3 rounded-2xl bg-white p-5 ring-1 ring-line-200">
            <dl className="divide-y divide-line-200 text-[0.875rem] sm:text-[0.9375rem]">
              {site.hours.map((h) => (
                <div key={h.days} className="flex items-center justify-between gap-4 py-2.5 first:pt-0">
                  <dt className="flex items-center gap-2.5 whitespace-nowrap text-ink-500">
                    <Clock className="h-4 w-4 text-navy-500" aria-hidden />
                    <span className="min-[400px]:hidden">{h.daysShort}</span>
                    <span className="hidden min-[400px]:inline">{h.days}</span>
                  </dt>
                  <dd className="whitespace-nowrap text-right font-semibold text-ink-900">{h.time}</dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 pb-0 pt-2.5">
                <dt className="flex items-center gap-2.5 text-ink-500">
                  <ReceiptText className="h-4 w-4 text-navy-500" aria-hidden />
                  GSTIN
                </dt>
                <dd className="font-semibold text-ink-900">{site.gstNumber}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={100} id={HOME_SECTIONS.locations} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line-200">
          <div className="relative aspect-[16/9] bg-navy-50">
            <iframe
              title="Map showing the Passport Suvidha office in Surat"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-eyebrow uppercase text-ink-400">Our office</p>
            <div className="mt-2 flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
              <address className="not-italic text-[0.9375rem] leading-relaxed text-ink-700">{site.address.lines.join(', ')}</address>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm" iconLeft={<Navigation className="h-4 w-4" />}>
                Get directions
              </Button>
              <Button href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" iconRight={<ExternalLink className="h-4 w-4" />}>
                Find your nearest PSK
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
