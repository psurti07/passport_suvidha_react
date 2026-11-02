import { AlertTriangle, Mail, MapPin, Phone } from 'lucide-react-redesign';
import { getLegalDoc, type LegalDoc } from '@/lib/redesign/data/legal';
import { site } from '@/lib/redesign/data/site';
import { formatDate } from '@/lib/redesign/utils/date';
import { PageHero } from '@/components/redesign/common/PageHero';
import { TableOfContents } from '@/components/redesign/blogs/TableOfContents';
import { EmailText } from '@/components/redesign/common/EmailText';

/** One template for Privacy Policy, Terms, Disclaimer and Refund Policy. */
export default function LegalPage({ slug }: { slug: LegalDoc['slug'] }) {
  const doc = getLegalDoc(slug);
  const crumbs = [{ label: doc.title }];
  const toc = doc.sections.map((s) => ({ id: s.id, text: s.title, level: 2 as const }));
  const showToc = toc.length >= 3;


  return (
    <>
      <PageHero
        tone="light"
        breadcrumbs={crumbs}
        eyebrow="Legal"
        title={doc.title}
        description={doc.lastUpdated ? <p>Last updated {formatDate(doc.lastUpdated)}</p> : doc.description}
      />

      <div className="container-wide py-12 lg:py-16">
        <div className={showToc ? 'grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16' : 'mx-auto max-w-article'}>
          {showToc && (
            <aside className="hidden lg:block">
              <TableOfContents items={toc} className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2" />
            </aside>
          )}

          <div className="min-w-0 max-w-article">
            <div className="prose-ps">
              {doc.intro.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {doc.notice && (
              <div className="mt-8 rounded-xl border-l-4 border-gold-400 bg-paper-warm p-5">
                <p className="font-semibold text-ink-900">Important notice</p>
                <p className="mt-1 text-ink-700">{doc.notice}</p>
              </div>
            )}

            {doc.sections.length > 0 && (
              <div className="prose-ps mt-4">
                {doc.sections.map((s, i) => (
                  <section key={s.id} aria-labelledby={s.id}>
                    <h2 id={s.id}>
                      <span className="mr-2 text-navy-500 tabular">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </h2>
                    {s.paragraphs.length ? (
                      s.paragraphs.map((p) => <p key={p.slice(0, 40)}>{p}</p>)
                    ) : (
                      <p className="!mt-4 flex items-start gap-3 rounded-lg border border-dashed border-warning/50 bg-warning/5 p-4 !text-[0.9375rem] !leading-relaxed text-ink-700">
                        <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-warning" aria-hidden />
                        <span>
                          <strong>Placeholder:</strong> the approved text for this section must be supplied by Passport Suvidha before launch.
                        </span>
                      </p>
                    )}
                  </section>
                ))}
              </div>
            )}

            <section aria-labelledby="legal-contact" className="mt-14 rounded-2xl border border-line-200 bg-paper-alt p-6">
              <h2 id="legal-contact" className="text-h3">
                Contact us
              </h2>
              <p className="mt-2 text-ink-500">Questions about this {doc.title.toLowerCase()}? Contact our team:</p>
              <ul className="mt-5 grid gap-4 text-ink-700 sm:grid-cols-2">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
                  <a href={site.email.href} className="min-w-0 font-semibold text-navy-700 hover:underline">
                    <EmailText email={site.email.display} />
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
                  <a href={site.phone.href} className="font-semibold text-navy-700 hover:underline">
                    {site.phone.display}
                  </a>
                </li>
                <li className="flex gap-3 sm:col-span-2">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
                  <address className="not-italic">{site.address.lines.join(', ')}</address>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
