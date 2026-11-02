'use client';

import { useEffect, useState } from 'react';
import { siteStats } from '@/lib/redesign/data/site';
import { useInView } from '@/lib/redesign/hooks/useInView';
import { usePrefersReducedMotion } from '@/lib/redesign/hooks/usePrefersReducedMotion';
import { PlaceholderMarker } from '@/components/redesign/common/Badge';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';

/** Animates the numeric part of values like "1,200+" or "98%" once in view. */
function CountUp({ value, run }: { value: string; run: boolean }) {
  const reduced = usePrefersReducedMotion();
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const [n, setN] = useState(reduced || Number.isNaN(target) ? target : 0);

  useEffect(() => {
    if (!run || reduced || Number.isNaN(target)) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, target]);

  if (!match) return <>{value}</>;
  return (
    <>
      <span aria-hidden>
        {match[1]}
        {n.toLocaleString('en-IN')}
        {match[3]}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export function StatsBand() {
  const { ref, inView } = useInView<HTMLUListElement>();
  return (
    <Section tone="white" labelledBy="stats-title" compact>
      <div className="container-wide grid items-center gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
        <SectionHeading
          id="stats-title"
          eyebrow="Our track record"
          title="Growing with every application we assist."
          description="Figures marked “to be confirmed” are awaiting verification and will be updated."
          className="!mb-0"
        />
        <ul ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4">
          {siteStats.map((s, i) => (
            <Reveal
              as="li"
              key={s.id}
              delay={i * 80}
              variant="scale"
              className="relative flex flex-col overflow-hidden rounded-2xl bg-navy-900 p-5 text-navy-100 sm:p-6"
            >
              <span aria-hidden className="absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 rounded-full bg-navy-700" />
              <p className="relative tabular text-[clamp(2rem,1.5rem+1.8vw,3rem)] font-bold leading-none tracking-tight text-white">
                <CountUp value={s.value} run={inView} />
              </p>
              <span aria-hidden className="mt-3 h-[3px] w-8 rounded-full bg-gold-400" />
              <p className="mt-3 text-small leading-snug text-navy-100/85">{s.label}</p>
              {!s.verified && <PlaceholderMarker onDark label="To confirm" className="mt-3 self-start" />}
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
