import { MARRIED, ORGANISATION_REQUIRED_FOR } from '@/lib/redesign/data/applyOptions';
import type { BasicDetails, FamilyDetails, PersonalDetails } from '@/lib/redesign/types/application';
import { email, indianMobile, maxLength, notSameAs, pastDateDMY, personName, pinCode, required, runRules, type Rule } from './validation';

/**
 * Step-level validation for the Apply Now journey. Rules follow the current
 * Passport Suvidha form; schemas are functions of the step's values so that
 * conditional fields (spouse name, permanent address, organisation) are only
 * required when they are shown.
 */

export type StepErrors<T> = Partial<Record<keyof T & string, string>>;
export type StepSchema<T> = (values: T) => { [K in keyof T & string]?: Array<Rule<T[K]>> };

export function validateStep<T extends object>(values: T, schema: StepSchema<T>): StepErrors<T> {
  const rules = schema(values);
  const errors: StepErrors<T> = {};
  (Object.keys(rules) as Array<keyof T & string>).forEach((k) => {
    const err = runRules(values[k], rules[k]);
    if (err) errors[k] = err;
  });
  return errors;
}

export function validateField<T extends object>(values: T, schema: StepSchema<T>, field: keyof T & string): string | undefined {
  return runRules(values[field], schema(values)[field]);
}

const name = (label: string) => [required(`${label} is required.`), personName(), maxLength(100)] as Rule[];

export const basicSchema: StepSchema<BasicDetails> = () => ({
  fullName: name('Full name'),
  email: [required('Email address is required.'), email()],
  mobile: [required('Mobile number is required.'), indianMobile()],
  passportType: [required('Please choose Normal or Tatkal.')],
  bookSize: [required('Please choose a booklet size.')],
  acceptedTerms: [required('Please accept the Terms of Use and Privacy Policy to continue.')],
});

/** Needs the applicant's own mobile/email so the emergency contact can't repeat them. */
export const familySchema =
  (applicant: Pick<BasicDetails, 'mobile' | 'email'>): StepSchema<FamilyDetails> =>
  (v) => ({
    fatherName: name("Father's name"),
    motherName: name("Mother's name"),
    maritalStatus: [required('Please select marital status.')],
    ...(v.maritalStatus === MARRIED ? { spouseName: name('Spouse name') } : {}),
    isPsGovEmp: [required('Please select whether your parent or spouse is a government employee.')],
    emergencyContactName: name('Emergency contact name'),
    emergencyContactMobile: [
      required('Emergency contact number is required.'),
      indianMobile(),
      notSameAs(applicant.mobile, 'Emergency contact number cannot be the same as your mobile number.'),
    ],
    emergencyContactEmail: [
      required('Emergency contact email is required.'),
      email(),
      notSameAs(applicant.email, 'Emergency contact email cannot be the same as your email.'),
    ],
  });

const place = (label: string): Rule[] => [
  required(`${label} is required.`),
  (v) => (/\d/.test(v) ? `${label} should not contain numbers.` : undefined),
  maxLength(100),
];

export const personalSchema: StepSchema<PersonalDetails> = (v) => ({
  address: [required('Address is required.'), maxLength(250)],
  zipCode: [required('PIN code is required.'), pinCode()],
  city: place('City'),
  state: [required('State is required.')],
  isAddressPermanent: [required('Please tell us if this is also your permanent address.')],
  ...(v.isAddressPermanent === 'no'
    ? {
        permanentAddress: [required('Permanent address is required.'), maxLength(250)],
        permanentPinCode: [required('Permanent PIN code is required.'), pinCode()],
        permanentCity: place('Permanent city'),
        permanentState: [required('Permanent state is required.')],
      }
    : {}),
  policeStationName: [required('Please select a police station.')],
  gender: [required('Gender is required.')],
  dateOfBirth: [required('Date of birth is required.'), pastDateDMY()],
  birthCity: place('Birth city'),
  birthDistrict: place('Birth district'),
  birthState: [required('Birth state is required.')],
  educationQualification: [required('Education qualification is required.')],
  employmentType: [required('Employment type is required.')],
  ...(ORGANISATION_REQUIRED_FOR.includes(v.employmentType) ? { organisationName: [required('Organisation name is required.'), maxLength(150)] } : {}),
});
