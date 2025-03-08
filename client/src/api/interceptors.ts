import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from '../utils/authUtils';

/**
 * Configure API request interceptors
 * @param api Axios instance to configure
 * @param logoutCallback Optional callback to execute when auth error occurs
 */
export const setupInterceptors = (
  api: AxiosInstance,
  logoutCallback?: () => void
): AxiosInstance => {
  // Add a request interceptor to add auth token
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Don't add token to auth endpoints
      if (config.url?.includes('/auth/') && !config.url?.includes('/auth/logout')) {
        return config;
      }

      try {
        const token = await getAuthToken();
        
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.log('Error getting auth token:', error);
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle errors and refresh tokens
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      // Process response error
      const originalRequest = error.config;
      
      // Handle 401 Unauthorized errors
      if (
        error.response?.status === 401 &&
        originalRequest && 
        !(originalRequest as any)._retry &&
        !originalRequest?.url?.includes('/auth/login')
      ) {
        // Mark as retry to prevent infinite loops
        (originalRequest as any)._retry = true;
        
        // Try to refresh token or redirect to login
        if (logoutCallback) {
          logoutCallback();
        }
        
        return Promise.reject(error);
      }

      // Handle network errors
      if (!error.response) {
        return Promise.reject({
          ...error,
          message: 'Network error. Please check your internet connection.',
        });
      }

      // Handle 404 errors
      if (error.response.status === 404) {
        return Promise.reject({
          ...error,
          message: 'The requested resource was not found.',
        });
      }

      // Handle 403 Forbidden errors
      if (error.response.status === 403) {
        return Promise.reject({
          ...error,
          message: 'You do not have permission to access this resource.',
        });
      }

      // Handle 500 and other server errors
      if (error.response.status >= 500) {
        return Promise.reject({
          ...error,
          message: 'An error occurred on the server. Please try again later.',
        });
      }

      // Return the error with the original message or response data message
      return Promise.reject({
        ...error,
        message:
          (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data ? error.response.data.message : undefined) ||
          error.message ||
          'An unexpected error occurred.',
      });
    }
  );

  return api;
};

/**
 * Format error message from API error
 * @param error Axios error object
 * @returns Formatted error message
 */
export const formatApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    // Get the response data message if it exists
    const responseData = error.response?.data;
    
    if (typeof responseData === 'string') {
      return responseData;
    }
    
    if (responseData?.message) {
      return responseData.message;
    }
    
    if (responseData?.error) {
      return responseData.error;
    }
    
    if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
      return responseData.errors.map((e: any) => e.message || e).join(', ');
    }
    
    // Fall back to status text or error message
    return error.response?.statusText || error.message || 'An unexpected error occurred';
  }
  
  // For non-Axios errors
  return error?.message || 'An unexpected error occurred';
};