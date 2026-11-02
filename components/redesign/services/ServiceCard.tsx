import { ArrowRight } from 'lucide-react-redesign';
import type { Service } from '@/lib/redesign/types/service';
import { ServiceIcon } from '@/components/redesign/common/icons';
import { Badge } from '@/components/redesign/common/Badge';
import { cn } from '@/lib/redesign/utils/cn';
import { HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';
import { SmartLink } from '@/components/redesign/common/SmartLink';

/**
 * Compact service card. The whole card is one link target.
 *
 * Hover / keyboard focus (subtle by design — the card never changes colour):
 * lifts 4px, navy border + soft shadow, icon tile turns navy with a yellow icon,
 * and a short yellow accent line draws in at the top. No layered/negative z-index
 * elements (they caused the old "card turns yellow" bug).
 */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const titleId = `svc-${service.slug}`;
  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-line-200 bg-white p-5 transition-[transform,box-shadow,border-color] duration-base ease-brand sm:p-6',
        'hover:-translate-y-1 hover:border-navy-200 hover:shadow-[0_18px_40px_-24px_rgb(6_43_79/0.45)]',
        'focus-within:-translate-y-1 focus-within:border-navy-300 focus-within:shadow-[0_18px_40px_-24px_rgb(6_43_79/0.45)]',
        className,
      )}
    >
      {/* short accent line — draws in on hover/focus; never covers content */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-0 h-[3px] w-12 origin-left scale-x-0 rounded-b-full bg-gold-400 transition-transform duration-slow ease-brand group-focus-within:scale-x-100 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 transition-colors duration-base ease-brand group-focus-within:bg-navy-700 group-focus-within:text-gold-400 group-hover:bg-navy-700 group-hover:text-gold-400">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        {service.isUrgent && <Badge tone="gold">Urgent</Badge>}
      </div>

      <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">{service.tagline}</p>
      <h3 id={titleId} className="mt-1 text-[1.1875rem] font-semibold leading-snug text-navy-900">
        {/* Preview mode: service detail pages are disabled, so the card leads to the Apply section */}
        <SmartLink
          to={HOMEPAGE_PREVIEW_MODE ? '/apply-passport' : `/services/${service.slug}`}
          className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
        >
          {service.name}
        </SmartLink>
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-500">{service.summary}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line-200 pt-4 text-small">
        {service.facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[0.75rem] text-ink-400">{f.label}</dt>
            <dd className="mt-0.5 font-semibold text-ink-900">{f.value}</dd>
          </div>
        ))}
      </dl>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.875rem] font-semibold text-navy-700">
        {HOMEPAGE_PREVIEW_MODE ? 'Get started' : 'Learn more'}
        <ArrowRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-1" aria-hidden />
      </span>
    </article>
  );
}
