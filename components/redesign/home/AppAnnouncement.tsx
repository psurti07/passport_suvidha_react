import { BellRing, Smartphone } from 'lucide-react-redesign';
import { isStoreLive, MOBILE_APP } from '@/lib/redesign/config/mobileApp';
import { Section } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Guilloche } from '@/components/redesign/common/Guilloche';

/* Store marks from Simple Icons (CC0-1.0). Used only to name the stores. */
function GooglePlayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill="currentColor">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  );
}
function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

const stores = [
  { id: 'google-play', name: 'Google Play', liveLabel: 'Get it on', url: () => MOBILE_APP.googlePlayUrl, Mark: GooglePlayMark },
  { id: 'app-store', name: 'App Store', liveLabel: 'Download on the', url: () => MOBILE_APP.appStoreUrl, Mark: AppleMark },
];

/**
 * Store indicator. While the app is not published it is plain, non-interactive
 * text marked "Coming soon" — it never looks like a working download button.
 * Once MOBILE_APP.status is 'live' and the store URL is set, it becomes a link.
 */
function StoreIndicator({ store }: { store: (typeof stores)[number] }) {
  const url = store.url();
  const live = isStoreLive(url);
  const { Mark } = store;

  if (live) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-full items-center gap-3 rounded-xl bg-navy-900 px-4 sm:w-auto sm:min-w-[11.5rem] text-white shadow-sm transition-colors hover:bg-navy-800"
      >
        <Mark className="h-6 w-6 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[0.6875rem] text-white/75">{store.liveLabel}</span>
          <span className="block text-[1.0625rem] font-semibold">{store.name}</span>
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <div className="flex h-14 w-full items-center gap-2.5 rounded-xl border border-dashed border-navy-300/70 bg-white px-3.5 text-navy-900 sm:w-auto sm:min-w-[11.5rem] sm:gap-3 sm:px-4">
      <Mark className="h-5 w-5 shrink-0 text-navy-700 sm:h-6 sm:w-6" />
      <span className="text-left leading-tight">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-gold-700">Coming soon</span>
        <span className="block whitespace-nowrap text-[0.9375rem] font-semibold sm:text-[1.0625rem]">{store.name}</span>
      </span>
    </div>
  );
}

/** Decorative phone showing a branded launch screen — no app screenshots or features are implied. */
function PhoneVisual() {
  return (
    <div aria-hidden className="relative mx-auto w-[180px] sm:w-[220px] lg:w-[240px]">
      <div className="absolute -inset-10 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="relative rounded-[40px] bg-navy-950 p-2.5 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.65)] ring-1 ring-white/15">
        {/* side buttons */}
        <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-navy-800" />
        <span className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-navy-800" />
        <span className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-navy-800" />
        <div className="relative aspect-[9/19] overflow-hidden rounded-[31px] bg-gradient-to-b from-navy-700 via-navy-800 to-navy-950">
          <span className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-navy-950" />
          <Guilloche size={300} className="absolute left-1/2 top-[38%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 text-gold-400/[0.12]" strokeWidth={0.6} />
          <div className="relative flex h-full flex-col items-center px-3 pt-[34%] text-center lg:justify-center lg:pt-0">
            <span className="grid h-16 w-16 place-items-center rounded-[20px] bg-white shadow-lg sm:h-20 sm:w-20 sm:rounded-[22px]">
              <img src="/assets/brand/logo-mark.png" alt="" width={177} height={260} className="h-10 w-auto sm:h-12" />
            </span>
            <span className="mt-4 whitespace-nowrap text-[1rem] font-bold leading-tight text-white sm:mt-5 sm:text-[1.125rem]">Passport Suvidha</span>
            <span className="mt-1 whitespace-nowrap text-[0.6875rem] font-medium text-navy-100/80 sm:text-[0.75rem]">Passport assistance app</span>
            <span className="mt-5 inline-flex lg:mt-8 items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-navy-900">
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Homepage announcement for the upcoming mobile app. Controlled by
 * src/config/mobileApp.ts (visibility, launch status and store URLs).
 */
export function AppAnnouncement() {
  if (!MOBILE_APP.visible) return null;
  const anyLive = stores.some((s) => isStoreLive(s.url()));

  return (
    <Section id="mobile-app" tone="alt" labelledBy="app-title" compact>
      <div className="container-wide">
        <Reveal className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-line-200">
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="p-6 sm:p-10 lg:py-14 lg:pl-14 lg:pr-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-gold-100 py-1 pl-1 pr-3 text-[0.75rem] font-semibold text-gold-700 ring-1 ring-inset ring-gold-400/50">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-400 text-navy-900">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden />
                </span>
                {anyLive ? 'Mobile app now available' : 'Mobile app · Coming soon'}
              </p>

              <h2 id="app-title" className="mt-5 text-h2 text-ink-900">
                <span className="whitespace-nowrap">Passport Suvidha —</span>{' '}
                <span className="block text-navy-700">Coming Soon on Your Phone!</span>
              </h2>
              <p className="mt-3 max-w-xl text-body-lg text-ink-500">Your passport assistance experience is getting even easier.</p>

              <p className="mt-5 flex items-center gap-2.5 text-[0.9375rem] font-semibold text-navy-900">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-navy-50 text-navy-700 ring-1 ring-inset ring-navy-100">
                  <BellRing className="h-4 w-4" aria-hidden />
                </span>
                Launching Soon on Google Play &amp; App Store.
              </p>

              <ul className="mt-7 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap" aria-label="App stores">
                {stores.map((s) => (
                  <li key={s.id}>
                    <StoreIndicator store={s} />
                  </li>
                ))}
              </ul>
              {!anyLive && (
                <p className="mt-4 text-small text-ink-400">Download links will be added here as soon as the app is published.</p>
              )}
            </div>

            <div className="relative flex h-[300px] items-start justify-center overflow-hidden bg-navy-900 px-6 pt-10 sm:h-[380px] sm:pt-12 lg:h-auto lg:items-end lg:pt-14">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgb(26_94_153/0.55),transparent_60%)]" />
              <div className="relative -mb-28 sm:-mb-36 lg:-mb-20">
                <PhoneVisual />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
