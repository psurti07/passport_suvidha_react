'use client';

import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from '@/lib/redesign/router';
import { BadgeCheck, Building2, CheckCircle2, Info, Mail, Phone, ReceiptText } from 'lucide-react-redesign';
import { complianceNotice, site } from '@/lib/redesign/data/site';
import { getRequirementSet } from '@/lib/redesign/data/requirements';
import { useApplyWizard, type EditSection } from '@/lib/redesign/hooks/useApplyWizard';
import { APPLY_CONTENT } from '@/lib/redesign/config/applyContent';
import type { ApplyStepId } from '@/lib/redesign/config/applyFlow';
import { Breadcrumbs } from '@/components/redesign/common/Breadcrumbs';
import { EmailText } from '@/components/redesign/common/EmailText';
import { Guilloche } from '@/components/redesign/common/Guilloche';
import { ApplyProgress } from '@/components/redesign/apply/ApplyProgress';
import { TestModeIndicator } from '@/components/redesign/apply/TestModeIndicator';
import { BasicStep } from '@/components/redesign/apply/steps/BasicStep';
import { VerifyStep } from '@/components/redesign/apply/steps/VerifyStep';
import { FamilyStep } from '@/components/redesign/apply/steps/FamilyStep';
import { PersonalStep } from '@/components/redesign/apply/steps/PersonalStep';
import { ReviewStep } from '@/components/redesign/apply/steps/ReviewStep';
import { TestimonialsSection } from '@/components/redesign/home/TestimonialsSection';
import { VideoReviews } from '@/components/redesign/home/VideoReviews';
import type { PassportType } from '@/lib/redesign/types/application';

const crumbs = [{ label: 'Apply now' }];
const { page, trust, edit, review } = APPLY_CONTENT;
const isSection = (id: ApplyStepId): id is EditSection => id === 'basic' || id === 'family' || id === 'personal';

/** Same facts as the homepage trust bar: registration, office and fee model. */
const facts = [
  { icon: BadgeCheck, text: `Registered as ${site.legalName}` },
  { icon: Building2, text: `Office in ${site.address.city}, ${site.address.region}` },
  { icon: ReceiptText, text: 'Consultancy fee only — govt. fees paid separately' },
];

/** ?service=… from service pages preselects Tatkal; everything else starts on Normal. */
const passportTypeFromQuery = (service: string | null): PassportType => (service === 'tatkal-passport' ? 'tatkal' : 'normal');

export default function ApplyPage() {
  const [params] = useSearchParams();
  const wizard = useApplyWizard({ passportType: passportTypeFromQuery(params.get('service')) });
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const onReview = wizard.step === 'review';
  const editing = wizard.editing;

  // Bring the form back into view when the step changes (not on first load)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.4) cardRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [wizard.step]);

  /*
   * Browser Back / Forward move between steps (same URL; only the step is kept in history,
   * never any form data). The wizard's rules still decide what may open: from an edit, Back
   * cancels it; once review has been reached, earlier steps open as edits; locked steps stay
   * locked. A refresh starts over, as the application is held in memory only.
   */
  const historyStep = useRef<ApplyStepId | null>(null);
  useEffect(() => {
    if (historyStep.current === null) window.history.replaceState({ ...window.history.state, psStep: wizard.step }, '');
    else if (historyStep.current !== wizard.step) window.history.pushState({ ...window.history.state, psStep: wizard.step }, '');
    historyStep.current = wizard.step;
  }, [wizard.step]);

  const { startEdit, cancelEdit, goTo, reachedReview } = wizard;
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const target = e.state?.psStep as ApplyStepId | undefined;
      if (!target || target === historyStep.current) return;
      historyStep.current = target;
      if (editing) {
        if (target === 'review') cancelEdit();
      } else if (reachedReview && isSection(target)) startEdit(target);
      else if (!reachedReview || target === 'review') goTo(target);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [editing, reachedReview, startEdit, cancelEdit, goTo]);

  // Warn before leaving with unsent details (they are kept in memory only)
  const { fullName, email, mobile } = wizard.data.basic;
  const dirty = !!(fullName || email || mobile);
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    // In-site links change page without a browser unload, so ask here too
    const confirmLeave = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || !a.href.startsWith(window.location.origin)) return;
      if (new URL(a.href).pathname === window.location.pathname) return;
      if (!window.confirm('Leave this page? The application details you entered will be lost.')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('beforeunload', warn);
    document.addEventListener('click', confirmLeave, true);
    return () => {
      window.removeEventListener('beforeunload', warn);
      document.removeEventListener('click', confirmLeave, true);
    };
  }, [dirty]);

  const checklist = getRequirementSet('fresh');
  const selection = `${wizard.data.basic.passportType === 'tatkal' ? 'Tatkal' : 'Normal'} passport · ${wizard.data.basic.bookSize} pages`;
  const showIntro = wizard.step === 'basic' && !editing;
  const showTrust = trust.showOn.includes(wizard.step) && !editing;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-paper-alt">
        <Guilloche size={760} className="absolute -right-64 -top-72 -z-10 text-navy-700/[0.06]" strokeWidth={0.7} />
        <div className="container-wide pb-14 pt-6 lg:pb-20 lg:pt-8">
          <Breadcrumbs items={crumbs} />

          <div className="mt-4 lg:mt-5">
            <h1 className="text-[1.625rem] font-bold leading-tight tracking-tight text-ink-900 sm:text-[2rem]">{page.title}</h1>
            {showIntro && <p className="mt-1.5 text-[0.9375rem] text-ink-500">{page.description}</p>}
            {showIntro && page.showFacts && (
              <ul className="mt-3.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {facts.map((f) => (
                  <li key={f.text} className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink-700">
                    <f.icon className="h-4 w-4 shrink-0 text-navy-700" strokeWidth={1.75} aria-hidden />
                    {f.text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={onReview ? 'mt-5 lg:mt-6' : 'mt-5 grid items-start gap-5 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-7'}>
            <div ref={cardRef} className="scroll-mt-24 rounded-2xl border border-line-200 bg-white shadow-sm">
              <div className="border-b border-line-200 px-4 py-4 sm:px-7 sm:pb-4 sm:pt-5">
                <ApplyProgress
                  current={wizard.step}
                  furthest={wizard.furthest}
                  canOpen={(id) => id !== 'verify' && (id === 'basic' || wizard.isVerified)}
                  // Once review has been reached, earlier steps open as edits that return to it
                  onSelect={editing ? undefined : (id) => (reachedReview && isSection(id) ? startEdit(id) : goTo(id))}
                />
              </div>
              <div className="px-4 py-5 sm:px-7 sm:py-6">
                {editing && (
                  <p role="status" className="mb-5 flex items-start gap-2 rounded-lg border border-navy-100 bg-navy-50/70 px-3.5 py-2.5 text-small text-ink-700">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden />
                    {wizard.editDependency ? edit.dependencyNotice : edit.notice(review.sections[editing].title)}
                  </p>
                )}
                {wizard.step === 'basic' && <BasicStep key="basic" wizard={wizard} focusOnMount={wizard.furthest > 0} />}
                {wizard.step === 'verify' && <VerifyStep key="verify" wizard={wizard} />}
                {wizard.step === 'family' && <FamilyStep key="family" wizard={wizard} />}
                {wizard.step === 'personal' && <PersonalStep key="personal" wizard={wizard} />}
                {wizard.step === 'review' && <ReviewStep key="review" wizard={wizard} />}
              </div>
            </div>

            {!onReview && (
              <aside className="space-y-4 lg:sticky lg:top-28" aria-label="Application help">
                <div className="rounded-2xl border border-line-200 bg-white p-5">
                  <p className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-navy-700">Your selection</p>
                  <p className="mt-1.5 flex items-center gap-2 font-semibold text-ink-900">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-navy-700" aria-hidden />
                    {selection}
                  </p>
                  <div className="mt-4 border-t border-line-200 pt-4">
                    <p className="font-semibold text-ink-900">Need help?</p>
                    <ul className="mt-2 space-y-1.5 text-small">
                      <li>
                        <a href={site.phone.href} className="inline-flex items-center gap-2 font-medium text-navy-700 hover:underline">
                          <Phone className="h-4 w-4 shrink-0" aria-hidden />
                          {site.phone.display}
                        </a>
                      </li>
                      <li>
                        <a href={site.email.href} className="inline-flex min-w-0 items-center gap-2 font-medium text-navy-700 hover:underline">
                          <Mail className="h-4 w-4 shrink-0" aria-hidden />
                          <EmailText email={site.email.display} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl bg-navy-700 p-5 text-navy-100">
                  <p className="font-semibold text-white">Keep these ready</p>
                  <ul className="mt-3 space-y-2 text-small">
                    {checklist.items.map((i) => (
                      <li key={i.label} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                        <span>
                          {i.label}
                          {i.note && <span className="text-navy-100/80"> — {i.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/requirements" className="mt-3 inline-block text-small font-semibold text-gold-400 hover:underline">
                    Full requirements →
                  </Link>
                </div>

                <p className="flex gap-2.5 px-1 text-[0.8125rem] leading-relaxed text-ink-500">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden />
                  {complianceNotice.short}
                </p>
              </aside>
            )}
          </div>
          {/* Phones: in the page flow, so it never covers form fields */}
          <TestModeIndicator className="mt-4 lg:hidden" />
        </div>
      </section>

      {/* The homepage's own sections, below the application so they never interrupt the form */}
      {showTrust && trust.showTestimonials && <TestimonialsSection showAllLink={false} />}
      {showTrust && trust.showReels && <VideoReviews />}

      <TestModeIndicator className="fixed bottom-5 left-5 z-30 hidden lg:block" />
    </>
  );
}
