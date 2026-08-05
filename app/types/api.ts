/**
 * Common API response type
 */
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
}

/**
 * Profile data structure based on the actual API response
 */
export interface ProfileData {
  id: number;
  full_name: string;
  mobile_number: string;
  email: string;
  father_name: string;
  mother_name: string;
  marital_status: string;
  spouse_name: string;
  emergency_contact_name: string;
  emergency_contact_email: string;
  emergency_contact_mobile: string;
  address: string;
  pin_code: string;
  city: string;
  state: string;
  police_station_name: string;
  gender: string;
  date_of_birth: string;
  place_of_birth: string;
  nationality: string;
  payment_info_id: number | null;
  service_code: string;
  is_paid: boolean;
  registration_step: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  education_qualification: string;
  employment_type: string;
}
