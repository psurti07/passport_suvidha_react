'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from '@/lib/redesign/router';
import { Mail, MessageCircleQuestion, Phone, Search, X } from 'lucide-react-redesign';
import { faqCategories, faqs } from '@/lib/redesign/data/faqs';
import { site } from '@/lib/redesign/data/site';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Accordion } from '@/components/redesign/common/Accordion';
import { Button } from '@/components/redesign/common/Button';
import { EmptyState } from '@/components/redesign/common/EmptyState';
import { cn } from '@/lib/redesign/utils/cn';
import { EmailText } from '@/components/redesign/common/EmailText';

const crumbs = [{ label: 'FAQ' }];

export default function FaqPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const category = params.get('category') ?? 'all';


  const updateParams = (next: { q?: string; category?: string }) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v && v !== 'all' ? p.set(k, v) : p.delete(k)));
    setParams(p, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) => (category === 'all' || f.category === category) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const groups = faqCategories
    .map((c) => ({ ...c, items: filtered.filter((f) => f.category === c.id) }))
    .filter((g) => g.items.length);

  const chip = (id: string, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => updateParams({ category: id })}
      aria-pressed={category === id}
      className={cn(
        'h-10 shrink-0 rounded-full px-4 text-small font-semibold transition-colors duration-fast',
        category === id ? 'bg-navy-700 text-white' : 'border border-line-300 bg-white text-ink-700 hover:border-navy-300 hover:text-navy-700',
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <PageHero
        tone="navy"
        breadcrumbs={crumbs}
        eyebrow="Help centre"
        title="Frequently asked questions."
        description="Clear answers about how our consultancy works, documents, fees and support."
      >
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative mt-8 max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateParams({ q: e.target.value });
            }}
            placeholder="Search for a question…"
            className="h-14 w-full rounded-full border border-line-300 bg-white pl-14 pr-12 text-[1rem] shadow-sm placeholder:text-ink-400 focus:border-navy-500 focus:outline-none focus:ring-4 focus:ring-navy-100 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                updateParams({ q: '' });
              }}
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink-500 hover:bg-navy-50"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </PageHero>

      <section className="section-y" aria-label="Questions">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="min-w-0">
            <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category" style={{ scrollbarWidth: 'none' }}>
              {chip('all', 'All')}
              {faqCategories.map((c) => chip(c.id, c.label))}
            </div>

            <p className="sr-only" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'question' : 'questions'} found
            </p>

            {groups.length === 0 ? (
              <EmptyState
                icon={<MessageCircleQuestion className="h-6 w-6" />}
                title="No matching questions"
                description="Try different words, or ask our team directly."
                action={
                  <Button to="/contact" variant="outline">
                    Contact us
                  </Button>
                }
              />
            ) : (
              <div className="space-y-12">
                {groups.map((g) => (
                  <section key={g.id} aria-labelledby={`faq-group-${g.id}`}>
                    <h2 id={`faq-group-${g.id}`} className="mb-2 text-h3">
                      {g.label}
                    </h2>
                    <Accordion items={g.items.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))} />
                  </section>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Contact support">
            <div className="rounded-2xl bg-navy-700 p-6 text-navy-100">
              <p className="text-h3 text-white">Still need help?</p>
              <p className="mt-2">Can’t find your answer? Our team is happy to help.</p>
              <ul className="mt-6 space-y-3">
                <li>
                  <a href={site.phone.href} className="flex items-center gap-3 font-semibold text-white hover:text-gold-400">
                    <Phone className="h-4 w-4" aria-hidden /> {site.phone.display}
                  </a>
                </li>
                <li>
                  <a href={site.email.href} className="flex min-w-0 items-center gap-3 font-semibold text-white hover:text-gold-400">
                    <Mail className="h-4 w-4 shrink-0" aria-hidden /> <EmailText email={site.email.display} className="min-w-0" />
                  </a>
                </li>
              </ul>
              <p className="mt-5 text-small text-navy-200">{site.hoursShort}</p>
              <Button to="/contact" className="mt-6 w-full">
                Send a message
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
