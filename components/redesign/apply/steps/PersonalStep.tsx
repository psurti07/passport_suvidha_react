'use client';

import { useEffect, useState } from 'react';
import { ChoiceGroup, SelectField, TextField } from '@/components/redesign/forms/Field';
import { FieldSection, StepFrame } from '@/components/redesign/apply/StepFrame';
import { APPLY_CONTENT } from '@/lib/redesign/config/applyContent';
import { ORGANISATION_REQUIRED_FOR, educationOptions, employmentOptions, genderOptions, stateOptions } from '@/lib/redesign/data/applyOptions';
import { applicationAdapter } from '@/lib/redesign/services/applicationService';
import { useSubmitLock, type ApplyWizard } from '@/lib/redesign/hooks/useApplyWizard';
import { useStepForm } from '@/lib/redesign/hooks/useStepForm';
import { personalSchema } from '@/lib/redesign/utils/applyValidation';
import type { PersonalDetails, PoliceStation } from '@/lib/redesign/types/application';

/** Digits → DD/MM/YYYY as the visitor types. */
function formatDob(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

const digits = (v: string, n: number) => v.replace(/\D/g, '').slice(0, n);

type Stations = { pin: string; state: 'idle' | 'loading' | 'ready' | 'error'; list: PoliceStation[] };

export function PersonalStep({ wizard }: { wizard: ApplyWizard }) {
  const values = wizard.data.personal;
  const { updatePersonal } = wizard;
  const form = useStepForm<PersonalDetails>(values, personalSchema, wizard.updatePersonal);
  const { busy, run } = useSubmitLock();
  const [alert, setAlert] = useState<string | null>(null);
  const [stations, setStations] = useState<Stations>({ pin: '', state: 'idle', list: [] });

  // Police stations depend on the current-address PIN code
  const pin = /^[1-9]\d{5}$/.test(values.zipCode) ? values.zipCode : '';
  useEffect(() => {
    if (!pin) {
      setStations({ pin: '', state: 'idle', list: [] });
      return;
    }
    let live = true;
    setStations((s) => ({ ...s, pin, state: 'loading' }));
    void applicationAdapter.getPoliceStations(pin).then((res) => {
      if (!live) return;
      setStations({ pin, state: res.ok ? 'ready' : 'error', list: res.ok ? res.data : [] });
    });
    return () => {
      live = false;
    };
  }, [pin]);

  // Drop a selected station that is not in the list for the new PIN code
  useEffect(() => {
    if (stations.state === 'ready' && values.policeStationName && !stations.list.some((s) => s.name === values.policeStationName)) {
      updatePersonal({ policeStationName: '' });
    }
  }, [stations, values.policeStationName, updatePersonal]);

  const stationPlaceholder = !pin
    ? 'Enter a valid PIN code first'
    : stations.state === 'loading'
      ? 'Loading police stations…'
      : stations.state === 'error'
        ? 'Could not load — please try again'
        : stations.list.length
          ? 'Select police station'
          : 'No stations found for this PIN code';

  const editing = wizard.editing === 'personal';

  // Opened because a change elsewhere made this section invalid: show what needs attention
  useEffect(() => {
    if (wizard.editDependency) form.validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    setAlert(null);
    if (!form.validate()) return;
    if (editing && !wizard.sectionChanged('personal')) return wizard.completeEdit();
    void run(async () => {
      const res = await applicationAdapter.savePersonalDetails(values, { isPsGovEmp: wizard.data.family.isPsGovEmp });
      if (res.ok) wizard.next();
      else {
        setAlert(res.message);
        form.applyServerErrors(res.fieldErrors);
      }
    });
  };

  const needsOrganisation = ORGANISATION_REQUIRED_FOR.includes(values.employmentType);

  return (
    <StepFrame
      title="Personal details"
      description="Your address and personal information, as on your documents."
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
        <FieldSection title="Current address">
          <TextField label="Address" autoComplete="street-address" placeholder="House no., building, street, area" required maxLength={250} {...form.field('address')} />
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="PIN code"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="395008"
              required
              maxLength={6}
              {...form.field('zipCode')}
              onChange={(e) => form.set('zipCode', digits(e.target.value, 6))}
            />
            <TextField label="City" autoComplete="address-level2" placeholder="City" required maxLength={100} {...form.field('city')} />
            <SelectField label="State" autoComplete="address-level1" required placeholder="Select state" options={stateOptions} {...form.field('state')} />
          </div>
          <SelectField
            label="Nearest police station"
            required
            placeholder={stationPlaceholder}
            options={stations.list.map((s) => ({ value: s.name, label: s.name }))}
            disabled={stations.state !== 'ready' || stations.list.length === 0}
            {...form.field('policeStationName')}
          />
          <ChoiceGroup
            legend="Is this also your permanent address?"
            required
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            {...form.choice('isAddressPermanent')}
          />
        </FieldSection>

        {values.isAddressPermanent === 'no' && (
          <FieldSection title="Permanent address">
            <TextField label="Permanent address" placeholder="House no., building, street, area" required maxLength={250} {...form.field('permanentAddress')} />
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField
                label="PIN code"
                inputMode="numeric"
                placeholder="395008"
                required
                maxLength={6}
                {...form.field('permanentPinCode')}
                onChange={(e) => form.set('permanentPinCode', digits(e.target.value, 6))}
              />
              <TextField label="City" placeholder="City" required maxLength={100} {...form.field('permanentCity')} />
              <SelectField label="State" required placeholder="Select state" options={stateOptions} {...form.field('permanentState')} />
            </div>
          </FieldSection>
        )}

        <FieldSection title="About you">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Gender" required placeholder="Select gender" options={genderOptions} {...form.field('gender')} />
            <TextField
              label="Date of birth"
              inputMode="numeric"
              autoComplete="bday"
              placeholder="DD/MM/YYYY"
              required
              maxLength={10}
              {...form.field('dateOfBirth')}
              onChange={(e) => form.set('dateOfBirth', formatDob(e.target.value))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField label="Birth city / village / town" placeholder="City, village or town" required maxLength={100} {...form.field('birthCity')} />
            <TextField label="Birth district" placeholder="District" required maxLength={100} {...form.field('birthDistrict')} />
            <SelectField label="Birth state" required placeholder="Select state" options={stateOptions} {...form.field('birthState')} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Education" required placeholder="Select education" options={educationOptions} {...form.field('educationQualification')} />
            <SelectField label="Employment type" required placeholder="Select employment" options={employmentOptions} {...form.field('employmentType')} />
          </div>
          {needsOrganisation && (
            <TextField label="Organisation name" autoComplete="organization" placeholder="Employer / organisation" required maxLength={150} {...form.field('organisationName')} />
          )}
        </FieldSection>
      </div>
    </StepFrame>
  );
}
