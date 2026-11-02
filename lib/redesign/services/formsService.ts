import { apiRequest, ApiError, USE_MOCKS } from './apiClient';

/**
 * Form adapters for the redesigned Contact and Locations pages.
 *
 * Endpoints and field names are the ones the original application uses (read from its
 * app/contact/page.tsx and app/page.tsx at commit b7fe4a2), called on the backend at
 * NEXT_PUBLIC_API_BASE_URL. While no backend is configured (preview), they resolve to
 * `{ kind: 'not-connected' }` and the UI says plainly that nothing was sent — it never
 * pretends a submission succeeded. See docs/BACKEND_INTEGRATION.md.
 *
 * Application status and the fee calculator keep the original pages (app/(legacy)).
 */
export const FORM_ENDPOINTS = {
  contact: '/contact/enquiry',
  locations: '/locations',
} as const;

export type SubmitResult<T = unknown> =
  | { kind: 'not-connected' }
  | { kind: 'success'; data: T; message?: string }
  | { kind: 'error'; message: string; fieldErrors?: Record<string, string> };

async function submit<T>(path: string, body: unknown, method = 'POST'): Promise<SubmitResult<T>> {
  if (USE_MOCKS) {
    await new Promise((r) => setTimeout(r, 600));
    return { kind: 'not-connected' };
  }
  try {
    const data = await apiRequest<T>(path, { method, ...(method === 'GET' ? { query: body as Record<string, string> } : { body }) });
    return { kind: 'success', data };
  } catch (err) {
    if (err instanceof ApiError) {
      // Laravel-style validation errors: { message, errors: { field: [msg] } }
      const b = err.body as { message?: string; errors?: Record<string, string[]> } | undefined;
      const fieldErrors = b?.errors ? Object.fromEntries(Object.entries(b.errors).map(([k, v]) => [k, v[0]])) : undefined;
      return { kind: 'error', message: b?.message ?? 'Something went wrong. Please try again.', fieldErrors };
    }
    return { kind: 'error', message: 'We could not reach the server. Please check your connection and try again.' };
  }
}

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
export const submitContact = (p: ContactPayload) =>
  submit(FORM_ENDPOINTS.contact, {
    full_name: `${p.firstName} ${p.lastName}`.trim(),
    email: p.email,
    subject: p.subject,
    message: p.message,
    mobile_number: p.phone,
  });

export interface PassportOffice {
  id: string;
  name: string;
  type: 'PSK' | 'POPSK' | 'RPO' | string;
  address: string;
  mapUrl?: string;
}
/** Response mapping to PassportOffice still needs confirming against the backend's /locations response. */
export const searchOffices = (query: string) => submit<PassportOffice[]>(FORM_ENDPOINTS.locations, { search: query }, 'GET');
