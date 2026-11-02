'use client';

import { useState } from 'react';
import { Link } from '@/lib/redesign/router';
import { Lock } from 'lucide-react-redesign';
import { CheckboxField, ChoiceGroup, TextField } from '@/components/redesign/forms/Field';
import { StepFrame } from '@/components/redesign/apply/StepFrame';
import { APPLY_CONTENT } from '@/lib/redesign/config/applyContent';
import { applicationAdapter } from '@/lib/redesign/services/applicationService';
import { useSubmitLock, type ApplyWizard } from '@/lib/redesign/hooks/useApplyWizard';
import { useStepForm } from '@/lib/redesign/hooks/useStepForm';
import { basicSchema } from '@/lib/redesign/utils/applyValidation';
import type { BasicDetails } from '@/lib/redesign/types/application';

export function BasicStep({ wizard, focusOnMount }: { wizard: ApplyWizard; focusOnMount: boolean }) {
  const values = wizard.data.basic;
  const form = useStepForm<BasicDetails>(values, basicSchema, wizard.updateBasic);
  const { busy, run } = useSubmitLock();
  const [alert, setAlert] = useState<string | null>(null);
  const editing = wizard.editing === 'basic';

  const onSubmit = () => {
    setAlert(null);
    if (!form.validate()) return;
    // Editing from review with the verified number: save and go straight back. No new code.
    if (editing && wizard.isVerified) {
      if (!wizard.sectionChanged('basic')) return wizard.completeEdit();
      void run(async () => {
        const res = await applicationAdapter.updateBasicDetails(values);
        if (res.ok) wizard.completeEdit();
        else {
          setAlert(res.message);
          form.applyServerErrors(res.fieldErrors);
        }
      });
      return;
    }
    // Same number already verified in this session (came Back to edit): no new code needed
    if (wizard.isVerified) return wizard.next();
    void run(async () => {
      const res = await applicationAdapter.sendOtp(values);
      // Editing: a changed number goes to verification (completing the edit afterwards)
      if (res.ok) (editing ? wizard.completeEdit() : wizard.next());
      else {
        setAlert(res.message);
        form.applyServerErrors(res.fieldErrors);
      }
    });
  };

  return (
    <StepFrame
      title="Basic details"
      description="Enter your name exactly as it appears on your Aadhaar or other ID."
      onSubmit={onSubmit}
      onBack={editing ? wizard.cancelEdit : undefined}
      backLabel={APPLY_CONTENT.edit.cancelLabel}
      submitLabel={editing ? (wizard.isVerified ? APPLY_CONTENT.edit.saveLabel : APPLY_CONTENT.edit.verifyNewNumberLabel) : undefined}
      busy={busy}
      busyLabel={editing && wizard.isVerified ? APPLY_CONTENT.edit.savingLabel : applicationAdapter.demo ? 'Please wait…' : 'Sending code…'}
      alert={alert ? { tone: 'error', message: alert } : null}
      formRef={form.formRef}
      errorCount={form.errorCount}
      focusOnMount={focusOnMount}
      footerNote={
        <p className="flex items-center gap-2 text-[0.8125rem] text-ink-500">
          <Lock className="h-3.5 w-3.5 shrink-0 text-navy-700" aria-hidden />
          Used only for your passport application assistance.
        </p>
      }
    >
      <div className="space-y-4">
        <TextField label="Full name" autoComplete="name" placeholder="As per Aadhaar / ID" required maxLength={100} {...form.field('fullName')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            {...form.field('email')}
          />
          <TextField
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            prefix="+91"
            placeholder="9876543210"
            required
            hint={
              wizard.isVerified
                ? 'Verified in this session.'
                : editing
                  ? 'A new number has to be verified before payment.'
                  : applicationAdapter.demo
                    ? 'This number will be verified in the next step.'
                    : 'We’ll send a 4-digit code to this number.'
            }
            {...form.field('mobile')}
            onChange={(e) => form.set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
          />
        </div>

        <div className="grid gap-4 pt-1 sm:grid-cols-2">
          <ChoiceGroup
            legend="Passport service"
            required
            options={[
              { value: 'normal', label: 'Normal', description: 'Standard processing' },
              { value: 'tatkal', label: 'Tatkal', description: 'Urgent processing' },
            ]}
            {...form.choice('passportType')}
          />
          <ChoiceGroup
            legend="Booklet size"
            required
            options={[
              { value: '36', label: '36 pages', description: 'Standard booklet' },
              { value: '60', label: '60 pages', description: 'Frequent travellers' },
            ]}
            {...form.choice('bookSize')}
          />
        </div>

        <div className="space-y-3 rounded-lg bg-paper-alt px-3.5 py-3.5">
          <CheckboxField
            name="acceptedTerms"
            checked={values.acceptedTerms}
            onCheckedChange={(c) => form.set('acceptedTerms', c)}
            error={form.errors.acceptedTerms}
            required
            label={
              <>
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-navy-700 underline" target="_blank">
                  Terms of Use
                </Link>
                ,{' '}
                <Link to="/privacy-policy" className="font-semibold text-navy-700 underline" target="_blank">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/disclaimer" className="font-semibold text-navy-700 underline" target="_blank">
                  Disclaimer
                </Link>
                , and understand Passport Suvidha is a private consultancy.
                <span className="text-danger" aria-hidden>
                  {' '}
                  *
                </span>
              </>
            }
          />
          <CheckboxField
            name="marketingOptIn"
            checked={values.marketingOptIn}
            onCheckedChange={(c) => form.set('marketingOptIn', c)}
            label="Send me promotional and informational updates by email, SMS or call. (Optional)"
          />
        </div>
      </div>
    </StepFrame>
  );
}
