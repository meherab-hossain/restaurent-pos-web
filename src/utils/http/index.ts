import cookies from '@/utils/cookies';
import axios, { AxiosInstance } from 'axios';

// user api instance
const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to dynamically add the token
http.interceptors.request.use((config) => {
  const token = cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Admin api instance
const siteApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Authorization': `Bearer ${cookies.get('admin_token')}`,
    'Content-Type': 'application/json',
  }
});

export { http, siteApi };

