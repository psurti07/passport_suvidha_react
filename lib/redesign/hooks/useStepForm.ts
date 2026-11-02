import { useRef, useState, type ChangeEvent } from 'react';
import { validateField, validateStep, type StepErrors, type StepSchema } from '@/lib/redesign/utils/applyValidation';

/**
 * Field wiring and validation for one Apply Now step. Values live in the shared
 * wizard state (so they survive Back/Next); errors are local to the step.
 *
 * Errors appear after a field is left or on Continue; once shown, they update as
 * the visitor types. On Continue, focus moves to the first invalid field.
 */
export function useStepForm<T extends object>(values: T, schema: StepSchema<T>, onChange: (patch: Partial<T>) => void) {
  const [errors, setErrors] = useState<StepErrors<T>>({});
  const formRef = useRef<HTMLFormElement>(null);

  type Key = keyof T & string;

  const set = <K extends Key>(name: K, value: T[K]) => {
    onChange({ [name]: value } as unknown as Partial<T>);
    const nextValues = { ...values, [name]: value };
    setErrors((e) => {
      const next = { ...e };
      if (e[name]) next[name] = validateField(nextValues, schema, name);
      // Clear errors of fields that the change has hidden (conditional fields)
      const visible = schema(nextValues);
      (Object.keys(next) as Key[]).forEach((k) => {
        if (!(k in visible)) delete next[k];
      });
      return next;
    });
  };

  const blur = (name: Key) => setErrors((e) => ({ ...e, [name]: validateField(values, schema, name) }));

  /** Props for TextField / SelectField. */
  const field = (name: Key) => ({
    name,
    compact: true,
    value: String(values[name] ?? ''),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(name, e.target.value as T[Key]),
    onBlur: () => blur(name),
    error: errors[name],
  });

  /** Props for ChoiceGroup. */
  const choice = (name: Key) => ({
    name,
    compact: true,
    value: String(values[name] ?? ''),
    onChange: (v: string) => set(name, v as T[Key]),
    error: errors[name],
  });

  /** Validates the step; returns true when valid, otherwise focuses the first invalid field. */
  const validate = () => {
    const next = validateStep(values, schema);
    setErrors(next);
    const invalid = Object.keys(next);
    if (invalid.length === 0) return true;
    requestAnimationFrame(() => {
      const first = Array.from(formRef.current?.querySelectorAll<HTMLElement>('[name]') ?? []).find((el) =>
        invalid.includes(el.getAttribute('name') ?? ''),
      );
      first?.focus();
    });
    return false;
  };

  /** Applies server-side field errors (Laravel 422) to fields shown on this step. */
  const applyServerErrors = (fieldErrors?: Record<string, string>) => {
    if (fieldErrors) setErrors((e) => ({ ...e, ...(fieldErrors as StepErrors<T>) }));
  };

  return { errors, errorCount: Object.values(errors).filter(Boolean).length, set, field, choice, validate, applyServerErrors, formRef };
}
