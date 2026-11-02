import { useCallback, useMemo, useReducer, useRef } from 'react';
import { APPLY_STEPS, type ApplyStepId } from '@/lib/redesign/config/applyFlow';
import type { ApplicationData, BasicDetails, FamilyDetails, PersonalDetails } from '@/lib/redesign/types/application';
import { basicSchema, familySchema, personalSchema, validateStep } from '@/lib/redesign/utils/applyValidation';

/**
 * Shared state for the Apply Now journey.
 *
 * Held in memory only: personal details are never written to localStorage or
 * sessionStorage, so a page refresh starts over. Values survive Back/Next.
 * Changing the mobile number after verification clears the verification, so
 * the new number has to be verified again.
 *
 * Edit from Review & Pay: `editing` names the section being changed and `snapshot` holds
 * what to restore on Cancel. Saving returns straight to review, unless the mobile number
 * changed (it must be verified first) or the change made another section invalid (that
 * section opens next). The rules live in the reducer, so they cannot be bypassed.
 */

export const emptyApplication = (basic?: Partial<BasicDetails>): ApplicationData => ({
  basic: {
    fullName: '',
    email: '',
    mobile: '',
    passportType: 'normal',
    bookSize: '36',
    acceptedTerms: false,
    marketingOptIn: false,
    ...basic,
  },
  family: {
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    spouseName: '',
    isPsGovEmp: '',
    emergencyContactName: '',
    emergencyContactMobile: '',
    emergencyContactEmail: '',
  },
  personal: {
    address: '',
    zipCode: '',
    city: '',
    state: '',
    isAddressPermanent: '',
    permanentAddress: '',
    permanentPinCode: '',
    permanentCity: '',
    permanentState: '',
    policeStationName: '',
    gender: '',
    dateOfBirth: '',
    birthCity: '',
    birthDistrict: '',
    birthState: '',
    educationQualification: '',
    employmentType: '',
    organisationName: '',
  },
});

export type EditSection = 'basic' | 'family' | 'personal';

interface WizardState {
  step: ApplyStepId;
  /** Furthest step reached — steps up to here can be revisited from the progress bar. */
  furthest: number;
  data: ApplicationData;
  /** Mobile number that passed verification, or null. */
  verifiedMobile: string | null;
  /** Section being edited from Review & Pay, or null in the normal flow. */
  editing: EditSection | null;
  /** State to restore if the edit is cancelled. */
  snapshot: Pick<WizardState, 'data' | 'verifiedMobile'> | null;
  /** The edit moved here because another change made this section invalid. */
  editDependency: boolean;
  /** Section saved by the last completed edit (review opens it and confirms the update). */
  lastEdited: EditSection | null;
}

/** First section whose saved values no longer pass validation (e.g. after an edit elsewhere). */
export function firstInvalidSection(data: ApplicationData): EditSection | null {
  if (Object.keys(validateStep(data.basic, basicSchema)).length) return 'basic';
  if (Object.keys(validateStep(data.family, familySchema(data.basic))).length) return 'family';
  if (Object.keys(validateStep(data.personal, personalSchema)).length) return 'personal';
  return null;
}

type Action =
  | { type: 'basic'; patch: Partial<BasicDetails> }
  | { type: 'family'; patch: Partial<FamilyDetails> }
  | { type: 'personal'; patch: Partial<PersonalDetails> }
  | { type: 'go'; step: ApplyStepId }
  | { type: 'verified'; mobile: string }
  | { type: 'edit-start'; section: EditSection }
  | { type: 'edit-cancel' }
  | { type: 'edit-complete' };

const indexOf = (id: ApplyStepId) => APPLY_STEPS.findIndex((s) => s.id === id);

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'basic': {
      const basic = { ...state.data.basic, ...action.patch };
      const mobileChanged = action.patch.mobile !== undefined && action.patch.mobile !== state.verifiedMobile;
      return {
        ...state,
        data: { ...state.data, basic },
        // A different number must be verified again; later steps are locked until then.
        // (While editing from review, 'edit-complete' enforces this and Cancel can still restore.)
        ...(mobileChanged && state.verifiedMobile && !state.editing ? { verifiedMobile: null, furthest: indexOf('basic') } : {}),
      };
    }
    case 'family':
      return { ...state, data: { ...state.data, family: { ...state.data.family, ...action.patch } } };
    case 'personal':
      return { ...state, data: { ...state.data, personal: { ...state.data.personal, ...action.patch } } };
    case 'go': {
      const i = indexOf(action.step);
      // Steps after verification need this exact number verified
      if (i > indexOf('verify') && state.verifiedMobile !== state.data.basic.mobile) return state;
      return { ...state, step: action.step, furthest: Math.max(state.furthest, i) };
    }
    case 'verified':
      return { ...state, verifiedMobile: action.mobile };
    case 'edit-start':
      return {
        ...state,
        step: action.section,
        editing: action.section,
        snapshot: state.snapshot ?? { data: state.data, verifiedMobile: state.verifiedMobile },
        editDependency: false,
        lastEdited: null,
      };
    case 'edit-cancel':
      if (!state.snapshot) return state;
      return { ...state, ...state.snapshot, step: 'review', editing: null, snapshot: null, editDependency: false };
    case 'edit-complete': {
      if (!state.editing) return state;
      // Never back to a payment-ready state with an unverified number
      if (state.verifiedMobile !== state.data.basic.mobile) return { ...state, step: 'verify' };
      const invalid = firstInvalidSection(state.data);
      if (invalid) return { ...state, step: invalid, editing: invalid, editDependency: true };
      return { ...state, step: 'review', editing: null, snapshot: null, editDependency: false, lastEdited: state.editing };
    }
  }
}

export function useApplyWizard(initialBasic?: Partial<BasicDetails>) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    step: 'basic' as ApplyStepId,
    furthest: 0,
    data: emptyApplication(initialBasic),
    verifiedMobile: null,
    editing: null,
    snapshot: null,
    editDependency: false,
    lastEdited: null,
  }));

  const index = indexOf(state.step);

  const actions = useMemo(
    () => ({
      updateBasic: (patch: Partial<BasicDetails>) => dispatch({ type: 'basic', patch }),
      updateFamily: (patch: Partial<FamilyDetails>) => dispatch({ type: 'family', patch }),
      updatePersonal: (patch: Partial<PersonalDetails>) => dispatch({ type: 'personal', patch }),
      goTo: (step: ApplyStepId) => dispatch({ type: 'go', step }),
      markVerified: (mobile: string) => dispatch({ type: 'verified', mobile }),
      startEdit: (section: EditSection) => dispatch({ type: 'edit-start', section }),
      cancelEdit: () => dispatch({ type: 'edit-cancel' }),
      completeEdit: () => dispatch({ type: 'edit-complete' }),
    }),
    [],
  );

  const next = useCallback(() => {
    if (state.editing) return actions.completeEdit();
    let n = index + 1;
    // Already verified this number (came Back to Basic details): skip the code screen
    if (APPLY_STEPS[n]?.id === 'verify' && state.verifiedMobile === state.data.basic.mobile) n += 1;
    if (APPLY_STEPS[n]) actions.goTo(APPLY_STEPS[n].id);
  }, [index, state.editing, state.verifiedMobile, state.data.basic.mobile, actions]);

  const back = useCallback(() => {
    let p = index - 1;
    // Once verified, Back from Family returns to Basic details rather than the code screen
    if (APPLY_STEPS[p]?.id === 'verify' && state.verifiedMobile) p -= 1;
    if (p >= 0) actions.goTo(APPLY_STEPS[p].id);
  }, [index, state.verifiedMobile, actions]);

  return {
    ...state,
    index,
    total: APPLY_STEPS.length,
    isVerified: state.verifiedMobile !== null && state.verifiedMobile === state.data.basic.mobile,
    /** Review & Pay has been reached: earlier steps now open as edits that return to it. */
    reachedReview: state.furthest === indexOf('review'),
    /** Whether a section differs from what it was when the edit started (no needless saves). */
    sectionChanged: (section: EditSection) =>
      !state.snapshot || JSON.stringify(state.snapshot.data[section]) !== JSON.stringify(state.data[section]),
    next,
    back,
    ...actions,
  };
}

export type ApplyWizard = ReturnType<typeof useApplyWizard>;

/**
 * Guards an async action against double submission (double clicks, Enter
 * pressed twice). `busy` drives the button's disabled/loading state.
 */
export function useSubmitLock() {
  const lock = useRef(false);
  const [busy, setBusy] = useReducer((_: boolean, v: boolean) => v, false);
  const run = useCallback(async <T,>(fn: () => Promise<T>): Promise<T | undefined> => {
    if (lock.current) return undefined;
    lock.current = true;
    setBusy(true);
    try {
      return await fn();
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }, []);
  return { busy, run };
}
