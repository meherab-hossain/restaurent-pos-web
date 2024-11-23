import cookies from '@/utils/cookies';
import axios, { AxiosInstance } from 'axios';

// user api instance
const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Authorization': `Bearer ${cookies.get('token')}`,
    'Content-Type': 'application/json',
  }
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

