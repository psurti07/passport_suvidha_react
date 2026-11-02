/**
 * Option lists for the Apply Now form. Labels and values match the current
 * Passport Suvidha application form unless marked UNVERIFIED.
 */

type Option = { value: string; label: string };

export const genderOptions: Option[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

/** Values as stored by the original form (StepFamilyDetails.tsx). "married" makes the spouse name required. */
export const maritalStatusOptions: Option[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'widow', label: 'Widow' },
  { value: 'widower', label: 'Widower' },
  { value: 'separated', label: 'Separated' },
  { value: 'divorced', label: 'Divorced' },
];
export const MARRIED = 'married';

export const educationOptions: Option[] = [
  { value: '7th Pass Or Less', label: '7th pass or less' },
  { value: 'Between 8th And 9th Standard', label: 'Between 8th and 9th standard' },
  { value: '10th Pass And Above', label: '10th pass and above' },
  { value: 'Graduate And Above', label: 'Graduate and above' },
];

export const employmentOptions: Option[] = [
  { value: 'Government', label: 'Government' },
  { value: 'Private', label: 'Private' },
  { value: 'Self Employed', label: 'Self employed' },
  { value: 'Student', label: 'Student' },
  { value: 'Homemaker', label: 'Homemaker' },
  { value: 'Retired', label: 'Retired' },
  { value: 'Others', label: 'Others' },
];

/** The original form asks for the organisation name only for government employees. */
export const ORGANISATION_REQUIRED_FOR = ['Government'];

export const indianStates: string[] = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];
export const stateOptions: Option[] = indianStates.map((s) => ({ value: s, label: s }));
