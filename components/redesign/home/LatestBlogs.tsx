'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react-redesign';
import type { Blog } from '@/lib/redesign/types/blog';
import { listBlogs } from '@/lib/redesign/services/blogService';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { EditorialBlogCard } from '@/components/redesign/blogs/EditorialBlogCard';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; items: Blog[] };

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line-200 bg-white ${className ?? ''}`} aria-hidden>
      <div className="aspect-[3/2] animate-pulse bg-navy-50" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-1/3 animate-pulse rounded bg-navy-50" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-navy-50" />
        <div className="h-3 w-full animate-pulse rounded bg-navy-50" />
      </div>
    </div>
  );
}

export function LatestBlogs() {
  const [state, setState] = useState<State>({ status: 'loading' });

  const load = () => {
    setState({ status: 'loading' });
    listBlogs({ pageSize: 3 })
      .then((res) => setState({ status: 'ready', items: res.items }))
      .catch(() => setState({ status: 'error' }));
  };
  useEffect(load, []);

  if (state.status === 'ready' && state.items.length === 0) return null;

  return (
    <Section id={HOME_SECTIONS.blog} tone="soft" labelledBy="blog-title">
      <div className="container-wide">
        <SectionHeading
          id="blog-title"
          eyebrow="Blog"
          title="Latest Insights & Guides"
          description="Helpful information and practical guidance for your passport application journey."
          action={
            !HOMEPAGE_PREVIEW_MODE && (
              <Button to="/blogs" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
                View all articles
              </Button>
            )
          }
        />

        <div aria-live="polite" aria-busy={state.status === 'loading'}>
          {state.status === 'loading' && (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr] lg:gap-5">
              <Skeleton />
              <Skeleton />
              <Skeleton className="hidden md:block" />
            </div>
          )}

          {state.status === 'error' && (
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-line-200 bg-white p-8 sm:flex-row sm:items-center">
              <AlertCircle className="h-6 w-6 text-danger" aria-hidden />
              <p className="flex-1 text-ink-700">We couldn’t load the latest articles right now.</p>
              <Button variant="outline" size="sm" onClick={load}>
                Try again
              </Button>
            </div>
          )}

          {state.status === 'ready' && (
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-[1.35fr_1fr_1fr] lg:gap-5">
              {state.items.slice(0, 3).map((b, i) => (
                <Reveal as="li" key={b.id} delay={i * 80} className={i === 0 ? 'sm:col-span-2 md:col-span-1' : undefined}>
                  <EditorialBlogCard blog={b} featured={i === 0} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
