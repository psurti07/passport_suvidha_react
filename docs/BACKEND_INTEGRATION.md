# Backend integration guide

For the developer connecting the redesigned pages to the Laravel backend. Everything below was
read from the original application's code at commit `b7fe4a2`
(`components/passport-application/ApplicationForm.tsx`, `app/api/**`, `app/contact/page.tsx`).
No production endpoint was called while building or testing this project.

## 1. Switching from preview to live

| Variable | Preview | Live |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | empty | Laravel API base URL (no trailing slash) |
| `NEXT_PUBLIC_USE_MOCKS` | `true` | `false` |
| `NEXT_PUBLIC_RAZORPAY_KEY` | empty | public key id (never the secret) |

With the API URL empty the Apply flow runs a **local simulation** (`lib/redesign/config/applyFlow.ts`):
no OTP is sent, nothing leaves the browser, code `1234` continues, `0000` previews the expired
state, police stations are two samples, fees come from `lib/redesign/config/applyFees.ts`
(placeholders) and Pay says no payment was taken. The page carries no demo banners; a small
**Test environment** indicator explains this to testers. It can never run with
`NEXT_PUBLIC_SITE_ENV=production` (see `CLIENT_INTEGRATION_GUIDE.md` §5).

Setting both variables switches the redesigned pages to `httpAdapter` and removes the indicator.
The original pages (`app/(legacy)`) use `NEXT_PUBLIC_API_BASE_URL` exactly as before.

## 2. Apply Now — adapter contract

The UI talks only to `ApplicationAdapter` (`lib/redesign/services/applicationService.ts`).
Field mapping and endpoints live in that one file.

| Step | Adapter call | Endpoint (as in the original app) | Body sent |
|---|---|---|---|
| 1 → 2 | `sendOtp` | `POST /api/otp/send` → backend `/otp/send` | `mobile_number`, `purpose: "registration"` |
| 2 | `verifyOtp` (1/2) | `POST /api/otp/verify` | `mobile_number`, `otp`, `purpose: "registration"` |
| 2 | `verifyOtp` (2/2) | `POST /api/customers/create` | `full_name`, `email`, `mobile_number`, `service_code` (`NP36`/`NP60`/`TP36`/`TP60`) → returns `token`, `next_step` |
| 3 → 4 | `saveFamilyDetails` | `POST /api/customer/family-details` (Bearer token) | `father_name`, `mother_name`, `marital_status`, `spouse_name`, `is_ps_gov_emp`, `emergency_contact_name`, `emergency_contact_mobile`, `emergency_contact_email` |
| 4 | `getPoliceStations` | `GET /api/police-stations?pincode=` | — |
| 4 → 5 | `savePersonalDetails` | `POST /api/customer/personal-details` (Bearer token) | `address`, `pin_code`, `city`, `state`, `is_address_permanent` (1/0), `permanent_*`, `police_station_name`, `gender`, `date_of_birth` (YYYY-MM-DD), `birth_city`, `birth_district`, `birth_state`, `education_qualification`, `employment_type`, `organisation_name`, `is_ps_gov_emp` |
| 5 | `getServicePricing` | `GET {API}/services/passport` | → `{ success, data: [{ service_code, service_name, service_charges, service_gst, service_total_amount }] }` |
| 5 | `startPayment` | **not implemented** — see §3 | |
| Edit from review | `updateBasicDetails` | **no confirmed endpoint** — see `CLIENT_INTEGRATION_GUIDE.md` §5 | Refuses until connected |

`/api/*` paths are this app's own route handlers (unchanged from the original), which forward to the
backend; they are called same-origin. `/services/passport` and the payment endpoints are called on
the backend directly, as the original does.

Option values match what the original stores: marital status `single | married | widow | widower |
separated | divorced`; education `7th Pass Or Less | Between 8th And 9th Standard | 10th Pass And Above
| Graduate And Above`; employment `Government | Private | Self Employed | Student | Homemaker | Retired |
Others`; organisation name required only for `Government`; gender `male | female | other`.

**Errors.** 422 `{ message, errors }` shows the message and puts each field error on its field
(snake_case keys are mapped to the form's names). A 4xx on OTP verify shows "code not correct or
expired". 401 later in the flow shows "session expired". Network failures show a retry message.

### Differences from the original flow — decide before going live

| Topic | Original | Redesign | Action |
|---|---|---|---|
| Session token | `localStorage.token` | In memory only (lost on refresh) | Keep, or persist if the portal needs it after payment |
| Resume a started application | `localStorage` form copy + `POST /check-user` (`is_lead`, `registration_step`) | Not wired; personal data is never stored in the browser | Wire `/check-user` in `sendOtp` if resuming is wanted |
| Marketing consent checkbox | Pre-ticked, not sent | Unticked by default, not sent | Decide how consent is recorded |
| `otp_verified_auto` dataLayer event | Pushed after verification | Not pushed | See docs/TRACKING_INTEGRATION.md |
| Offer flows (`encryptId`) | Passed to `/customers/create` | Not used | Only needed if offers link into this form |

### Findings in the original backend integration (not changed)

- `app/api/police-stations/route.ts` returns the **same 8 Surat police stations for every PIN code**
  (hard-coded). Applicants elsewhere cannot pick their real station. Needs a real lookup.
- The original Step 1 calls `/check-user` and Step 5 calls `/services/passport` **directly from the
  browser** to the backend (CORS must allow the site's origin).
- The original form validates `"Married"` (capitalised) when moving on from Step 3 while storing
  `"married"`, so that check never fires; the step's own check does. The redesign uses `married`.
- `lib/authUtils.ts` calls `cookies().delete` without `await` (Next.js 15 returns a Promise).
- `next.config.mjs` ignores TypeScript errors during builds; `npx tsc --noEmit` reports 29 errors in
  original files (none in the redesign).

## 3. Payment (not connected)

No payment script loads and no payment can be processed. To connect, implement
`httpAdapter.startPayment` following the original:

1. `POST {API}/create-order` with the Bearer token → order `{ id, amount, currency, … }`.
2. Load `https://checkout.razorpay.com/v1/checkout.js`; open it with `NEXT_PUBLIC_RAZORPAY_KEY`,
   the order id and the applicant's name / email / mobile as prefill.
3. On success: `POST {API}/verify-payment` (`razorpay_order_id`, `razorpay_payment_id`,
   `razorpay_signature`), then go to `/payment-response?status=success`.
4. On failure: `POST {API}/payment-failed`, then `/payment-response?status=failed`;
   on dismiss: `/payment-response?status=cancelled`.

The fee shown in Step 5 comes from `/services/passport` once connected (the preview figures are not
used then). Government fees are always separate.

## 4. Other redesigned forms

| Page | Adapter | Endpoint (original) | Body |
|---|---|---|---|
| Contact | `submitContact` | `POST {API}/contact/enquiry` | `full_name`, `email`, `subject`, `message`, `mobile_number` |
| Locations search | `searchOffices` | `GET {API}/locations?search=` | — (map the response to `PassportOffice` in `formsService.ts`) |
| Blog | `blogService.ts` | none yet | The blog stays an empty, `noindex` state until a blog API exists |

Application status and the fee calculator use the original pages, which already work.

## 5. Checklist

- [ ] Staging API URL, CORS for the staging domain
- [ ] OTP: real SMS on staging; wrong / expired / resend behaviour
- [ ] Police station lookup by PIN (replace the hard-coded list)
- [ ] Pricing from `/services/passport`; confirm GST handling
- [ ] Razorpay test mode end to end, including failure and cancel
- [ ] Contact enquiry and location search responses
- [ ] Decide token persistence, resume and consent recording (table above)
