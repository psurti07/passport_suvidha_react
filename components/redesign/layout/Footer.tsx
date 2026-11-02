'use client';

import { Link } from '@/lib/redesign/router';
import { Clock, Mail, MapPin, Phone } from 'lucide-react-redesign';
import { complianceNotice, footerNav, site } from '@/lib/redesign/data/site';
import { SocialIcon } from '@/components/redesign/common/icons';
import { EmailText } from '@/components/redesign/common/EmailText';
import { SmartLink } from '@/components/redesign/common/SmartLink';
import { HOME_SECTIONS, HOMEPAGE_PREVIEW_MODE } from '@/lib/redesign/config/preview';
import { Guilloche } from '@/components/redesign/common/Guilloche';

function FooterColumn({ title, links, note }: { title: string; links: Array<{ label: string; to: string }>; note?: string }) {
  return (
    <div>
      <h2 className="text-eyebrow uppercase text-gold-400">{title}</h2>
      <ul className="mt-3 space-y-0.5">
        {links.map((l) => (
          <li key={l.to}>
            {/* Preview mode: anchors to homepage sections, or a dimmed label for pages not yet published */}
            <SmartLink to={l.to} className="inline-block py-2 text-[0.9375rem] text-navy-100 transition-colors hover:text-white" disabledClassName="!opacity-45">
              {l.label}
            </SmartLink>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-[0.75rem] leading-snug text-navy-300">{note}</p>}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <Guilloche size={720} className="pointer-events-none absolute -right-60 -top-72 text-white/[0.04]" strokeWidth={0.8} />

      <div className="container-wide relative pb-28 pt-12 lg:pb-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            {/* Placeholder: full-colour logo on a white plate until an official reversed logo is supplied */}
            <Link to="/" className="inline-flex rounded-lg bg-white px-4 py-3" aria-label="Passport Suvidha — home">
              <img src="/assets/brand/logo.png" alt="Passport Suvidha" width={728} height={268} loading="lazy" className="h-10 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-navy-200">
              Guidance and assistance for Normal, Tatkal and Reissue passport applications for Indian citizens.
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Social media">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-navy-100 transition-[color,border-color,transform] duration-base hover:-translate-y-0.5 hover:border-gold-400 hover:text-gold-400"
                  >
                    <SocialIcon name={s.icon} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-8">
            <FooterColumn title="Company" links={footerNav.company} />
            <FooterColumn title="Services" links={footerNav.services} />
            <FooterColumn title="Support" links={footerNav.support} />
            <FooterColumn
              title="Legal"
              links={footerNav.legal}
              note={HOMEPAGE_PREVIEW_MODE ? 'Full legal pages are published with the complete website. The disclaimer is below.' : undefined}
            />
          </nav>
        </div>

        {/* Contact band */}
        <address className="mt-10 grid gap-5 rounded-2xl bg-white/[0.04] p-5 not-italic ring-1 ring-inset ring-white/10 sm:grid-cols-2 sm:p-6 lg:grid-cols-[auto_auto_1fr_auto] lg:gap-8">
          <a href={site.phone.href} className="flex items-start gap-3 text-[0.9375rem] font-semibold text-white hover:text-gold-400">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
            {site.phone.display}
          </a>
          <a href={site.email.href} className="flex min-w-0 items-start gap-3 text-[0.9375rem] text-white hover:text-gold-400">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
            <EmailText email={site.email.display} className="min-w-0" />
          </a>
          <a
            href={site.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-navy-100 hover:text-white"
          >
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
            <span>{site.address.lines.join(', ')}</span>
          </a>
          <p className="flex items-start gap-3 text-[0.9375rem] text-navy-100">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
            {site.hoursShort}
          </p>
        </address>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p id={HOME_SECTIONS.disclaimer} className="max-w-4xl scroll-mt-32 text-[0.8125rem] leading-relaxed text-navy-300">
            <strong className="font-semibold text-navy-100">Disclaimer: </strong>
            {complianceNotice.full}
          </p>
          <div className="mt-5 flex flex-col gap-2 text-[0.8125rem] text-navy-300 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <p>GSTIN: {site.gstNumber}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
