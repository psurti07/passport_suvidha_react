'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, CreditCard, Info, Loader2, Phone, ShieldCheck, UserRound, Users, MapPin } from 'lucide-react-redesign';
import { Button } from '@/components/redesign/common/Button';
import { ReviewAccordion } from '@/components/redesign/apply/ReviewAccordion';
import { StepFrame } from '@/components/redesign/apply/StepFrame';
import { APPLY_CONTENT } from '@/lib/redesign/config/applyContent';
import { GST_RATE } from '@/lib/redesign/config/applyFees';
import { MARRIED, ORGANISATION_REQUIRED_FOR, educationOptions, employmentOptions, genderOptions, maritalStatusOptions } from '@/lib/redesign/data/applyOptions';
import { site } from '@/lib/redesign/data/site';
import { applicationAdapter } from '@/lib/redesign/services/applicationService';
import { firstInvalidSection, useSubmitLock, type ApplyWizard, type EditSection } from '@/lib/redesign/hooks/useApplyWizard';
import { serviceCodeFor, type ServicePricing } from '@/lib/redesign/types/application';
import { cn } from '@/lib/redesign/utils/cn';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
const labelOf = (opts: Array<{ value: string; label: string }>, v: string) => opts.find((o) => o.value === v)?.label ?? v;
const { review: copy, payment: payCopy } = APPLY_CONTENT;

export function ReviewStep({ wizard }: { wizard: ApplyWizard }) {
  const { basic, family, personal } = wizard.data;
  const code = serviceCodeFor(basic);
  const [pricing, setPricing] = useState<{ state: 'loading' | 'ready' | 'error'; data: ServicePricing | null }>({ state: 'loading', data: null });
  const [alert, setAlert] = useState<{ tone: 'error' | 'info'; message: ReactNode } | null>(null);
  const { busy, run } = useSubmitLock();
  // Coming back from an edit: that section stays open so the change is visible at once
  const [open, setOpen] = useState<Partial<Record<EditSection, boolean>>>(wizard.lastEdited ? { [wizard.lastEdited]: true } : {});

  useEffect(() => {
    let live = true;
    void applicationAdapter.getServicePricing(code).then((res) => {
      if (live) setPricing(res.ok ? { state: 'ready', data: res.data } : { state: 'error', data: null });
    });
    return () => {
      live = false;
    };
  }, [code]);

  const service = `${basic.passportType === 'tatkal' ? 'Tatkal' : 'Normal'} passport · ${basic.bookSize} pages`;
  const permanentSame = personal.isAddressPermanent === 'yes';
  const address = (a: string, city: string, state: string, pin: string) => [a, city, state, pin].filter(Boolean).join(', ');

  const onPay = () => {
    setAlert(null);
    // Payment needs a verified number and complete details, whatever route led here
    if (!wizard.isVerified) return wizard.startEdit('basic');
    const invalid = firstInvalidSection(wizard.data);
    if (invalid) return wizard.startEdit(invalid);
    void run(async () => {
      const res = await applicationAdapter.startPayment(basic);
      if (res.ok && res.data.redirectUrl) window.location.assign(res.data.redirectUrl);
      else if (!res.ok && res.code === 'not-connected') setAlert({ tone: 'info', message: payCopy.unavailable });
      else if (!res.ok) setAlert({ tone: 'error', message: res.message });
    });
  };

  const total = pricing.data?.total;
  const sections: Array<{ id: EditSection; icon: typeof UserRound; preview: string; rows: Array<[string, ReactNode]> }> = [
    {
      id: 'basic',
      icon: UserRound,
      preview: `${basic.fullName} · +91 ${basic.mobile}`,
      rows: [
        ['Service', service],
        ['Full name', basic.fullName],
        ['Email', <span className="break-all">{basic.email}</span>],
        ['Mobile', `+91 ${basic.mobile}`],
      ],
    },
    {
      id: 'family',
      icon: Users,
      preview: `${family.fatherName} · ${family.motherName}`,
      rows: [
        ['Father’s name', family.fatherName],
        ['Mother’s name', family.motherName],
        ['Marital status', labelOf(maritalStatusOptions, family.maritalStatus)],
        ...(family.maritalStatus === MARRIED ? ([['Spouse name', family.spouseName]] as Array<[string, ReactNode]>) : []),
        ['Parent/spouse in government service', family.isPsGovEmp === '1' ? 'Yes' : 'No'],
        ['Emergency contact', `${family.emergencyContactName} · +91 ${family.emergencyContactMobile}`],
      ],
    },
    {
      id: 'personal',
      icon: MapPin,
      preview: address('', personal.city, personal.state, personal.zipCode),
      rows: [
        ['Current address', address(personal.address, personal.city, personal.state, personal.zipCode)],
        ['Permanent address', permanentSame ? 'Same as current address' : address(personal.permanentAddress, personal.permanentCity, personal.permanentState, personal.permanentPinCode)],
        ['Police station', personal.policeStationName],
        ['Gender', labelOf(genderOptions, personal.gender)],
        ['Date of birth', personal.dateOfBirth],
        ['Place of birth', [personal.birthCity, personal.birthDistrict, personal.birthState].filter(Boolean).join(', ')],
        ['Education', labelOf(educationOptions, personal.educationQualification)],
        [
          'Employment',
          [labelOf(employmentOptions, personal.employmentType), ORGANISATION_REQUIRED_FOR.includes(personal.employmentType) && personal.organisationName].filter(Boolean).join(' · '),
        ],
      ],
    },
  ];

  return (
    <StepFrame title={copy.title} description={copy.description} onSubmit={onPay} busy={busy} hideFooter>
      {wizard.lastEdited && (
        <p role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-success/25 bg-success/5 px-3.5 py-2.5 text-small font-medium text-ink-900">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
          {copy.updated(copy.sections[wizard.lastEdited].title)}
        </p>
      )}

      {/* Phones: payment first, so the action is on screen without scrolling past the details */}
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-7">
        <aside aria-label={payCopy.heading} className="rounded-2xl border border-navy-100 bg-navy-50/50 p-5 lg:sticky lg:top-28 lg:order-2">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-navy-700">{payCopy.heading}</p>
          <p className="mt-2 font-semibold text-ink-900">{pricing.data?.serviceName ?? (basic.passportType === 'tatkal' ? 'Tatkal passport' : 'Normal passport')}</p>
          <p className="text-small text-ink-500">{basic.bookSize} pages</p>

          {pricing.state === 'loading' && (
            <p className="mt-4 inline-flex items-center gap-2 text-small text-ink-500">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Loading fees…
            </p>
          )}
          {pricing.state === 'error' && <p className="mt-4 text-small text-danger">We could not load the fees. Please try again shortly.</p>}
          {pricing.state === 'ready' && !pricing.data && <p className="mt-4 text-small text-ink-500">Fees for this service will be shown before payment.</p>}
          {pricing.data && (
            <dl className="mt-4 space-y-2 text-small">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-700">Service charge</dt>
                <dd className="tabular font-medium text-ink-900">{inr.format(pricing.data.serviceCharge)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-700">GST ({Math.round(GST_RATE * 100)}%)</dt>
                <dd className="tabular font-medium text-ink-900">{inr.format(pricing.data.gst)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-t border-navy-100 pt-3">
                <dt className="font-semibold text-ink-900">{payCopy.totalLabel}</dt>
                <dd className="tabular text-[1.375rem] font-bold leading-none text-navy-900">{inr.format(pricing.data.total)}</dd>
              </div>
            </dl>
          )}

          <Button
            type="submit"
            size="lg"
            className="mt-5 w-full"
            disabled={busy}
            iconLeft={busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CreditCard className="h-4 w-4" aria-hidden />}
          >
            {busy ? payCopy.busyLabel : total !== undefined ? payCopy.payLabel(inr.format(total)) : payCopy.payLabelNoAmount}
          </Button>

          {alert && (
            <div
              role={alert.tone === 'error' ? 'alert' : 'status'}
              className={cn(
                'mt-3 flex gap-2 rounded-lg border px-3 py-2.5 text-[0.8125rem] leading-relaxed',
                alert.tone === 'error' ? 'border-danger/30 bg-danger/5 text-ink-900' : 'border-navy-100 bg-white text-ink-700',
              )}
            >
              {alert.tone === 'error' ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden /> : <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-700" aria-hidden />}
              <div>{alert.message}</div>
            </div>
          )}

          <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-500">{payCopy.note}</p>
          {!applicationAdapter.demo && (
            <p className="mt-2 flex items-center gap-1.5 text-[0.75rem] font-medium text-ink-700">
              <ShieldCheck className="h-3.5 w-3.5 text-navy-700" aria-hidden />
              Secure payment
            </p>
          )}
          <a href={site.phone.href} className="mt-3 flex items-center gap-2 border-t border-navy-100 pt-3 text-small font-medium text-navy-700 hover:underline">
            <Phone className="h-4 w-4 shrink-0" aria-hidden />
            Need help? {site.phone.display}
          </a>
        </aside>

        <div className="min-w-0 space-y-3 lg:order-1">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.08em] text-navy-700">{copy.detailsHeading}</p>
          {sections.map((s) => (
            <ReviewAccordion
              key={s.id}
              title={copy.sections[s.id].title}
              icon={s.icon}
              preview={s.preview}
              rows={s.rows}
              editLabel={copy.sections[s.id].edit}
              onEdit={() => wizard.startEdit(s.id)}
              open={!!open[s.id]}
              onToggle={() => setOpen((o) => ({ ...o, [s.id]: !o[s.id] }))}
            />
          ))}
        </div>
      </div>
    </StepFrame>
  );
}
