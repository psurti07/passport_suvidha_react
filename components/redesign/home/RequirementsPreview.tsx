'use client';

import { useState } from 'react';
import { ExternalLink, Landmark, ReceiptText } from 'lucide-react-redesign';
import { OFFICIAL_PORTAL_URL, requirementSets } from '@/lib/redesign/data/requirements';
import { HOME_SECTIONS } from '@/lib/redesign/config/preview';
import { Section, SectionHeading } from '@/components/redesign/common/Section';
import { Reveal } from '@/components/redesign/common/Reveal';
import { Tabs } from '@/components/redesign/common/Tabs';
import { RequirementChecklist } from '@/components/redesign/services/RequirementChecklist';

/** Compact homepage version of the Requirements page (same data: src/data/requirements.ts). */
export function RequirementsPreview() {
  const [tab, setTab] = useState('fresh');
  return (
    <Section id={HOME_SECTIONS.requirements} tone="alt" labelledBy="req-home-title">
      <div className="container-wide grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="min-w-0">
          <SectionHeading
            id="req-home-title"
            eyebrow="Requirements"
            title="Documents to keep ready."
            description="Choose your application type and tick items off as you gather them. The final list is set by the passport authorities — always confirm on the official portal."
            className="!mb-6"
          />
          <Reveal className="space-y-3">
            <div className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line-200">
              <Landmark className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
              <div>
                <p className="font-semibold text-ink-900">Government passport fee</p>
                <p className="mt-1 text-[0.9375rem] text-ink-500">Set by the Government of India and paid directly on the official Passport Seva portal.</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line-200">
              <ReceiptText className="mt-0.5 h-5 w-5 shrink-0 text-navy-700" aria-hidden />
              <div>
                <p className="font-semibold text-ink-900">Our consultancy fee</p>
                <p className="mt-1 text-[0.9375rem] text-ink-500">Covers our guidance and assistance only — it is separate from the government fee.</p>
              </div>
            </div>
            <a
              href={OFFICIAL_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 pt-2 text-[0.9375rem] font-semibold text-navy-700 hover:underline"
            >
              Official Passport Seva portal <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
        </div>

        <Reveal delay={100} className="min-w-0">
          <Tabs
            label="Application type"
            value={tab}
            onChange={setTab}
            items={requirementSets.map((set) => ({ id: set.id, label: set.title, content: <RequirementChecklist set={set} interactive /> }))}
          />
        </Reveal>
      </div>
    </Section>
  );
}
