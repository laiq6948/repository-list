import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { HTTP_TIMEOUT } from '../constants';

// Create axios instance
const http = axios.create({
  // In real world project, API domain usually changes with PRD, STG, etc. So we define it on .env file.
  baseURL: import.meta.env.VITE_GITHUB_API,
  timeout: HTTP_TIMEOUT,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
  responseType: 'json',
});

// Request Interceptor
// Request may be intercepted in real world project.
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(Error(error.message));
  }
);

// Response Interceptor
// Response may be intercepted in real world project.
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // For simplicity, only return data of response.
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(Error(error.message));
  }
);

export default http;
