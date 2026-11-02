import { Link } from '@/lib/redesign/router';
import { services } from '@/lib/redesign/data/services';
import { BLOG_ENABLED } from '@/lib/redesign/config/content';
import { PageHero } from '@/components/redesign/common/PageHero';

const crumbs = [{ label: 'Site map' }];

const groups = [
  {
    title: 'Main pages',
    links: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About us' },
      { to: '/services', label: 'Services' },
      { to: '/requirements', label: 'Requirements' },
      { to: '/locations', label: 'Locations' },
      { to: '/testimonials', label: 'Customer stories' },
      ...(BLOG_ENABLED ? [{ to: '/blogs', label: 'Blog' }] : []),
    ],
  },
  { title: 'Services', links: services.map((s) => ({ to: `/services/${s.slug}`, label: s.name })) },
  {
    title: 'Applications',
    links: [
      { to: '/apply-passport', label: 'Apply now' },
      { to: '/check-application-status', label: 'Check status' },
      { to: '/feeCalculator', label: 'Fee calculator' },
      { to: '/signin', label: 'Sign in' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact us' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy-policy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms & Conditions' },
      { to: '/disclaimer', label: 'Disclaimer' },
      { to: '/refund-policy', label: 'Refund Policy' },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <>
      <PageHero
        tone="light"
        breadcrumbs={crumbs}
        eyebrow="Navigation"
        title="Site map"
        description="Every page on the Passport Suvidha website, in one place."
      />
      <div className="container-wide grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:py-16">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`sm-${g.title}`}>
            <h2 id={`sm-${g.title}`} className="text-eyebrow uppercase text-navy-500">
              {g.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="font-medium text-ink-900 hover:text-navy-700 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
