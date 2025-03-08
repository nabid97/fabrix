// src/config/constants.ts

// API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Site information
export const SITE_NAME = 'Fabrix';
export const SITE_DESCRIPTION = 'Custom fabrics and logo services for your business';
export const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://fabrix.com';

// Authentication
export const JWT_TOKEN_NAME = 'fabrix_auth_token';
export const USER_DATA_NAME = 'fabrix_user_data';

// Stripe
export const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

// Order status options
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Pagination
export const DEFAULT_PAGE_SIZE = 12;

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

// Logo positions
export const LOGO_POSITIONS = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-center', label: 'Top Center' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'center-left', label: 'Center Left' },
  { value: 'center', label: 'Center' },
  { value: 'center-right', label: 'Center Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-center', label: 'Bottom Center' },
  { value: 'bottom-right', label: 'Bottom Right' }
];

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/fabrix',
  TWITTER: 'https://twitter.com/fabrix',
  INSTAGRAM: 'https://instagram.com/fabrix',
  LINKEDIN: 'https://linkedin.com/company/fabrix'
};

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'info@fabrix.com',
  PHONE: '+1 (555) 123-4567',
  ADDRESS: '123 Fabric Street, Textile City, TC 12345'
};