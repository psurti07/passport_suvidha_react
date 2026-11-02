import type { CSSProperties } from 'react';
import { ArrowRight, BookOpen, Clock, FileText, ShieldCheck } from 'lucide-react-redesign';
import { Button } from '@/components/redesign/common/Button';
import { Reveal } from '@/components/redesign/common/Reveal';
import { HOME_SECTIONS } from '@/lib/redesign/config/preview';
import { heroImages } from '@/lib/redesign/data/home';

const infoRows = [
  // non-breaking spaces keep the mobile 3-column card wrapping at natural points
  { icon: FileText, text: 'Normal · Tatkal · Reissue' },
  { icon: BookOpen, text: '36 or 60 pages' },
  { icon: Clock, text: 'Mon–Sat, 10 AM – 5 PM' },
];

/**
 * Where the passport sits inside the supplied MOBILE photograph (fractions of its
 * height). The mobile "stage" below the CTAs is sized from these so the copy never
 * covers the passport and the info card sits over the floor area underneath it.
 */
const MOBILE_PASSPORT_TOP = 0.45;
const MOBILE_PASSPORT_BOTTOM = 0.78;

/**
 * Homepage hero: the client's airport + Indian passport photograph is the main
 * visual (separate mobile and desktop files via <picture>), with a navy grade for
 * legibility, real HTML copy and a frosted-glass information card. The top info
 * strip and floating glass header overlay this section.
 */
export function Hero() {
  const { desktop, mobile } = heroImages;
  const vars = {
    // mobile image height as a multiple of the viewport width (it spans 100vw)
    '--hm-r': mobile.height / mobile.width,
    '--hm-top': MOBILE_PASSPORT_TOP,
    '--hm-below': 1 - MOBILE_PASSPORT_BOTTOM,
  } as CSSProperties;

  return (
    <section
      id={HOME_SECTIONS.top}
      aria-labelledby="hero-title"
      style={vars}
      className="relative isolate overflow-hidden bg-[#031830] text-white"
    >
      {/* Photograph — kept sharp. Mobile: full width, anchored to the bottom.
          md+: covers the section. */}
      <picture className="absolute inset-x-0 bottom-0 -z-20 md:inset-0">
        <source media="(max-width: 767px)" srcSet={mobile.src} width={mobile.width} height={mobile.height} />
        <img
          src={desktop.src}
          alt=""
          width={desktop.width}
          height={desktop.height}
          {...{ fetchpriority: "high" }}
          className="block w-full max-md:h-auto max-md:[mask-image:linear-gradient(to_bottom,transparent,#000_14%)] md:h-full md:object-cover md:object-[39%_center] lg:object-[34%_center] xl:object-[62%_center]"
        />
      </picture>

      {/* Navy grade — mobile: top to bottom (copy on top, passport clear in the middle) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(3_24_48/0.9)_0%,rgb(3_24_48/0.82)_34%,rgb(3_24_48/0.4)_46%,rgb(3_24_48/0.08)_58%,rgb(3_24_48/0.08)_80%,rgb(3_24_48/0.4)_100%)] md:hidden"
      />
      {/* md+: left to right (copy on the left, sunset + passport clear), soft band under the header */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,rgb(3_24_48/0.9)_0%,rgb(3_24_48/0.72)_32%,rgb(3_24_48/0.18)_52%,rgb(3_24_48/0.06)_72%,rgb(3_24_48/0.3)_100%)] md:block"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 hidden h-48 bg-gradient-to-b from-[rgb(3_24_48/0.6)] to-transparent md:block" />

      <div className="relative mx-auto w-full max-w-[1320px] px-4 pt-[calc(var(--topbar-h)+var(--hdrbar-h)+26px)] sm:px-6 md:grid md:grid-cols-[minmax(0,410px)_minmax(0,1fr)] md:content-center md:gap-x-6 md:gap-y-6 md:pb-12 md:pt-[calc(var(--topbar-h)+var(--hdrbar-h)+36px)] lg:w-[92%] lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:min-h-[720px] xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)_minmax(0,0.72fr)] xl:items-center xl:gap-4 xl:pb-16">
        {/* Copy */}
        <div className="relative z-10 md:col-start-1 md:row-start-1">
          <Reveal>
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1 pl-1 pr-3 text-[0.75rem] font-medium text-white/90 backdrop-blur-md md:gap-2.5 md:border-transparent md:bg-white/[0.85] md:py-1.5 md:pl-1.5 md:pr-4 md:text-[0.8125rem] lg:text-[0.875rem] md:font-semibold md:text-navy-900">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-900 md:h-6 md:w-6">
                <ShieldCheck className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="truncate">Simplifying passport services for a better tomorrow</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-4 text-[clamp(1.95rem,0.55rem+6.4vw,2.375rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white md:mt-6 md:text-[clamp(2.3rem,0.5rem+2.6vw,3.6rem)] 2xl:text-[3.25rem] md:leading-[1.08] md:tracking-[-0.03em]"
            >
              <span className="lg:whitespace-nowrap">Your Passport Journey,</span>
              <span className="block text-gold-400">Made Simple.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-3 max-w-[30rem] text-[0.9375rem] leading-relaxed text-white/80 md:mt-5 md:text-[1.0625rem] md:text-white/85 lg:text-[1.1875rem]">
              Get the guidance and assistance you need for a smoother passport application experience.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-5 grid grid-cols-1 gap-2.5 min-[375px]:grid-cols-2 md:mt-8 md:flex md:gap-3">
            <Button
              to="/apply-passport"
              size="lg"
              className="!h-12 !px-4 !text-[0.9375rem] md:!h-[3.25rem] md:!px-7 md:!text-base lg:!h-14 lg:!px-8 lg:!text-[1.0625rem]"
              iconRight={<ArrowRight className="h-[18px] w-[18px] md:h-5 md:w-5" />}
            >
              Apply Now
            </Button>
            <Button
              to="/services"
              size="lg"
              variant="outline-light"
              className="!h-12 border-white/45 !px-4 !text-[0.9375rem] md:!h-[3.25rem] md:!px-7 md:!text-base lg:!h-14 lg:!px-8 lg:!text-[1.0625rem]"
            >
              Explore Services
            </Button>
          </Reveal>
        </div>

        {/* Mobile: a stage sized from the photo so the passport shows between the CTAs and the
            card. md+: `contents`, so the card becomes an item of the desktop grid. */}
        <div className="relative h-[calc(100vw*var(--hm-r)*(1-var(--hm-top))+12px)] md:contents">
          <Reveal
            delay={320}
            className="absolute inset-x-0 bottom-[max(14px,calc((100vw*var(--hm-r)*var(--hm-below)-104px)/2))] z-10 md:static md:col-start-1 md:row-start-2 md:w-full xl:col-start-3 xl:row-start-1 xl:max-w-[400px] xl:justify-self-end"
          >
            <div className="rounded-[20px] border border-white/30 bg-white/15 p-1.5 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.7)] backdrop-blur-xl xl:rounded-[26px] xl:p-2">
              <ul className="grid grid-cols-3 divide-x divide-navy-900/10 rounded-[15px] bg-white/[0.88] p-1 backdrop-blur-xl xl:grid-cols-1 xl:divide-x-0 xl:divide-y xl:rounded-[20px] xl:px-5 xl:py-2">
                {infoRows.map((r) => (
                  <li
                    key={r.text}
                    className="flex flex-col items-center gap-1.5 px-1.5 py-2.5 text-center xl:flex-row xl:gap-4 xl:px-0 xl:py-4 xl:text-left"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700 ring-1 ring-inset ring-navy-100 xl:h-12 xl:w-12 xl:rounded-xl">
                      <r.icon className="h-4 w-4 xl:h-6 xl:w-6" strokeWidth={1.9} aria-hidden />
                    </span>
                    <span className="text-[0.75rem] font-semibold leading-snug text-navy-900 min-[400px]:text-[0.8125rem] xl:text-[1rem]">{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
