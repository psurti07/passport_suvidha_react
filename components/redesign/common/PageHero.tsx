'use client';

import type { ReactNode } from 'react';
import { Guilloche } from './Guilloche';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { Reveal } from './Reveal';
import { cn } from '@/lib/redesign/utils/cn';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs: Crumb[];
  actions?: ReactNode;
  /** Optional right-hand content (card, art) on large screens */
  aside?: ReactNode;
  /**
   * soft = light blue (default) · navy = deep navy with a gold rule.
   * Mix them across pages so internal pages don't all look identical.
   */
  tone?: 'soft' | 'navy' | 'light';
  className?: string;
  children?: ReactNode;
}

/** Shared hero for every internal page: breadcrumbs, eyebrow, H1, intro and optional aside. */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, aside, tone = 'soft', className, children }: PageHeroProps) {
  const dark = tone === 'navy';
  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        dark ? 'bg-navy-900' : tone === 'light' ? 'bg-paper-alt' : 'bg-navy-50',
        className,
      )}
    >
      {dark && (
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_90%_at_90%_0%,rgb(0_69_126/0.85),transparent_70%)]" />
      )}
      <div className="absolute -right-48 -top-56 -z-10 h-[640px] w-[640px]" aria-hidden>
        <Guilloche
          size={640}
          className={cn('animate-slow-spin h-full w-full', dark ? 'text-gold-400/[0.09]' : 'text-navy-700/[0.07]')}
          strokeWidth={0.7}
        />
      </div>
      <div className={cn('container-wide pb-12 pt-6 lg:pb-14 lg:pt-8', !!aside && 'grid items-center gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14')}>
        <div>
          <Breadcrumbs items={breadcrumbs} onDark={dark} />
          <Reveal className="mt-8 lg:mt-10">
            {eyebrow && (
              <p className={cn('eyebrow mb-3 flex items-center gap-3', dark && 'text-gold-400')}>
                <span aria-hidden className={cn('h-px w-6', dark ? 'bg-gold-400' : 'bg-navy-300')} />
                {eyebrow}
              </p>
            )}
            <h1 className={cn('max-w-3xl text-h1', dark && 'text-white')}>{title}</h1>
            {description && (
              <div className={cn('mt-4 max-w-2xl text-body-lg', dark ? 'text-navy-100/85' : 'text-ink-500')}>{description}</div>
            )}
            {actions && <div className="mt-7 flex flex-col gap-3 sm:flex-row">{actions}</div>}
            {children}
          </Reveal>
        </div>
        {aside && (
          <Reveal delay={120} variant="scale">
            {aside}
          </Reveal>
        )}
      </div>
      {dark && <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />}
    </section>
  );
}
