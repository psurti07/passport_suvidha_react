import { ApiError, apiRequest } from './apiClient';
import { previewPricing } from '@/lib/redesign/config/applyFees';
import { MARRIED, ORGANISATION_REQUIRED_FOR } from '@/lib/redesign/data/applyOptions';
import { APPLY_DEMO_MODE, APPLY_PRODUCTION, DEMO_OTP, OTP_CONFIG, type ApplyStepId } from '@/lib/redesign/config/applyFlow';
import { USE_MOCKS } from './apiClient';
import {
  serviceCodeFor,
  type BasicDetails,
  type FamilyDetails,
  type PersonalDetails,
  type PoliceStation,
  type ServiceCode,
  type ServicePricing,
} from '@/lib/redesign/types/application';

/**
 * Apply Now integration layer.
 *
 * The UI talks only to an `ApplicationAdapter`. Two implementations:
 *   - demoAdapter: local simulation for previews (APPLY_DEMO_MODE). Sends nothing,
 *     stores nothing, and never verifies a real identity.
 *   - httpAdapter: the original application's contract (read from its
 *     components/passport-application/ApplicationForm.tsx at commit b7fe4a2).
 *
 * Paths starting with /api/ are this app's own route handlers (app/api/**), which
 * forward to the Laravel backend at NEXT_PUBLIC_API_BASE_URL. The others are called
 * on the backend directly, as the original application does. Payloads and responses
 * are mapped in one place below. See docs/BACKEND_INTEGRATION.md.
 */
export const APPLY_ENDPOINTS = {
  /** Same-origin route handlers (app/api) */
  sendOtp: '/api/otp/send',
  verifyOtp: '/api/otp/verify',
  createCustomer: '/api/customers/create',
  familyDetails: '/api/customer/family-details',
  personalDetails: '/api/customer/personal-details',
  policeStations: '/api/police-stations',
  /** Backend (NEXT_PUBLIC_API_BASE_URL) */
  checkUser: '/check-user',
  servicePricing: '/services/passport',
  createPaymentOrder: '/create-order',
  verifyPayment: '/verify-payment',
  paymentFailed: '/payment-failed',
} as const;

/** Same-origin route handlers are called without the backend base URL. */
const local = { sameOrigin: true } as const;

export type ApplyErrorCode =
  | 'invalid-otp'
  | 'expired-otp'
  | 'validation'
  | 'session-expired'
  | 'network'
  | 'not-connected'
  | 'unknown';

export type ApplyResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; code: ApplyErrorCode; message: string; fieldErrors?: Record<string, string> };

export interface ApplicationAdapter {
  /** True for the local demo implementation; the UI shows a "Demo mode" banner. */
  readonly demo: boolean;
  sendOtp(basic: BasicDetails): Promise<ApplyResult<{ resendAfterSeconds: number }>>;
  /** Verifies the code and registers the applicant. Returns the step to continue from. */
  verifyOtp(basic: BasicDetails, otp: string): Promise<ApplyResult<{ nextStep: ApplyStepId }>>;
  /** Saves changed basic details (same mobile number) when editing from Review & Pay. */
  updateBasicDetails(basic: BasicDetails): Promise<ApplyResult>;
  saveFamilyDetails(family: FamilyDetails): Promise<ApplyResult>;
  /** `isPsGovEmp` (from family details) is sent again with personal details, as the original form does. */
  savePersonalDetails(personal: PersonalDetails, extra: Pick<FamilyDetails, 'isPsGovEmp'>): Promise<ApplyResult>;
  getPoliceStations(pinCode: string): Promise<ApplyResult<PoliceStation[]>>;
  /** Demo mode returns the unverified preview fees from config/applyFees.ts; `null` when unknown. */
  getServicePricing(code: ServiceCode): Promise<ApplyResult<ServicePricing | null>>;
  /** Starts payment with the backend's gateway. Not implemented in this frontend. */
  startPayment(basic: BasicDetails): Promise<ApplyResult<{ redirectUrl?: string }>>;
}

const ok = <T,>(data: T): ApplyResult<T> => ({ ok: true, data });
const fail = (code: ApplyErrorCode, message: string, fieldErrors?: Record<string, string>): ApplyResult<never> => ({
  ok: false,
  code,
  message,
  fieldErrors,
});

/* ------------------------------------------------------------------ demo -- */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const demoAdapter: ApplicationAdapter = {
  demo: true,
  async sendOtp() {
    await wait(700);
    return ok({ resendAfterSeconds: OTP_CONFIG.resendAfterSeconds });
  },
  async verifyOtp(_basic, otp) {
    await wait(800);
    if (otp === DEMO_OTP.valid) return ok({ nextStep: 'family' as const });
    if (otp === DEMO_OTP.expired) return fail('expired-otp', 'This code has expired. Please request a new one.');
    return fail('invalid-otp', 'That code is not correct. Please check and try again.');
  },
  async updateBasicDetails() {
    await wait(400);
    return ok(undefined);
  },
  async saveFamilyDetails() {
    await wait(500);
    return ok(undefined);
  },
  async savePersonalDetails() {
    await wait(500);
    return ok(undefined);
  },
  async getPoliceStations() {
    await wait(400);
    return ok([
      { id: 'sample-1', name: 'Sample police station 1' },
      { id: 'sample-2', name: 'Sample police station 2' },
    ]);
  },
  async getServicePricing(code) {
    await wait(300);
    return ok(previewPricing(code));
  },
  async startPayment() {
    await wait(500);
    return fail('not-connected', 'Online payment is not connected.');
  },
};

/* ------------------------------------------------------------------ http -- */

/** Session token from the verify step. Kept in memory only — never persisted. */
let sessionToken: string | null = null;
const auth = (): Record<string, string> => (sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {});

const NEXT_STEP: Record<string, ApplyStepId> = {
  otp_verification: 'verify',
  family_details: 'family',
  personal_details: 'personal',
  payment: 'review',
};

/** DD/MM/YYYY → YYYY-MM-DD. */
const isoDate = (dmy: string) => {
  const [d, m, y] = dmy.split('/');
  return `${y}-${m}-${d}`;
};

/** Backend field name → form field name (snake_case → camelCase, plus renamed fields). */
const RENAMED: Record<string, string> = { mobile_number: 'mobile', service_code: 'passportType' };
const formField = (k: string) => RENAMED[k] ?? k.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

function toFailure(err: unknown): ApplyResult<never> {
  if (err instanceof ApiError) {
    const body = err.body as { message?: string; errors?: Record<string, string[]> } | undefined;
    const fieldErrors = body?.errors ? Object.fromEntries(Object.entries(body.errors).map(([k, v]) => [formField(k), v[0]])) : undefined;
    if (err.status === 401) return fail('session-expired', 'Your session has expired. Please verify your mobile number again.');
    if (err.status === 422) return fail('validation', body?.message ?? 'Please check the highlighted details.', fieldErrors);
    return fail('unknown', body?.message ?? 'Something went wrong. Please try again.', fieldErrors);
  }
  return fail('network', 'We could not reach the server. Please check your connection and try again.');
}

async function call<T>(fn: () => Promise<T>): Promise<ApplyResult<T>> {
  try {
    return ok(await fn());
  } catch (err) {
    return toFailure(err);
  }
}

export const httpAdapter: ApplicationAdapter = {
  demo: false,
  async sendOtp(basic) {
    const res = await call(() =>
      apiRequest(APPLY_ENDPOINTS.sendOtp, { ...local, method: 'POST', body: { mobile_number: basic.mobile, purpose: 'registration' } }),
    );
    return res.ok ? ok({ resendAfterSeconds: OTP_CONFIG.resendAfterSeconds }) : res;
  },
  async verifyOtp(basic, otp) {
    // 1. Check the code
    try {
      await apiRequest(APPLY_ENDPOINTS.verifyOtp, {
        ...local,
        method: 'POST',
        body: { mobile_number: basic.mobile, otp, purpose: 'registration' },
      });
    } catch (err) {
      if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
        const body = err.body as { message?: string } | undefined;
        return fail('invalid-otp', body?.message ?? 'That code is not correct or has expired. Please request a new one.');
      }
      return toFailure(err);
    }
    // 2. Register the applicant; the response carries the session token and where to continue
    try {
      const data = await apiRequest<{ token?: string; next_step?: string }>(APPLY_ENDPOINTS.createCustomer, {
        ...local,
        method: 'POST',
        body: {
          full_name: basic.fullName,
          email: basic.email,
          mobile_number: basic.mobile,
          service_code: serviceCodeFor(basic),
        },
      });
      sessionToken = data.token ?? null;
      return ok({ nextStep: NEXT_STEP[data.next_step ?? ''] ?? 'family' });
    } catch (err) {
      return toFailure(err);
    }
  },
  async updateBasicDetails() {
    // The original application has no confirmed endpoint for changing name, email or service after
    // registration (its /api/customer/select-service route expects different service codes and is
    // unused). Connect one here; until then the change is refused rather than silently lost.
    return fail('not-connected', 'These details cannot be changed online yet. Please call us and we will update them.');
  },
  async saveFamilyDetails(f) {
    const res = await call(() =>
      apiRequest(APPLY_ENDPOINTS.familyDetails, {
        ...local,
        method: 'POST',
        headers: auth(),
        body: {
          father_name: f.fatherName,
          mother_name: f.motherName,
          marital_status: f.maritalStatus,
          spouse_name: f.maritalStatus === MARRIED ? f.spouseName : '',
          is_ps_gov_emp: f.isPsGovEmp,
          emergency_contact_name: f.emergencyContactName,
          emergency_contact_mobile: f.emergencyContactMobile,
          emergency_contact_email: f.emergencyContactEmail,
        },
      }),
    );
    return res.ok ? ok(undefined) : res;
  },
  async savePersonalDetails(p, extra) {
    const permanentSame = p.isAddressPermanent === 'yes';
    const res = await call(() =>
      apiRequest(APPLY_ENDPOINTS.personalDetails, {
        ...local,
        method: 'POST',
        headers: auth(),
        body: {
          address: p.address,
          pin_code: p.zipCode,
          city: p.city,
          state: p.state,
          is_address_permanent: permanentSame ? 1 : 0,
          // Sent empty when the current address is also the permanent one (as the original form does)
          permanent_address: permanentSame ? '' : p.permanentAddress,
          permanent_pin_code: permanentSame ? '' : p.permanentPinCode,
          permanent_city: permanentSame ? '' : p.permanentCity,
          permanent_state: permanentSame ? '' : p.permanentState,
          police_station_name: p.policeStationName,
          gender: p.gender,
          date_of_birth: isoDate(p.dateOfBirth),
          birth_city: p.birthCity,
          birth_district: p.birthDistrict,
          birth_state: p.birthState,
          education_qualification: p.educationQualification,
          employment_type: p.employmentType,
          organisation_name: ORGANISATION_REQUIRED_FOR.includes(p.employmentType) ? p.organisationName : '',
          is_ps_gov_emp: extra.isPsGovEmp,
        },
      }),
    );
    return res.ok ? ok(undefined) : res;
  },
  async getPoliceStations(pinCode) {
    const res = await call(() =>
      apiRequest<Array<{ id?: string | number; name: string }>>(APPLY_ENDPOINTS.policeStations, { ...local, query: { pincode: pinCode } }),
    );
    return res.ok ? ok((res.data ?? []).map((s, i) => ({ id: String(s.id ?? i), name: s.name }))) : res;
  },
  async getServicePricing(code) {
    const res = await call(() =>
      apiRequest<{ data?: Array<{ service_code: string; service_name?: string; service_charges: number; service_gst: number; service_total_amount: number }> }>(
        APPLY_ENDPOINTS.servicePricing,
      ),
    );
    if (!res.ok) return res;
    const s = res.data.data?.find((x) => x.service_code === code);
    return ok(
      s
        ? { serviceName: s.service_name ?? code, serviceCharge: s.service_charges, gst: s.service_gst, total: s.service_total_amount, currency: 'INR' as const }
        : null,
    );
  },
  async startPayment() {
    // Not connected in this project. The original flow: POST /create-order (Bearer token) →
    // Razorpay checkout (NEXT_PUBLIC_RAZORPAY_KEY) → POST /verify-payment or /payment-failed →
    // /payment-response?status=success|failed|cancelled. See docs/BACKEND_INTEGRATION.md.
    return fail('not-connected', 'Online payment is not connected yet.');
  },
};

/**
 * Production deployment without a backend: never simulate anything, refuse every step.
 * (Reached only through a configuration mistake; customers see a truthful message.)
 */
const UNAVAILABLE = 'Online applications are temporarily unavailable. Please call us to apply.';
const unavailable = async () => fail('not-connected', UNAVAILABLE);
const unavailableAdapter: ApplicationAdapter = {
  demo: false,
  sendOtp: unavailable,
  verifyOtp: unavailable,
  updateBasicDetails: unavailable,
  saveFamilyDetails: unavailable,
  savePersonalDetails: unavailable,
  getPoliceStations: unavailable,
  getServicePricing: unavailable,
  startPayment: unavailable,
};

export const applicationAdapter: ApplicationAdapter = APPLY_DEMO_MODE
  ? demoAdapter
  : APPLY_PRODUCTION && USE_MOCKS
    ? unavailableAdapter
    : httpAdapter;
