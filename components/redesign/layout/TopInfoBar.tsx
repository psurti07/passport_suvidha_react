import { Mail, Phone } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { SocialIcon } from '@/components/redesign/common/icons';

/**
 * Slim translucent information strip above the floating header: phone, hours,
 * email and social profiles. Sits over the hero photograph on the homepage
 * (absolute) and over navy elsewhere. The private-consultancy disclosure is shown
 * below the homepage hero (home/DisclosureStrip), in the footer and in the FAQ.
 */
export function TopInfoBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-[55] h-[var(--topbar-h)] border-b border-white/10 bg-navy-950/80 text-white backdrop-blur-sm lg:bg-navy-950/55">
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between gap-3 px-4 text-[0.75rem] sm:gap-5 sm:px-6 sm:text-[0.8125rem] lg:w-[94%] lg:px-2">
        {/* left: phone + hours (hours move to the right on phones) */}
        <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
          <a href={site.phone.href} className="flex items-center gap-2 font-medium text-white/90 transition-colors hover:text-gold-400">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            {site.phone.display}
          </a>
          <span aria-hidden className="hidden h-3.5 w-px bg-white/25 lg:block" />
          <span className="hidden text-white/75 lg:inline">Mon–Sat, 10 AM – 5 PM</span>
        </div>

        {/* right: email + verified social profiles */}
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-white/75 md:hidden">Mon–Sat, 10 AM – 5 PM</span>
          <a href={site.email.href} className="hidden items-center gap-2 whitespace-nowrap text-white/90 transition-colors hover:text-gold-400 xl:flex">
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {site.email.display}
          </a>
          <span aria-hidden className="hidden h-3.5 w-px bg-white/25 xl:block" />
          <ul className="hidden items-center gap-1 md:flex" aria-label="Social media">
            {site.socials.slice(0, 4).map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in a new tab)`}
                  className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:text-gold-400"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
