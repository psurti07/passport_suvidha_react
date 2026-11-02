'use client';

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react-redesign';
import { cn } from '@/lib/redesign/utils/cn';

const control =
  'block w-full rounded-md border bg-white px-4 text-[1rem] text-ink-900 placeholder:text-ink-400 transition-[border-color,box-shadow] duration-fast focus:outline-none focus:ring-4 disabled:bg-paper-alt disabled:text-ink-500';
const okCls = 'border-line-300 hover:border-navy-300 focus:border-navy-500 focus:ring-navy-100';
const errCls = 'border-danger focus:border-danger focus:ring-danger/15';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
  /** Tighter label spacing for dense forms (Apply Now). */
  compact?: boolean;
}

/** Label + control + hint + error, wired with aria-describedby. */
export function FieldShell({ id, label, required, hint, error, children, className, compact }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={cn('block font-semibold text-ink-900', compact ? 'mb-1.5 text-[0.875rem]' : 'mb-2 text-[0.9375rem]')}>
        {label}
        {required ? (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        ) : (
          <span className="ml-1.5 text-small font-normal text-ink-400">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={cn('text-ink-500', compact ? 'mt-1 text-[0.8125rem]' : 'mt-1.5 text-small')}>
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className={cn('flex items-center gap-1.5 font-medium text-danger', compact ? 'mt-1 text-[0.8125rem]' : 'mt-1.5 text-small')}
          role="alert"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

type Common = { label: string; hint?: ReactNode; error?: string; wrapperClassName?: string; compact?: boolean };

const describedBy = (id: string, hint?: ReactNode, error?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export const TextField = forwardRef<HTMLInputElement, Common & InputHTMLAttributes<HTMLInputElement> & { prefix?: ReactNode }>(
  function TextField({ label, hint, error, wrapperClassName, required, className, prefix, compact, id: idProp, ...rest }, ref) {
    const auto = useId();
    const id = idProp ?? auto;
    return (
      <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={wrapperClassName} compact={compact}>
        <div className="relative">
          {prefix && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center border-r border-line-200 pl-4 pr-3 text-[1rem] font-medium text-ink-700">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy(id, hint, error)}
            className={cn(control, compact ? 'h-11' : 'h-12', error ? errCls : okCls, prefix ? 'pl-[4.5rem]' : undefined, className)}
            {...rest}
          />
        </div>
      </FieldShell>
    );
  },
);

export const TextAreaField = forwardRef<HTMLTextAreaElement, Common & TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextAreaField({ label, hint, error, wrapperClassName, required, className, id: idProp, ...rest }, ref) {
    const auto = useId();
    const id = idProp ?? auto;
    return (
      <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={wrapperClassName}>
        <textarea
          ref={ref}
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(control, 'min-h-[140px] resize-y py-3', error ? errCls : okCls, className)}
          {...rest}
        />
      </FieldShell>
    );
  },
);

export const SelectField = forwardRef<HTMLSelectElement, Common & SelectHTMLAttributes<HTMLSelectElement> & { options: Array<{ value: string; label: string }>; placeholder?: string }>(
  function SelectField({ label, hint, error, wrapperClassName, required, className, options, placeholder, compact, id: idProp, ...rest }, ref) {
    const auto = useId();
    const id = idProp ?? auto;
    return (
      <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={wrapperClassName} compact={compact}>
        <div className="relative">
          <select
            ref={ref}
            id={id}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            aria-describedby={describedBy(id, hint, error)}
            className={cn(control, compact ? 'h-11' : 'h-12', 'appearance-none pr-11', error ? errCls : okCls, className)}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" aria-hidden />
        </div>
      </FieldShell>
    );
  },
);

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: ReactNode;
  error?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxField({ label, error, checked, onCheckedChange, required, id: idProp, ...rest }: CheckboxProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line-300 accent-navy-700"
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-small leading-relaxed text-ink-700">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 pl-8 text-small font-medium text-danger" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

interface ChoiceOption {
  value: string;
  label: string;
  description?: string;
}

interface ChoiceGroupProps {
  name: string;
  legend: string;
  options: ChoiceOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  columns?: 2 | 3;
  /** Smaller cards; two columns from the smallest screens (for short labels). */
  compact?: boolean;
}

/** Radio group rendered as selectable cards. */
export function ChoiceGroup({ name, legend, options, value, onChange, error, required, columns = 2, compact }: ChoiceGroupProps) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className={cn('font-semibold text-ink-900', compact ? 'mb-1.5 text-[0.875rem]' : 'mb-2 text-[0.9375rem]')}>
        {legend}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </legend>
      <div className={cn('grid', compact ? 'grid-cols-2 gap-2.5' : 'gap-3', columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                'relative flex cursor-pointer items-start rounded-lg border transition-[border-color,background-color,box-shadow] duration-fast has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-navy-100',
                compact ? 'min-h-11 gap-2.5 px-3 py-2.5' : 'gap-3 p-4',
                checked ? 'border-navy-700 bg-navy-50/60 shadow-xs' : error ? 'border-danger' : 'border-line-300 hover:border-navy-300',
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                required={required}
                className="mt-0.5 h-5 w-5 shrink-0 accent-navy-700"
              />
              <span>
                <span className={cn('block font-semibold text-ink-900', compact && 'text-[0.9375rem] leading-snug')}>{o.label}</span>
                {o.description && (
                  <span className={cn('mt-0.5 block text-ink-500', compact ? 'text-[0.8125rem] leading-snug' : 'text-small')}>{o.description}</span>
                )}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-small font-medium text-danger" role="alert">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </fieldset>
  );
}
