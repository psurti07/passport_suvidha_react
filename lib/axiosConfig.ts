// DEPRECATED: Use lib/axiosClient.ts for client-side and lib/axiosServer.ts for server-side/API routes.
// This file is kept for reference only and should not be imported.

import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers here
  },
  timeout: 10000, // Optional: Set a timeout for requests
});

// Optional: Add request interceptors (e.g., for adding auth tokens)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
    // Modify config before request is sent (e.g., add Authorization header)
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors (e.g., for handling errors globally)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error: AxiosError) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    if (error.response?.status === 401) {
      // Clear any existing tokens
      localStorage.removeItem('token');
      // Redirect to signin page
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 