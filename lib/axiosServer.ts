import axios from 'axios';

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  },
  timeout: 10000,
  withCredentials: true
});

export default axiosServer; 