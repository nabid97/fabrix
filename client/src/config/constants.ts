/**
 * Application-wide constants
 */

// Site Information
export const SITE_NAME = 'FabriX';
export const SITE_DESCRIPTION = 'Premium fabrics and custom clothing solutions for businesses';
export const SITE_URL = 'https://fabrix.com';
export const SUPPORT_EMAIL = process.env.REACT_APP_SUPPORT_EMAIL || 'support@fabrix.com';
export const SUPPORT_PHONE = process.env.REACT_APP_SUPPORT_PHONE || '+1-555-123-4567';

// Cart & Orders
export const MINIMUM_ORDER_AMOUNT = 50; // Minimum order amount in dollars
export const SHIPPING_THRESHOLD = 500; // Free shipping threshold in dollars
export const DEFAULT_SHIPPING_COST = 15; // Default shipping cost
export const TAX_RATE = 0.07; // 7% tax rate

// Product-related
export const CLOTHING_MIN_QUANTITY = 50; // Minimum clothing order quantity
export const FABRIC_MIN_LENGTH = 5; // Minimum fabric order length in meters

// Logo Generator
export const LOGO_STYLES = [
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'modern', name: 'Modern' },
  { id: 'abstract', name: 'Abstract' },
  { id: 'geometric', name: 'Geometric' },
  { id: 'handdrawn', name: 'Hand-drawn' },
];

// Color schemes
export const COLOR_SCHEMES = [
  { id: 'monochrome', name: 'Monochrome', colors: ['#000000', '#FFFFFF'] },
  { id: 'blue', name: 'Blue', colors: ['#1E3A8A', '#3B82F6', '#93C5FD'] },
  { id: 'green', name: 'Green', colors: ['#065F46', '#10B981', '#A7F3D0'] },
  { id: 'red', name: 'Red', colors: ['#7F1D1D', '#EF4444', '#FECACA'] },
  { id: 'purple', name: 'Purple', colors: ['#4C1D95', '#8B5CF6', '#DDD6FE'] },
  { id: 'orange', name: 'Orange', colors: ['#7C2D12', '#F97316', '#FFEDD5'] },
  { id: 'custom', name: 'Custom Colors', colors: [] },
];

// Color options with hex values
export const COLOR_OPTIONS = [
  { name: 'White', value: 'white', hex: '#FFFFFF' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'Navy', value: 'navy', hex: '#0a192f' },
  { name: 'Red', value: 'red', hex: '#e11d48' },
  { name: 'Green', value: 'green', hex: '#059669' },
  { name: 'Blue', value: 'blue', hex: '#3b82f6' },
  { name: 'Gray', value: 'gray', hex: '#6b7280' },
  { name: 'Yellow', value: 'yellow', hex: '#fbbf24' },
  { name: 'Purple', value: 'purple', hex: '#8b5cf6' },
  { name: 'Pink', value: 'pink', hex: '#ec4899' },
  { name: 'Beige', value: 'beige', hex: '#e5e7eb' },
  { name: 'Brown', value: 'brown', hex: '#92400e' },
];

// Shipping & Delivery
export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Standard shipping via courier',
    price: 15.0,
    estimatedDelivery: '5-10 business days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Expedited delivery via air freight',
    price: 35.0,
    estimatedDelivery: '2-3 business days',
  },
  {
    id: 'priority',
    name: 'Priority Shipping',
    description: 'Priority delivery with tracking',
    price: 50.0,
    estimatedDelivery: '1-2 business days',
  },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// Authentication & User
export const PASSWORD_MIN_LENGTH = 8;
export const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// FAQ Topics
export const FAQ_TOPICS = [
  { id: 'ordering', name: 'Ordering & Payment' },
  { id: 'products', name: 'Products & Customization' },
  { id: 'shipping', name: 'Shipping & Delivery' },
  { id: 'returns', name: 'Returns & Exchanges' },
  { id: 'account', name: 'Account & Privacy' },
];

// Social Media
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/fabrix',
  INSTAGRAM: 'https://instagram.com/fabrix',
  TWITTER: 'https://twitter.com/fabrix',
  LINKEDIN: 'https://linkedin.com/company/fabrix',
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/users',
    LOGIN: '/api/users/login',
    LOGOUT: '/api/users/logout',
    PROFILE: '/api/users/profile',
  },
  PRODUCTS: {
    ALL: '/api/products',
    CLOTHING: '/api/products/clothing',
    FABRIC: '/api/products/fabric',
  },
  ORDERS: {
    CREATE: '/api/orders',
    LIST: '/api/orders',
    DETAIL: '/api/orders/', // append orderId
    MY_ORDERS: '/api/orders/myorders',
  },
  PAYMENT: {
    CREATE_INTENT: '/api/payments/create-payment-intent',
  },
  LOGO: {
    GENERATE: '/api/logo/generate',
    UPLOAD: '/api/logo/upload',
  },
  CHAT: {
    GEMINI: '/api/chat/gemini',
    FAQ: '/api/chat/faq',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'fabrix_cart',
  AUTH_TOKEN: 'fabrix_auth_token',
  USER_SETTINGS: 'fabrix_user_settings',
  THEME_PREFERENCE: 'fabrix_theme',
  RECENTLY_VIEWED: 'fabrix_recently_viewed',
};