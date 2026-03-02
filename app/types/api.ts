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
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  address: string;
  pin_code: string;
  city: string;
  state: string;
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
} 