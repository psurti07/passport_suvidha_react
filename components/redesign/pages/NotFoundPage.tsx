import { ArrowLeft } from 'lucide-react-redesign';
import { Link } from '@/lib/redesign/router';
import { Button } from '@/components/redesign/common/Button';
import { Stamp } from '@/components/redesign/common/Stamp';

export default function NotFoundPage() {
  const links = [
    { to: '/services', label: 'Services' },
    { to: '/requirements', label: 'Requirements' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];
  return (
    <section className="container-content grid min-h-[70vh] items-center gap-12 py-20 lg:grid-cols-[1fr_auto]">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-h1">This page isn’t on our itinerary.</h1>
        <p className="mt-5 max-w-lg text-body-lg text-ink-500">
          The page you’re looking for doesn’t exist or has moved. Try one of these instead:
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-flex h-10 items-center rounded-full border border-line-300 px-4 text-small font-semibold text-navy-700 hover:bg-navy-50">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button to="/" variant="secondary" className="mt-8" iconLeft={<ArrowLeft className="h-4 w-4" />}>
          Back to home
        </Button>
      </div>
      <Stamp className="hidden h-56 w-56 -rotate-12 text-navy-200 lg:grid" text="NOT FOUND • ERROR 404 • NOT FOUND • " />
    </section>
  );
}
