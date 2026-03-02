import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Skip redirect for OTP verification and other specific endpoints
    const skipRedirectEndpoints = ['/otp/verify', '/otp/send'];
    const requestUrl = error.config?.url || '';
    
    // Check if we should skip the redirect for this endpoint
    const shouldSkipRedirect = skipRedirectEndpoints.some(endpoint => 
      requestUrl.includes(endpoint)
    );
    
    // For OTP verification, don't log the full error to console
    if (shouldSkipRedirect) {
      // Just pass through the error without additional console logging
      // This prevents the red error in the console
      const customError = {
        ...error,
        // Keep necessary properties for error handling
        response: error.response,
        message: error.message
      };
      return Promise.reject(customError);
    }
    
    // Only redirect for 401 errors on endpoints that aren't in the skip list
    if (typeof window !== 'undefined' && 
        error.response?.status === 401 && 
        !shouldSkipRedirect) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient; 