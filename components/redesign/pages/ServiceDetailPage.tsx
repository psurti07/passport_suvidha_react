'use client';

import { useState } from 'react';
import { useParams } from '@/lib/redesign/router';
import { ArrowRight, Check, ExternalLink, FileCheck2, Headset, CalendarCheck, PenLine, Phone } from 'lucide-react-redesign';
import { getServiceBySlug, services } from '@/lib/redesign/data/services';
import { getRequirementSet, OFFICIAL_PORTAL_URL } from '@/lib/redesign/data/requirements';
import { site } from '@/lib/redesign/data/site';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { Badge, PlaceholderMarker } from '@/components/redesign/common/Badge';
import { Accordion } from '@/components/redesign/common/Accordion';
import { Tabs } from '@/components/redesign/common/Tabs';
import { ServiceIcon } from '@/components/redesign/common/icons';
import { ServiceCard } from '@/components/redesign/services/ServiceCard';
import { RequirementChecklist } from '@/components/redesign/services/RequirementChecklist';
import { HowItWorks } from '@/components/redesign/home/HowItWorks';
import { FinalCta } from '@/components/redesign/home/FinalCta';
import NotFoundPage from '@/components/redesign/pages/NotFoundPage';

const benefitIcons = [FileCheck2, PenLine, CalendarCheck, Headset];

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const service = getServiceBySlug(slug);
  const [reqTab, setReqTab] = useState<string>(service?.detail.requirementSets[0] ?? 'fresh');

  const crumbs = [{ label: 'Services', to: '/services' }, { label: service?.name ?? 'Not found' }];

  if (!service) return <NotFoundPage />;
  const { detail } = service;
  const others = services.filter((s) => s.slug !== service.slug);

  const glance = (
    <div className="overflow-hidden rounded-2xl border border-line-200 bg-white shadow-md">
      <div className="flex items-center gap-4 border-b border-line-200 px-6 py-5">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-700 text-gold-400">
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </span>
        <div>
          <p className="text-eyebrow uppercase text-ink-400">At a glance</p>
          <p className="font-semibold text-ink-900">{service.name}</p>
        </div>
        {service.isUrgent && <Badge tone="gold" className="ml-auto">Urgent</Badge>}
      </div>
      <dl className="divide-y divide-dashed divide-line-300 px-6 text-small">
        {service.facts.map((f) => (
          <div key={f.label} className="flex justify-between gap-4 py-3.5">
            <dt className="text-ink-500">{f.label}</dt>
            <dd className="font-semibold text-ink-900">{f.value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 py-3.5">
          <dt className="text-ink-500">Consultancy fee</dt>
          <dd>
            <PlaceholderMarker />
          </dd>
        </div>
        <div className="flex justify-between gap-4 py-3.5">
          <dt className="text-ink-500">Government fee</dt>
          <dd className="text-right font-semibold text-ink-900">Paid separately on the official portal</dd>
        </div>
      </dl>
    </div>
  );

  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        eyebrow={service.tagline}
        title={`${service.name} assistance`}
        description={detail.overview[0]}
        aside={glance}
        actions={
          <>
            <Button to={`/apply-passport?service=${service.slug}`} size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
              Apply Now
            </Button>
            <Button href={site.phone.href} size="lg" variant="outline" iconLeft={<Phone className="h-5 w-5" />}>
              Call us
            </Button>
          </>
        }
      />

      <Section labelledBy="overview-title">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading id="overview-title" eyebrow="Overview" title={`How we help with your ${service.name.toLowerCase()} application.`} className="!mb-8" />
            <Reveal className="space-y-5 text-body-lg text-ink-500">
              {detail.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="self-start rounded-2xl bg-paper-warm p-6">
            <h3 className="text-h3">Best for</h3>
            <ul className="mt-5 space-y-4">
              {detail.bestFor.map((b) => (
                <li key={b} className="flex gap-3 text-ink-700">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-700 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="brand" labelledBy="benefits-title">
        <div className="container-wide">
          <SectionHeading id="benefits-title" eyebrow="What’s included" title="Our assistance covers every step." align="center" onDark />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {detail.benefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <Reveal as="li" key={b.title} delay={i * 70} className="rounded-2xl border border-line-200 bg-white p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-50 text-navy-700">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-[1.125rem] font-semibold text-ink-900">{b.title}</h3>
                  <p className="mt-2 text-ink-500">{b.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section labelledBy="req-title">
        <div className="container-wide grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              id="req-title"
              eyebrow="Requirements"
              title="Documents to keep ready."
              description="Requirements are set by the passport authorities and can change. Always confirm on the official Passport Seva portal."
              className="!mb-8"
            />
            <div className="flex flex-col items-start gap-3">
              <Button to="/requirements" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>
                All requirements
              </Button>
              <Button href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" variant="link" iconRight={<ExternalLink className="h-4 w-4" />}>
                Official Passport Seva portal
              </Button>
            </div>
          </div>
          <Reveal>
            {detail.requirementSets.length > 1 ? (
              <Tabs
                label="Requirement checklists"
                value={reqTab}
                onChange={setReqTab}
                items={detail.requirementSets.map((id) => {
                  const set = getRequirementSet(id);
                  return { id, label: set.title, content: <RequirementChecklist set={set} /> };
                })}
              />
            ) : (
              <RequirementChecklist set={getRequirementSet(detail.requirementSets[0])} />
            )}
          </Reveal>
        </div>
      </Section>

      <HowItWorks />

      <Section labelledBy="detail-faq-title">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="detail-faq-title" eyebrow="FAQ" title={`${service.name} questions.`} className="!mb-0" />
          <Reveal>
            <Accordion items={detail.faqs.map((f) => ({ id: f.id, title: f.question, content: <p>{f.answer}</p> }))} defaultOpen={[detail.faqs[0].id]} />
          </Reveal>
        </div>
      </Section>

      <Section tone="soft" labelledBy="other-title">
        <div className="container-wide">
          <SectionHeading id="other-title" eyebrow="Other services" title="Looking for something else?" />
          <ul className="grid gap-5 md:grid-cols-2">
            {others.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <div className="pt-14 lg:pt-20">
        <FinalCta />
      </div>
    </>
  );
}
