'use client';

import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/lib/redesign/utils/cn';

interface OtpInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  /** Called once every box is filled. */
  onComplete?: (value: string) => void;
  disabled?: boolean;
  state?: 'idle' | 'error' | 'success';
  describedBy?: string;
  autoFocus?: boolean;
}

/**
 * One-time code boxes: digits only, focus moves forward on entry and back on
 * Backspace, arrow keys move between boxes, and a pasted code fills every box.
 */
export function OtpInput({ length, value, onChange, onComplete, disabled, state = 'idle', describedBy, autoFocus }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  const focus = (i: number) => {
    const el = refs.current[Math.max(0, Math.min(length - 1, i))];
    el?.focus();
    el?.select();
  };

  const commit = (next: string[]) => {
    const v = next.join('');
    onChange(v);
    if (v.length === length && next.every(Boolean)) onComplete?.(v);
  };

  const setDigit = (i: number, d: string) => {
    const next = [...digits];
    next[i] = d;
    commit(next);
  };

  const onInput = (i: number, raw: string) => {
    let only = raw.replace(/\D/g, '');
    if (!only) return;
    // Caret next to an existing digit: keep only the newly typed one
    if (only.length === 2 && digits[i] && only.includes(digits[i])) only = only.replace(digits[i], '') || digits[i];
    // Typing over a filled box, or autofill dropping the whole code into one box
    if (only.length > 1) {
      const next = [...digits];
      only
        .slice(0, length - i)
        .split('')
        .forEach((d, k) => (next[i + k] = d));
      commit(next);
      focus(Math.min(i + only.length, length - 1));
      return;
    }
    setDigit(i, only);
    if (i < length - 1) focus(i + 1);
  };

  const onKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (digits[i]) setDigit(i, '');
      else if (i > 0) {
        setDigit(i - 1, '');
        focus(i - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focus(i - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focus(i + 1);
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    e.preventDefault();
    if (!pasted) return;
    const next = Array.from({ length }, (_, k) => pasted[k] ?? '');
    commit(next);
    focus(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="flex justify-center gap-2.5 sm:gap-3" role="group" aria-label={`${length}-digit code`} aria-describedby={describedBy}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          name={i === 0 ? 'otp' : undefined}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          value={d}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={state === 'error' || undefined}
          onChange={(e) => onInput(i, e.target.value)}
          onKeyDown={(e) => onKeyDown(i, e)}
          onPaste={onPaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            'h-14 w-12 rounded-lg border-2 bg-white text-center text-[1.5rem] font-bold tabular text-ink-900 caret-navy-700 transition-[border-color,box-shadow] duration-fast focus:outline-none focus:ring-4 disabled:bg-paper-alt sm:h-16 sm:w-14',
            state === 'error'
              ? 'border-danger focus:ring-danger/15'
              : state === 'success'
                ? 'border-success'
                : d
                  ? 'border-navy-700 focus:ring-navy-100'
                  : 'border-line-300 focus:border-navy-500 focus:ring-navy-100',
          )}
        />
      ))}
    </div>
  );
}
