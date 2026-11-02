'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from '@/lib/redesign/router';
import { AlertCircle, ArrowRight, BookOpen, FileSearch, Search, X } from 'lucide-react-redesign';
import type { Blog, BlogCategory, Paginated } from '@/lib/redesign/types/blog';
import { listBlogCategories, listBlogs } from '@/lib/redesign/services/blogService';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Button } from '@/components/redesign/common/Button';
import { EmptyState } from '@/components/redesign/common/EmptyState';
import { Pagination } from '@/components/redesign/common/Pagination';
import { Reveal } from '@/components/redesign/common/Reveal';
import { BlogCard } from '@/components/redesign/blogs/BlogCard';
import { cn } from '@/lib/redesign/utils/cn';
import { BLOG_ENABLED } from '@/lib/redesign/config/content';

const PAGE_SIZE = 6;
const crumbs = [{ label: 'Blog' }];

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: Paginated<Blog> };

function GridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-line-200 bg-white">
          <div className="aspect-[16/10] animate-pulse bg-navy-50" />
          <div className="space-y-3 p-6">
            <div className="h-3 w-1/3 animate-pulse rounded bg-navy-50" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-navy-50" />
            <div className="h-3 w-full animate-pulse rounded bg-navy-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Shown while no articles are published — honest, and kept out of search results. */
function BlogComingSoon() {
  return (
    <>
      <PageHero breadcrumbs={crumbs} eyebrow="Blog" title="Passport guides are on the way." description="We’re preparing practical articles for applicants. Until then, our FAQ and document checklists answer the most common questions." />
      <section className="section-y-sm bg-paper-alt">
        <div className="container-content">
          <EmptyState
            icon={<BookOpen className="h-6 w-6" />}
            title="No articles published yet"
            description="Check the official requirements and frequently asked questions, or contact our team for help with your application."
            action={
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button to="/requirements" iconRight={<ArrowRight className="h-4 w-4" />}>Document requirements</Button>
                <Button to="/faq" variant="outline">Read the FAQ</Button>
              </div>
            }
          />
        </div>
      </section>
    </>
  );
}

export default function BlogsPage() {
  return BLOG_ENABLED ? <BlogsListing /> : <BlogComingSoon />;
}

function BlogsListing() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const category = params.get('category') ?? '';
  const q = params.get('q') ?? '';

  const [search, setSearch] = useState(q);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [state, setState] = useState<State>({ status: 'loading' });
  const [reload, setReload] = useState(0);


  const update = (next: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, String(v)) : p.delete(k)));
    if (!('page' in next)) p.delete('page');
    setParams(p);
  };

  useEffect(() => {
    listBlogCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Debounce the search box into the URL
  useEffect(() => {
    if (search === q) return;
    const t = window.setTimeout(() => update({ q: search.trim() || undefined }), 300);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    listBlogs({ page, pageSize: PAGE_SIZE, category: category || undefined, search: q || undefined })
      .then((data) => active && setState({ status: 'ready', data }))
      .catch(() => active && setState({ status: 'error' }));
    return () => {
      active = false;
    };
  }, [page, category, q, reload]);

  const filtersActive = !!(category || q);
  const items = state.status === 'ready' ? state.data.items : [];
  const showFeatured = !filtersActive && page === 1 && items.length > 0;
  const featured = showFeatured ? items[0] : null;
  const rest = showFeatured ? items.slice(1) : items;
  const anyDemo = items.some((b) => b.isDemo);

  const chip = (slug: string, label: string) => (
    <button
      key={slug || 'all'}
      type="button"
      onClick={() => update({ category: slug || undefined })}
      aria-pressed={category === slug}
      className={cn(
        'h-10 shrink-0 rounded-full px-4 text-small font-semibold transition-colors duration-fast',
        category === slug ? 'bg-navy-700 text-white' : 'border border-line-300 bg-white text-ink-700 hover:border-navy-300 hover:text-navy-700',
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Blog"
        title="Guides and updates for applicants."
        description="Practical articles to help you prepare, plus news from the Passport Suvidha team."
      />

      <section className="section-y !pt-10" aria-label="Articles">
        <div className="container-wide">
          <div className="flex flex-col gap-4 border-b border-line-200 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category" style={{ scrollbarWidth: 'none' }}>
              {chip('', 'All')}
              {categories.map((c) => chip(c.slug, c.name))}
            </div>
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:max-w-xs">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden />
              <input
                id="blog-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles"
                className="h-11 w-full rounded-full border border-line-300 bg-white pl-11 pr-10 text-[0.9375rem] placeholder:text-ink-400 focus:border-navy-500 focus:outline-none focus:ring-4 focus:ring-navy-100 [&::-webkit-search-cancel-button]:hidden"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink-500 hover:bg-navy-50" aria-label="Clear search">
                  <X className="h-4 w-4" />
                </button>
              )}
            </form>
          </div>

          {anyDemo && (
            <p className="mt-6 rounded-lg border border-dashed border-warning/50 bg-warning/5 px-4 py-3 text-small text-ink-700">
              <strong className="font-semibold text-warning">Demo content:</strong> these articles are placeholders for layout review and are not
              verified passport guidance. Real articles will load from the content system.
            </p>
          )}

          <div className="mt-10" aria-live="polite" aria-busy={state.status === 'loading'}>
            {state.status === 'loading' && <GridSkeleton />}

            {state.status === 'error' && (
              <EmptyState
                tone="error"
                icon={<AlertCircle className="h-6 w-6" />}
                title="We couldn’t load articles"
                description="Please check your connection and try again."
                action={
                  <Button variant="outline" onClick={() => setReload((n) => n + 1)}>
                    Try again
                  </Button>
                }
              />
            )}

            {state.status === 'ready' && items.length === 0 && (
              <EmptyState
                icon={<FileSearch className="h-6 w-6" />}
                title="No articles found"
                description={q ? `Nothing matches “${q}”. Try another search or category.` : 'There are no articles in this category yet.'}
                action={
                  filtersActive && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearch('');
                        setParams(new URLSearchParams());
                      }}
                    >
                      Clear filters
                    </Button>
                  )
                }
              />
            )}

            {state.status === 'ready' && items.length > 0 && (
              <>
                {filtersActive && (
                  <p className="mb-6 text-small text-ink-500">
                    {state.data.total} {state.data.total === 1 ? 'article' : 'articles'} found
                  </p>
                )}
                {featured && (
                  <Reveal className="mb-6">
                    <BlogCard blog={featured} variant="wide" headingLevel="h2" />
                  </Reveal>
                )}
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((b, i) => (
                    <Reveal as="li" key={b.id} delay={(i % 3) * 60}>
                      <BlogCard blog={b} headingLevel="h2" className="h-full" />
                    </Reveal>
                  ))}
                </ul>
                <Pagination
                  className="mt-14"
                  page={state.data.page}
                  totalPages={state.data.totalPages}
                  onChange={(p) => {
                    update({ page: p > 1 ? p : undefined });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
