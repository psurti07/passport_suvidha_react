/**
 * Apply Now form data. Field set follows the current Passport Suvidha
 * application flow; the HTTP adapter maps these camelCase names to the
 * backend's field names (see services/applicationService.ts).
 */

export type PassportType = 'normal' | 'tatkal';
export type BookSize = '36' | '60';
/** Backend service codes: NP36, NP60, TP36, TP60. */
export type ServiceCode = `${'NP' | 'TP'}${BookSize}`;

export interface BasicDetails {
  fullName: string;
  email: string;
  mobile: string;
  passportType: PassportType;
  bookSize: BookSize;
  acceptedTerms: boolean;
  marketingOptIn: boolean;
}

export interface FamilyDetails {
  fatherName: string;
  motherName: string;
  maritalStatus: string;
  spouseName: string;
  /** Parent or spouse is a government employee: '1' yes, '0' no, '' unanswered. */
  isPsGovEmp: '' | '0' | '1';
  emergencyContactName: string;
  emergencyContactMobile: string;
  emergencyContactEmail: string;
}

export interface PersonalDetails {
  address: string;
  zipCode: string;
  city: string;
  state: string;
  /** Is the current address also the permanent address? */
  isAddressPermanent: '' | 'yes' | 'no';
  permanentAddress: string;
  permanentPinCode: string;
  permanentCity: string;
  permanentState: string;
  policeStationName: string;
  gender: string;
  /** DD/MM/YYYY */
  dateOfBirth: string;
  birthCity: string;
  birthDistrict: string;
  birthState: string;
  educationQualification: string;
  employmentType: string;
  organisationName: string;
}

export interface ApplicationData {
  basic: BasicDetails;
  family: FamilyDetails;
  personal: PersonalDetails;
}

export interface PoliceStation {
  id: string;
  name: string;
}

export interface ServicePricing {
  serviceName: string;
  serviceCharge: number;
  gst: number;
  total: number;
  currency: 'INR';
  features?: string[];
}

export const serviceCodeFor = (b: Pick<BasicDetails, 'passportType' | 'bookSize'>): ServiceCode =>
  `${b.passportType === 'tatkal' ? 'TP' : 'NP'}${b.bookSize}`;
