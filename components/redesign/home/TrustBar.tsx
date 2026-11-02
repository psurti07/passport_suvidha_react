import { ArrowUpRight, BadgeCheck, Building2, ReceiptText } from 'lucide-react-redesign';
import { mediaCoverage, site } from '@/lib/redesign/data/site';
import { Reveal } from '@/components/redesign/common/Reveal';

/** Compact trust band — every item is verifiable (press links, registration, office). */
export function TrustBar() {
  const outlets = Array.from(new Map(mediaCoverage.map((m) => [m.outlet, m])).values());
  const points = [
    { icon: BadgeCheck, text: `Registered as ${site.legalName}` },
    { icon: Building2, text: `Office in ${site.address.city}, ${site.address.region}` },
    { icon: ReceiptText, text: 'Consultancy fee only — govt. fees paid separately' },
  ];

  return (
    <section aria-label="Why people trust Passport Suvidha" className="border-b border-line-200 bg-white">
      <Reveal variant="fade" className="container-wide flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-eyebrow uppercase text-ink-400">As featured in</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {outlets.map((o) => (
              <li key={o.outlet}>
                <a
                  href={o.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[1.0625rem] font-bold tracking-tight text-ink-700 transition-colors hover:text-navy-700"
                >
                  {o.outlet}
                  <ArrowUpRight className="h-4 w-4 text-ink-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-700" aria-hidden />
                  <span className="sr-only">(opens article in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6 lg:flex lg:gap-8">
          {points.map((p) => (
            <li key={p.text} className="flex items-center gap-2.5 text-small font-medium text-ink-700">
              <p.icon className="h-[18px] w-[18px] shrink-0 text-navy-700" strokeWidth={1.75} aria-hidden />
              {p.text}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
