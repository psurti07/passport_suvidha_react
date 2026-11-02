'use client';

import { useState } from 'react';
import { ArrowRight, Clock, ExternalLink, MapPin, Navigation, Search } from 'lucide-react-redesign';
import { site } from '@/lib/redesign/data/site';
import { OFFICIAL_PORTAL_URL } from '@/lib/redesign/data/requirements';
import { useForm } from '@/lib/redesign/hooks/useForm';
import { cityOrPin, required } from '@/lib/redesign/utils/validation';
import { searchOffices, type PassportOffice, type SubmitResult } from '@/lib/redesign/services/formsService';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { EmptyState } from '@/components/redesign/common/EmptyState';
import { TextField } from '@/components/redesign/forms/Field';
import { FormStatus } from '@/components/redesign/forms/FormStatus';
import { ServiceCard } from '@/components/redesign/services/ServiceCard';
import { services } from '@/lib/redesign/data/services';

const crumbs = [{ label: 'Locations' }];

function OfficeSearch() {
  const [result, setResult] = useState<SubmitResult<PassportOffice[]> | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm({ query: '' }, { query: [required('Enter a city or PIN code.'), cityOrPin()] });

  const onSubmit = form.handleSubmit(async ({ query }) => {
    setLoading(true);
    setResult(null);
    setResult(await searchOffices(query.trim()));
    setLoading(false);
  });

  return (
    <div className="rounded-2xl border border-line-200 bg-white p-6 shadow-md sm:p-8">
      <h2 id="search-title" className="text-h3">
        Find nearby passport offices
      </h2>
      <p className="mt-2 text-ink-500">Enter your city or 6-digit PIN code to find Passport Seva Kendras and Post Office PSKs near you.</p>
      <form ref={form.formRef} onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start">
        <TextField label="City or PIN code" placeholder="e.g. Surat or 395004" autoComplete="postal-code" required wrapperClassName="flex-1" {...form.field('query')} />
        <Button type="submit" size="md" className="sm:mt-[1.875rem]" disabled={loading} iconLeft={<Search className="h-4 w-4" />}>
          {loading ? 'Searching…' : 'Search'}
        </Button>
      </form>

      <div className="mt-6" aria-live="polite">
        {result?.kind === 'not-connected' && (
          <div className="space-y-4">
            <FormStatus result={result} />
            <Button href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" iconRight={<ExternalLink className="h-4 w-4" />}>
              Use the official PSK locator
            </Button>
          </div>
        )}
        {result?.kind === 'error' && <FormStatus result={result} />}
        {result?.kind === 'success' &&
          (result.data.length ? (
            <ul className="divide-y divide-line-200 rounded-xl border border-line-200">
              {result.data.map((o) => (
                <li key={o.id} className="flex items-start justify-between gap-4 p-4">
                  <div>
                    <p className="font-semibold text-ink-900">{o.name}</p>
                    <p className="mt-0.5 text-small text-ink-500">
                      {o.type} · {o.address}
                    </p>
                  </div>
                  {o.mapUrl && (
                    <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-small font-semibold text-navy-700 hover:underline">
                      Map
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState icon={<MapPin className="h-6 w-6" />} title="No passport offices found" description="Try a nearby city or a different PIN code." />
          ))}
      </div>
    </div>
  );
}

export default function LocationsPage() {

  const mapQuery = encodeURIComponent(`${site.address.lines.join(', ')}`);

  return (
    <>
      <PageHero
        tone="navy"
        breadcrumbs={crumbs}
        eyebrow="Locations"
        title="Find a passport office near you."
        description="Search for Passport Seva Kendras by city or PIN code — or visit our team at the Passport Suvidha office in Surat."
      />

      <section aria-labelledby="search-title" className="relative -mt-8 pb-16 lg:-mt-12 lg:pb-24">
        <div className="container-wide grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <OfficeSearch />
          </Reveal>

          <Reveal delay={100} className="overflow-hidden rounded-2xl border border-line-200 bg-white shadow-md">
            <div className="relative aspect-[16/10] bg-navy-50">
              <iframe
                title="Map showing the Passport Suvidha office in Surat"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-eyebrow uppercase text-ink-400">Our office</p>
              <h2 className="mt-2 text-h3">Passport Suvidha, {site.address.city}</h2>
              <ul className="mt-5 space-y-4 text-ink-700">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
                  <address className="not-italic">
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
                  <span>{site.hoursShort} · Sunday closed</span>
                </li>
              </ul>
              <Button href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-6" iconLeft={<Navigation className="h-4 w-4" />}>
                Get directions
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="soft" labelledBy="apply-title">
        <div className="container-wide">
          <SectionHeading
            id="apply-title"
            eyebrow="Apply for a passport"
            title="Choose your passport type and get started."
            action={
              <Button to="/apply-passport" iconRight={<ArrowRight className="h-4 w-4" />}>
                Apply Now
              </Button>
            }
          />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 80} className={i === 2 ? 'md:col-span-2 lg:col-span-1' : undefined}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
