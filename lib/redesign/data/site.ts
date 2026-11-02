import { mediaCoverage } from './media';
import { BLOG_ENABLED } from '@/lib/redesign/config/content';
import type { NavLink, SiteStat } from '@/lib/redesign/types/site';
import { testimonials } from './testimonials';

/**
 * Verified business information — taken from the current passportsuvidha.com
 * (contact page, footer and disclaimer, audited Oct 2026).
 * Change values here; every component reads from this file.
 */
export const site = {
  name: 'Passport Suvidha',
  legalName: 'Boundless Passport Suvidha LLP',
  gstNumber: '24ABEFB9441P1Z1',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://passportsuvidha.com',
  description:
    'Guidance and assistance for Normal, Tatkal and Reissue passport applications across India.',
  phone: { display: '+91-6358292349', href: 'tel:+916358292349' },
  email: { display: 'support@passportsuvidha.com', href: 'mailto:support@passportsuvidha.com' },
  hours: [
    { days: 'Monday – Saturday', daysShort: 'Mon – Sat', time: '10:00 AM – 05:00 PM' },
    { days: 'Sunday', daysShort: 'Sun', time: 'Closed' },
  ],
  hoursShort: 'Mon–Sat, 10 AM – 5 PM IST',
  address: {
    lines: [
      'Second Floor, Shop No. 227, Unique Square',
      'Opp. Shubham K Mart, Singanpore Road',
      'Singanpore, Surat, Gujarat – 395004',
    ],
    city: 'Surat',
    region: 'Gujarat',
    postalCode: '395004',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Second+Floor+Shop+No+227+Unique+Square+Opposite+Shubham+K+Mart+Singanpore+Road+Singanpore+Surat+Gujarat+395004',
  },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61576865822872', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/passport_suvidha/', icon: 'instagram' },
    { label: 'X (Twitter)', href: 'https://x.com/pass_suvidha', icon: 'x' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/107625710/', icon: 'linkedin' },
    { label: 'YouTube', href: 'https://www.youtube.com/@PassportSuvidha', icon: 'youtube' },
    { label: 'Pinterest', href: 'https://www.pinterest.com/passportsuvidha/', icon: 'pinterest' },
  ],
} as const;

export type SocialIcon = (typeof site.socials)[number]['icon'];

/** Compliance notice. Wording mirrors the current site's notice and Disclaimer page. */
export const complianceNotice = {
  short:
    'Private consultancy, not affiliated with the Government of India. Our fee covers consultancy only — government fees are paid separately on the official portal.',
  /** Strip directly below the homepage hero (the full wording stays in the footer and the Important Notice) */
  homeStrip: 'Passport Suvidha is an independent private consultancy, not a Government website. Consultancy fees are charged separately.',
  /** Scrolling ticker below the header — based on the live site's own notice */
  ticker:
    'We are not authorised by any Government department. The fee paid on this platform is a consultancy fee only — no Government fee is collected by us. Government passport fees are paid separately on the official Passport Seva website.',
  full:
    'Passport Suvidha is a private, independent consultancy and facilitation service. It is not affiliated with, authorised by or endorsed by the Government of India, the Ministry of External Affairs, Passport Seva Kendra or the official Passport Seva portal. Fees charged by Passport Suvidha are for consultancy services only. Government passport fees are separate and are paid directly on the official government website. Passport approval, verification, issuance and delivery are carried out solely by the government authorities.',
};

/** Order and labels follow the original site's navigation. `wideOnly` items show from 1280px up. */
export const mainNav: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'Normal Passport', to: '/services/normal-passport', description: 'For planned travel' },
      { label: 'Tatkal Passport', to: '/services/tatkal-passport', description: 'For urgent travel needs' },
      { label: 'Reissue Passport', to: '/services/reissue-passport', description: 'Renew or update your details' },
    ],
  },
  { label: 'Requirements', to: '/requirements' },
  { label: 'Locations', to: '/locations' },
  ...(BLOG_ENABLED ? [{ label: 'Blog', to: '/blogs', wideOnly: true }] : []),
  { label: 'Contact', to: '/contact', wideOnly: true },
];

export const footerNav = {
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Customer Stories', to: '/testimonials' },
    ...(BLOG_ENABLED ? [{ label: 'Blog', to: '/blogs' }] : []),
    { label: 'Locations', to: '/locations' },
  ],
  services: [
    { label: 'Normal Passport', to: '/services/normal-passport' },
    { label: 'Tatkal Passport', to: '/services/tatkal-passport' },
    { label: 'Reissue Passport', to: '/services/reissue-passport' },
    { label: 'Requirements', to: '/requirements' },
  ],
  support: [
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Check Status', to: '/check-application-status' },
    { label: 'Fee Calculator', to: '/feeCalculator' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Disclaimer', to: '/disclaimer' },
    { label: 'Refund Policy', to: '/refund-policy' },
    { label: 'Site Map', to: '/site-map' },
  ],
};

export { mediaCoverage } from './media';
export type { MediaArticle } from './media';

/**
 * Headline statistics.
 * PLACEHOLDER: the current site shows conflicting figures (1.2K+ / 2000+ / 5k+
 * passports; 12 months / 2+ years / "established 1998"). Keep `verified: false`
 * until the client confirms one set — the UI then shows a "To be confirmed" marker.
 */
export const siteStats: SiteStat[] = [
  { id: 'processed', value: '1,200+', label: 'Passport applications assisted', verified: false },
  { id: 'satisfaction', value: '98%', label: 'Customer satisfaction', verified: false },
  { id: 'media', value: String(mediaCoverage.length), label: 'Published media features', verified: true },
  {
    id: 'states',
    value: String(new Set(testimonials.map((t) => t.state)).size),
    label: 'States & UTs in our featured customer stories',
    verified: true,
  },
];
