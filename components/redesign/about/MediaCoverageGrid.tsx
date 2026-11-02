import { ArrowUpRight, Newspaper } from 'lucide-react-redesign';
import { mediaCoverage } from '@/lib/redesign/data/media';
import { Reveal } from '@/components/redesign/common/Reveal';
import { formatDate } from '@/lib/redesign/utils/date';

/**
 * Real, externally published articles (src/data/media.ts), newest first.
 * Each card links to the publisher's page in a new tab.
 */
export function MediaCoverageGrid() {
  const articles = [...mediaCoverage].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  if (articles.length === 0) return null;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {articles.map((m, i) => (
        <Reveal as="li" key={m.id} delay={(i % 4) * 60} className="min-w-0">
          <article className="group relative flex h-full flex-col rounded-2xl border border-line-200 bg-white p-6 transition-[border-color,box-shadow,transform] duration-base ease-brand hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-md focus-within:border-navy-300">
            <p className="inline-flex items-center gap-2 text-small font-bold text-navy-700">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700 ring-1 ring-inset ring-navy-100">
                <Newspaper className="h-3.5 w-3.5" aria-hidden />
              </span>
              {m.outlet}
            </p>
            <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug text-ink-900">
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:shadow-focus group-hover:text-navy-700"
              >
                {m.headline}
                <span className="sr-only"> — {m.outlet} (opens in a new tab)</span>
              </a>
            </h3>
            <p className="mb-5 mt-2.5 line-clamp-3 text-[0.9063rem] leading-relaxed text-ink-500">{m.summary}</p>
            <p className="mt-auto flex items-center justify-between gap-3 border-t border-line-200 pt-4">
              <time dateTime={m.publishedAt} className="text-[0.8125rem] text-ink-400">
                {formatDate(m.publishedAt)}
              </time>
              <span aria-hidden className="inline-flex items-center gap-1 text-small font-semibold text-navy-700">
                Read article
                <ArrowUpRight className="h-4 w-4 transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </p>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
