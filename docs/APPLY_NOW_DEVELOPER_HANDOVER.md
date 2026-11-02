# Apply Now: developer handover

`/apply-passport` is the approved 5-step frontend: Basic Details, OTP Verification, Family Details, Personal
Details, Review & Pay. **It is delivered as a frontend-only demo.** It sends no SMS, saves nothing to a backend and
takes no payment. OTP, submission and payment are for the client's developer to connect. Do not change the UI to do this.

## Demo behaviour

| Item | Demo |
|---|---|
| OTP | `1234` continues. `0000` shows the expired state. Any other code shows an error. No SMS is sent |
| Family, personal and basic-details saves | Succeed locally, nothing is sent |
| Police stations | Two samples |
| Fees | Placeholders from `lib/redesign/config/applyFees.ts` |
| Pay button | Shows that no payment was taken. No gateway loads, and there is no success screen |

The notes beside the OTP and Pay actions, and the small "Test environment" indicator, appear only with the demo
adapter and disappear by themselves once it is replaced.

## Where things are

| What | Where |
|---|---|
| All backend calls (the only file to change) | `lib/redesign/services/applicationService.ts` |
| Demo OTP code | `DEMO_OTP` in `lib/redesign/config/applyFlow.ts` |
| Demo OTP logic | `demoAdapter.verifyOtp` in `applicationService.ts` |
| Real OTP (written, not tested) | `httpAdapter.sendOtp` and `httpAdapter.verifyOtp` in `applicationService.ts` |
| Payment integration point | `httpAdapter.startPayment` in `applicationService.ts`, called from `components/redesign/apply/steps/ReviewStep.tsx` |
| Form data structure | `lib/redesign/types/application.ts`: `BasicDetails`, `FamilyDetails`, `PersonalDetails` |
| Backend field mapping | `httpAdapter.saveFamilyDetails` and `savePersonalDetails` in `applicationService.ts` |
| Validation rules | `lib/redesign/utils/applyValidation.ts`: `basicSchema`, `familySchema`, `personalSchema` |
| Step order, navigation, edit and return | `lib/redesign/config/applyFlow.ts`, `lib/redesign/hooks/useApplyWizard.ts` |
| Page text and section settings | `lib/redesign/config/applyContent.ts` |
| Screens | `components/redesign/pages/ApplyPage.tsx`, `components/redesign/apply/` |

The adapter is chosen at the end of `applicationService.ts`:

| Settings | Adapter |
|---|---|
| Default (no settings) | `demoAdapter` |
| `NEXT_PUBLIC_USE_MOCKS=false` and `NEXT_PUBLIC_API_BASE_URL` set | `httpAdapter` |
| `NEXT_PUBLIC_SITE_ENV=production` without the two above | `unavailableAdapter`: refuses every step, never simulates |

## Replace the demo OTP with real verification

1. On staging, set `NEXT_PUBLIC_USE_MOCKS=false` and `NEXT_PUBLIC_API_BASE_URL`.
2. Test `httpAdapter.sendOtp` and `verifyOtp`. They call `/api/otp/send`, `/api/otp/verify`, then
   `/api/customers/create`, the same routes as the original form, and keep the session token in memory.
3. Confirm that `/api/customers/create` updates the customer when the number changes, rather than creating a second one.
   Changing the number from Review & Pay already requires a new OTP.

## Connect the existing backend

Test the rest of `httpAdapter` against the existing `app/api` routes, all of which are preserved:

- `saveFamilyDetails`, `savePersonalDetails`, `getPoliceStations`, `getServicePricing`.
- `updateBasicDetails` **refuses for now**. No endpoint for changing name, email or service after registration was
  confirmed, so one has to be connected. `/api/customer/select-service` expects different service codes.
- Resume links: `/process?id=...` stores `token`, `passportFormData` and `passportFormStep` in `localStorage`, then
  opens `/apply-passport`. Only the original form read these. Connect them to `useApplyWizard` if resume is required.
- Conversion events: only the original form pushed to `dataLayer` (`otp_verified_auto`). Add events to the
  adapter calls. Fire payment conversions only after a verified payment.

The original form stays in `components/passport-application/` as a reference for these contracts. It is not routed. Do not
route it again.

## Connect the payment gateway

Implement `httpAdapter.startPayment`. The original flow was:

1. `POST {API}/create-order` with the Bearer token.
2. Load Razorpay checkout with `NEXT_PUBLIC_RAZORPAY_KEY` (public key id only).
3. On success, `POST {API}/verify-payment`, then go to `/payment-response?status=success`.
4. On failure, `POST {API}/payment-failed`, then `/payment-response?status=failed`. On dismiss, `?status=cancelled`.

The Review & Pay design and button stay as they are. `docs/BACKEND_INTEGRATION.md` has more detail.

## Before going live

A default build is `noindex` with tracking off and the demo running, so **it must not replace the live site.** Set the
"Going live" block in `.env.example`, test on staging using `docs/PRODUCTION_ROLLOUT.md`, and only then deploy.
