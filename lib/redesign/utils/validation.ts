/** Small, dependency-free validators. Each returns an error message or undefined. */
export type Rule<V = string> = (value: V) => string | undefined;

export const required =
  (message = 'This field is required.'): Rule<unknown> =>
  (v) => {
    if (typeof v === 'boolean') return v ? undefined : message;
    return String(v ?? '').trim() ? undefined : message;
  };

export const minLength =
  (n: number, message?: string): Rule =>
  (v) => (!v || v.trim().length >= n ? undefined : message ?? `Please enter at least ${n} characters.`);

export const maxLength =
  (n: number, message?: string): Rule =>
  (v) => (!v || v.length <= n ? undefined : message ?? `Please keep this under ${n} characters.`);

export const email =
  (message = 'Please enter a valid email address.'): Rule =>
  (v) => (!v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : message);

/** Indian mobile: 10 digits starting 6–9 (country code handled separately). */
export const indianMobile =
  (message = 'Please enter a valid 10-digit mobile number.'): Rule =>
  (v) => (!v || /^[6-9]\d{9}$/.test(v.replace(/\D/g, '')) ? undefined : message);

export const personName =
  (message = 'Please use letters, spaces, dots or hyphens only.'): Rule =>
  (v) => (!v || /^[\p{L} .'-]+$/u.test(v.trim()) ? undefined : message);

export const pastDate =
  (message = 'Please enter a valid date in the past.'): Rule =>
  (v) => {
    if (!v) return undefined;
    const d = new Date(v);
    return !Number.isNaN(d.getTime()) && d < new Date() ? undefined : message;
  };

/** City name or 6-digit Indian PIN code. */
export const cityOrPin =
  (message = 'Enter a city name or a 6-digit PIN code.'): Rule =>
  (v) => {
    const s = (v ?? '').trim();
    if (!s) return undefined;
    if (/^\d+$/.test(s)) return /^[1-9]\d{5}$/.test(s) ? undefined : message;
    return /^[\p{L} .'-]{2,}$/u.test(s) ? undefined : message;
  };

/** 6-digit Indian PIN code. */
export const pinCode =
  (message = 'Enter a valid 6-digit PIN code.'): Rule =>
  (v) => (!v || /^[1-9]\d{5}$/.test(v.trim()) ? undefined : message);

/** DD/MM/YYYY — a real calendar date, not in the future, year 1900 or later. */
export const pastDateDMY =
  (message = 'Enter a valid date in DD/MM/YYYY format.'): Rule =>
  (v) => {
    if (!v) return undefined;
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v.trim());
    if (!m) return message;
    const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const date = new Date(y, mo - 1, d);
    if (y < 1900 || date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return message;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today ? 'Date of birth cannot be in the future.' : undefined;
  };

/** Fails when the value equals another value (case-insensitive, ignoring spaces). */
export const notSameAs =
  (other: string, message: string): Rule =>
  (v) => (!v || !other || v.replace(/\s/g, '').toLowerCase() !== other.replace(/\s/g, '').toLowerCase() ? undefined : message);

export function runRules<V>(value: V, rules: Array<Rule<V>> = []): string | undefined {
  for (const rule of rules) {
    const err = rule(value);
    if (err) return err;
  }
  return undefined;
}
