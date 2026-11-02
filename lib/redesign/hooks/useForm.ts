import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { runRules, type Rule } from '@/lib/redesign/utils/validation';

type Values = Record<string, string | boolean>;
type Schema<T extends Values> = { [K in keyof T]?: Array<Rule<T[K]>> };

/**
 * Minimal form state + validation. Errors show after a field is blurred or on
 * submit; on submit, focus moves to the first invalid field.
 */
export function useForm<T extends Values>(initial: T, schema: Schema<T>) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => runRules(value, schema[name] as Array<Rule<T[keyof T]>> | undefined),
    [schema],
  );

  const setValue = useCallback(
    <K extends keyof T>(name: K, value: T[K]) => {
      setValues((v) => ({ ...v, [name]: value }));
      setErrors((e) => (e[name] ? { ...e, [name]: validateField(name, value) } : e));
    },
    [validateField],
  );

  /** Spread onto an input: value, onChange, onBlur, name, aria-invalid */
  const field = (name: keyof T & string) => ({
    name,
    value: String(values[name] ?? ''),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValue(name, e.target.value as T[typeof name]),
    onBlur: () => {
      setTouched((t) => ({ ...t, [name]: true }));
      setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
    },
    error: touched[name] || errors[name] ? errors[name] : undefined,
  });

  const validateAll = () => {
    const next: Partial<Record<keyof T, string>> = {};
    (Object.keys(schema) as Array<keyof T>).forEach((k) => {
      const err = validateField(k, values[k]);
      if (err) next[k] = err;
    });
    setErrors(next);
    setTouched(Object.fromEntries(Object.keys(schema).map((k) => [k, true])) as Partial<Record<keyof T, boolean>>);
    return next;
  };

  const handleSubmit = (onValid: (values: T) => void | Promise<void>) => async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateAll();
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus());
      return;
    }
    await onValid(values);
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
  };

  return { values, errors, setValue, field, handleSubmit, reset, formRef };
}
