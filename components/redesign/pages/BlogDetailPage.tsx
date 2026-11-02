'use client';

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from '@/lib/redesign/router';
import { AlertCircle, ArrowLeft, ArrowRight, Clock, FileSearch } from 'lucide-react-redesign';
import type { Blog } from '@/lib/redesign/types/blog';
import { getBlogBySlug, getRelatedBlogs } from '@/lib/redesign/services/blogService';
import { site } from '@/lib/redesign/data/site';
import { formatDate } from '@/lib/redesign/utils/date';
import { prepareArticleHtml } from '@/lib/redesign/utils/html';
import { Breadcrumbs } from '@/components/redesign/common/Breadcrumbs';
import { Button } from '@/components/redesign/common/Button';
import { EmptyState } from '@/components/redesign/common/EmptyState';
import { ImageWithFallback } from '@/components/redesign/common/ImageWithFallback';
import { Reveal } from '@/components/redesign/common/Reveal';
import { BlogCard } from '@/components/redesign/blogs/BlogCard';
import { BlogCover } from '@/components/redesign/blogs/BlogCover';
import { ShareLinks } from '@/components/redesign/blogs/ShareLinks';
import { TableOfContents } from '@/components/redesign/blogs/TableOfContents';

type State = { status: 'loading' } | { status: 'error' } | { status: 'not-found' } | { status: 'ready'; blog: Blog };

export default function BlogDetailPage() {
  const { slug = '' } = useParams();
  const [state, setState] = useState<State>({ status: 'loading' });
  const [related, setRelated] = useState<Blog[]>([]);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    setRelated([]);
    getBlogBySlug(slug)
      .then((blog) => {
        if (!active) return;
        if (!blog) return setState({ status: 'not-found' });
        setState({ status: 'ready', blog });
        getRelatedBlogs(blog).then((r) => active && setRelated(r));
      })
      .catch(() => active && setState({ status: 'error' }));
    return () => {
      active = false;
    };
  }, [slug, reload]);

  const blog = state.status === 'ready' ? state.blog : null;
  const article = useMemo(() => (blog ? prepareArticleHtml(blog.content) : null), [blog]);
  const crumbs = [{ label: 'Blog', to: '/blogs' }, { label: blog?.title ?? 'Article' }];
  const url = `${site.url}/blogs/${slug}`;


  if (state.status === 'loading') {
    return (
      <div className="container-wide py-16" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading article…</span>
        <div className="mx-auto max-w-article space-y-5" aria-hidden>
          <div className="h-4 w-40 animate-pulse rounded bg-navy-50" />
          <div className="h-10 w-full animate-pulse rounded bg-navy-50" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-navy-50" />
          <div className="mt-8 aspect-[16/9] animate-pulse rounded-2xl bg-navy-50" />
        </div>
      </div>
    );
  }

  if (state.status === 'error' || state.status === 'not-found') {
    const notFound = state.status === 'not-found';
    return (
      <div className="container-content py-20">
        <EmptyState
          headingLevel="h1"
          tone={notFound ? 'neutral' : 'error'}
          icon={notFound ? <FileSearch className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
          title={notFound ? 'Article not found' : 'We couldn’t load this article'}
          description={notFound ? 'It may have been moved or unpublished.' : 'Please check your connection and try again.'}
          action={
            notFound ? (
              <Button to="/blogs" variant="secondary" iconLeft={<ArrowLeft className="h-4 w-4" />}>
                Back to blog
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setReload((n) => n + 1)}>
                Try again
              </Button>
            )
          }
        />
      </div>
    );
  }

  const b = state.blog;
  const showToc = (article?.toc.length ?? 0) >= 3;

  return (
    <>
      <article>
        <header className="bg-paper-alt">
          <div className="container-wide pb-10 pt-8 lg:pt-10">
            <Breadcrumbs items={crumbs} />
            <div className="mx-auto mt-10 max-w-3xl text-center lg:mt-14">
              <Link to={`/blogs?category=${b.category.slug}`} className="eyebrow inline-block hover:underline">
                {b.category.name}
              </Link>
              <h1 className="mt-4 text-h1">{b.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-body-lg text-ink-500">{b.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-small text-ink-500">
                <time dateTime={b.publishedAt}>{formatDate(b.publishedAt)}</time>
                {b.readingTimeMinutes && (
                  <>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-line-300" />
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" aria-hidden /> {b.readingTimeMinutes} min read
                    </span>
                  </>
                )}
                {b.isDemo && (
                  <span className="rounded-full border border-dashed border-warning/60 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-warning">
                    Demo content
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="container-wide">
            <div className="relative mx-auto aspect-[16/9] max-w-5xl translate-y-10 overflow-hidden rounded-2xl bg-navy-50 shadow-md lg:translate-y-16">
              <ImageWithFallback
                src={b.featuredImage}
                alt=""
                width={1600}
                height={900}
                className="absolute inset-0 h-full w-full object-cover"
                fallback={<BlogCover seed={b.slug} label={b.category.name} />}
              />
            </div>
          </div>
        </header>

        <div className="container-wide pb-16 pt-20 lg:pb-24 lg:pt-28">
          <div className={showToc ? 'grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[240px_minmax(0,720px)_1fr]' : 'mx-auto max-w-article'}>
            {showToc && (
              <aside className="hidden lg:block">
                <TableOfContents items={article!.toc} className="sticky top-28" />
              </aside>
            )}
            <div className="min-w-0">
              {showToc && (
                <details className="mb-10 rounded-xl border border-line-200 bg-paper-alt p-5 lg:hidden">
                  <summary className="cursor-pointer font-semibold text-ink-900">On this page</summary>
                  <ol className="mt-3 space-y-2 text-small">
                    {article!.toc.map((t) => (
                      <li key={t.id} className={t.level === 3 ? 'pl-4' : undefined}>
                        <a href={`#${t.id}`} className="text-navy-700 hover:underline">
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              {/* Sanitised with DOMPurify in prepareArticleHtml() */}
              <div className="prose-ps" dangerouslySetInnerHTML={{ __html: article!.html }} />

              <footer className="mt-14 flex flex-col gap-6 border-t border-line-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <ShareLinks url={url} title={b.title} />
                <Button to="/blogs" variant="outline" size="sm" iconLeft={<ArrowLeft className="h-4 w-4" />}>
                  Back to blog
                </Button>
              </footer>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y bg-paper-alt">
          <div className="container-wide">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 id="related-title" className="text-h2">
                Related articles
              </h2>
              <Button to="/blogs" variant="link" iconRight={<ArrowRight className="h-4 w-4" />} className="hidden sm:inline-flex">
                View all
              </Button>
            </div>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.id} delay={i * 60}>
                  <BlogCard blog={r} className="h-full" />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
