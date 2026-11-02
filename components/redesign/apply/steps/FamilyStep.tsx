'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChoiceGroup, SelectField, TextField } from '@/components/redesign/forms/Field';
import { FieldSection, StepFrame } from '@/components/redesign/apply/StepFrame';
import { APPLY_CONTENT } from '@/lib/redesign/config/applyContent';
import { MARRIED, maritalStatusOptions } from '@/lib/redesign/data/applyOptions';
import { applicationAdapter } from '@/lib/redesign/services/applicationService';
import { useSubmitLock, type ApplyWizard } from '@/lib/redesign/hooks/useApplyWizard';
import { useStepForm } from '@/lib/redesign/hooks/useStepForm';
import { familySchema } from '@/lib/redesign/utils/applyValidation';
import type { FamilyDetails } from '@/lib/redesign/types/application';

export function FamilyStep({ wizard }: { wizard: ApplyWizard }) {
  const values = wizard.data.family;
  const { mobile, email } = wizard.data.basic;
  const schema = useMemo(() => familySchema({ mobile, email }), [mobile, email]);
  const form = useStepForm<FamilyDetails>(values, schema, wizard.updateFamily);
  const { busy, run } = useSubmitLock();
  const [alert, setAlert] = useState<string | null>(null);
  const editing = wizard.editing === 'family';

  // Opened because a change elsewhere made this section invalid: show what needs attention
  useEffect(() => {
    if (wizard.editDependency) form.validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    setAlert(null);
    if (!form.validate()) return;
    if (editing && !wizard.sectionChanged('family')) return wizard.completeEdit();
    void run(async () => {
      const res = await applicationAdapter.saveFamilyDetails(values);
      if (res.ok) wizard.next();
      else {
        setAlert(res.message);
        form.applyServerErrors(res.fieldErrors);
      }
    });
  };

  return (
    <StepFrame
      title="Family details"
      description="As they appear on your documents."
      onSubmit={onSubmit}
      onBack={editing ? wizard.cancelEdit : wizard.back}
      backLabel={editing ? APPLY_CONTENT.edit.cancelLabel : undefined}
      submitLabel={editing ? APPLY_CONTENT.edit.saveLabel : undefined}
      busy={busy}
      busyLabel="Saving…"
      alert={alert ? { tone: 'error', message: alert } : null}
      formRef={form.formRef}
      errorCount={form.errorCount}
    >
      <div className="space-y-6">
        <FieldSection title="Parents">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Father’s name" autoComplete="off" placeholder="Full name" required maxLength={100} {...form.field('fatherName')} />
            <TextField label="Mother’s name" autoComplete="off" placeholder="Full name" required maxLength={100} {...form.field('motherName')} />
          </div>
        </FieldSection>

        <FieldSection title="Marital status">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Marital status" required placeholder="Select" options={maritalStatusOptions} {...form.field('maritalStatus')} />
            {values.maritalStatus === MARRIED && (
              <TextField label="Spouse name" autoComplete="off" placeholder="Enter spouse name" required maxLength={100} {...form.field('spouseName')} />
            )}
          </div>
          <ChoiceGroup
            legend="Is your parent or spouse a government employee?"
            required
            options={[
              { value: '1', label: 'Yes' },
              { value: '0', label: 'No' },
            ]}
            {...form.choice('isPsGovEmp')}
          />
        </FieldSection>

        <FieldSection title="Emergency contact">
          <TextField label="Name" autoComplete="off" placeholder="Enter name" required maxLength={100} {...form.field('emergencyContactName')} />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Mobile number"
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              prefix="+91"
              placeholder="9876543210"
              required
              hint="Must be different from your own number."
              {...form.field('emergencyContactMobile')}
              onChange={(e) => form.set('emergencyContactMobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
            <TextField
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="off"
              placeholder="Enter email"
              required
              hint="Must be different from your own email."
              {...form.field('emergencyContactEmail')}
            />
          </div>
        </FieldSection>
      </div>
    </StepFrame>
  );
}
