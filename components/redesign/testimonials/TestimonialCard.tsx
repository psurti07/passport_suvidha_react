import { MapPin } from 'lucide-react-redesign';
import type { Testimonial } from '@/lib/redesign/types/testimonial';
import { ImageWithFallback } from '@/components/redesign/common/ImageWithFallback';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { cn } from '@/lib/redesign/utils/cn';
import { initials } from '@/lib/redesign/utils/text';

/** Decorative passport-style machine-readable line, e.g. "P<INDKATO<<GOPI<<<<<<<<<". */
function mrzLine(name: string) {
  const parts = name.toUpperCase().replace(/[^A-Z ]/g, '').split(/\s+/);
  const surname = parts.length > 1 ? parts[parts.length - 1] : parts[0];
  const given = parts.length > 1 ? parts.slice(0, -1).join('<') : '';
  return `P<IND${surname}<<${given}`.padEnd(36, '<').slice(0, 36);
}

/** Shown when a customer has no photo yet — same 4:5 size, so layouts never jump. */
function PortraitFallback({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden bg-navy-700">
      <Guilloche size={300} className="absolute h-[130%] w-[130%] text-gold-400/20" strokeWidth={0.7} />
      <span className="relative grid h-20 w-20 place-items-center rounded-full bg-white/10 text-2xl font-bold tracking-wide text-white ring-1 ring-white/25">
        {initials(name)}
      </span>
    </div>
  );
}

/**
 * Customer card using ONLY the supplied verified data — no quotes or ratings.
 * Shows the customer's original photo as a rounded 4:5 portrait (focal point from
 * `imagePosition`). If `quote` is ever supplied by the client it is shown.
 */
export function TestimonialCard({ testimonial: t, className }: { testimonial: Testimonial; className?: string }) {
  const isTatkal = t.service.startsWith('Tatkal');
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col rounded-2xl bg-white p-2 ring-1 ring-line-200 transition-[transform,box-shadow] duration-base ease-brand hover:-translate-y-1 hover:shadow-md hover:ring-navy-200',
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-navy-50">
        <ImageWithFallback
          src={t.imageUrl}
          alt={`${t.fullName}, Passport Suvidha customer from ${t.city}`}
          width={480}
          height={600}
          style={{ objectPosition: t.imagePosition ?? 'center 30%' }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-brand group-hover:scale-[1.04]"
          fallback={<PortraitFallback name={t.fullName} />}
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/50 to-transparent" />
        <span
          className={cn(
            'absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold shadow-sm',
            isTatkal ? 'bg-gold-400 text-navy-900' : 'bg-white text-navy-700',
          )}
        >
          {t.service} · {t.pages} pages
        </span>
      </div>

      <div className="px-2 pb-1 pt-3.5">
        <h3 className="truncate text-[1.0625rem] font-semibold text-ink-900">{t.fullName}</h3>
        <p className="mt-0.5 flex items-start gap-1.5 text-small text-ink-500">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-500" aria-hidden />
          <span>
            {t.city}, {t.state}
          </span>
        </p>
        {t.quote && <blockquote className="mt-3 text-[0.9375rem] text-ink-700">“{t.quote}”</blockquote>}
      </div>

      <p aria-hidden className="mt-auto truncate rounded-b-xl px-2 pb-1 pt-2.5 font-mono text-[0.625rem] tracking-[0.18em] text-[rgb(128_140_158/0.8)]">
        {mrzLine(t.fullName)}
      </p>
    </article>
  );
}
