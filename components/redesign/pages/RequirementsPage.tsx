'use client';

import { useSearchParams } from '@/lib/redesign/router';
import { ArrowRight, Calculator, ExternalLink, Info, Landmark, Lightbulb, Printer, ReceiptText } from 'lucide-react-redesign';
import { formInformation, formTips, OFFICIAL_PORTAL_URL, requirementSets } from '@/lib/redesign/data/requirements';
import { PageHero } from '@/components/redesign/common/PageHero';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Button } from '@/components/redesign/common/Button';
import { PlaceholderMarker } from '@/components/redesign/common/Badge';
import { Tabs } from '@/components/redesign/common/Tabs';
import { RequirementChecklist } from '@/components/redesign/services/RequirementChecklist';
import { FinalCta } from '@/components/redesign/home/FinalCta';

const crumbs = [{ label: 'Requirements' }];

export default function RequirementsPage() {
  const [params, setParams] = useSearchParams();
  const active = requirementSets.some((r) => r.id === params.get('type')) ? params.get('type')! : 'fresh';


  return (
    <>
      <PageHero
        breadcrumbs={crumbs}
        eyebrow="Requirements"
        title="Documents you’ll need for your passport."
        description="Choose your application type for a checklist you can tick off as you go. Requirements are set by the passport authorities and may change — always confirm on the official portal."
      >
        <div className="mt-8 flex items-start gap-3 rounded-lg border border-line-200 bg-white p-4 text-small text-ink-700 sm:max-w-2xl">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
          <p>
            This checklist is for guidance. The final list of documents is decided by the Passport Seva authorities.{' '}
            <a href={OFFICIAL_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-700 underline">
              Visit the official portal
            </a>
            .
          </p>
        </div>
      </PageHero>

      <Section labelledBy="checklist-title">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
              <h2 id="checklist-title" className="text-h2">
                Document checklist
              </h2>
              <Button variant="outline" size="sm" onClick={() => window.print()} iconLeft={<Printer className="h-4 w-4" />} className="print:hidden">
                Print
              </Button>
            </div>
            <p className="mb-8 text-ink-500">Tick items off as you gather them. Nothing you tick is saved or sent.</p>
            <Tabs
              label="Application type"
              value={active}
              onChange={(id) => setParams({ type: id }, { replace: true })}
              items={requirementSets.map((set) => ({ id: set.id, label: set.title, content: <RequirementChecklist set={set} interactive /> }))}
            />
          </div>

          <aside className="space-y-5 lg:pt-[4.5rem]" aria-label="Form preparation">
            <Reveal className="rounded-2xl border border-line-200 bg-white p-6">
              <h3 className="text-[1.125rem] font-semibold text-ink-900">Information for the form</h3>
              <ul className="mt-4 space-y-3 text-ink-700">
                {formInformation.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} className="rounded-2xl bg-navy-700 p-6 text-navy-100">
              <p className="flex items-center gap-2 font-semibold text-white">
                <Lightbulb className="h-5 w-5 text-gold-400" aria-hidden /> Tips for form filling
              </p>
              <ul className="mt-4 space-y-3">
                {formTips.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section tone="alt" labelledBy="fees-title">
        <div className="container-wide">
          <SectionHeading
            id="fees-title"
            eyebrow="Fees"
            title="Two separate fees — kept clearly apart."
            description="Your passport application involves the government’s fee and, if you use our service, our consultancy fee. They are paid separately."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal className="flex flex-col rounded-2xl border border-line-200 bg-white p-6">
              <Landmark className="h-7 w-7 text-navy-700" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-h3">Government passport fee</h3>
              <p className="mt-3 text-ink-500">
                Set by the Government of India and paid directly on the official Passport Seva portal. Tatkal applications carry higher
                government fees than Normal applications.
              </p>
              <Button
                href={OFFICIAL_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="link"
                className="mt-auto self-start pt-6"
                iconRight={<ExternalLink className="h-4 w-4" />}
              >
                Check official fees
              </Button>
            </Reveal>
            <Reveal delay={80} className="flex flex-col rounded-2xl border border-line-200 bg-white p-6">
              <ReceiptText className="h-7 w-7 text-navy-700" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 flex flex-wrap items-center gap-3 text-h3">
                Our consultancy fee <PlaceholderMarker />
              </h3>
              <p className="mt-3 text-ink-500">
                A fee for our guidance and assistance only. It does not include any government fee and does not give priority or faster
                processing.
              </p>
              <Button to="/feeCalculator" variant="link" className="mt-auto self-start pt-6" iconRight={<Calculator className="h-4 w-4" />}>
                Fee calculator
              </Button>
            </Reveal>
          </div>
          <Reveal className="mt-10 flex justify-center">
            <Button to="/apply-passport" size="lg" iconRight={<ArrowRight className="h-5 w-5" />}>
              Start your application
            </Button>
          </Reveal>
        </div>
      </Section>

      <div className="pt-14 lg:pt-20">
        <FinalCta />
      </div>
    </>
  );
}
