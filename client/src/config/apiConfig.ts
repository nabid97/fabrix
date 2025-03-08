import axios from 'axios';

// Default API configuration
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Create Axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/auth
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    // This is already handled by withCredentials for cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (session expired)
    if (error.response && error.response.status === 401) {
      // You can handle redirection to login or refresh token logic here
      console.error('Session expired or unauthorized');
      // Optional: Redirect to login
      // window.location.href = '/login';
    }
    
    // Handle 500 and other server errors
    if (error.response && error.response.status >= 500) {
      console.error('Server error occurred');
      // You can show a notification to the user here
    }
    
    return Promise.reject(error);
  }
);

export default api;