import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { ChatbotProvider } from '../contexts/ChatbotContext';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '../contexts/ToastContext';

// Mock authenticated user for testing
export const mockAuthenticatedUser = {
  username: 'admin@fabrix.com',
  attributes: {
    sub: '12345',
    email: 'admin@fabrix.com',
    name: 'Admin User',
    phone_number: '+15551234567',
    'custom:company': 'FabriX Inc.',
  },
  signInUserSession: {
    accessToken: {
      payload: {
        'cognito:groups': ['admin'],
      },
    },
  },
};

// Mock unauthenticated state
export const mockUnauthenticatedUser = null;

// All providers wrapper for testing
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <ChatbotProvider>
              <ToastProvider>{children}</ToastProvider>
            </ChatbotProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

// Custom render function that includes all providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock local storage
export class MockLocalStorage {
  private store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  key(index: number): string | null {
    return Object.keys(this.store)[index] || null;
  }

  get length(): number {
    return Object.keys(this.store).length;
  }
}

// Mock localStorage for testing
Object.defineProperty(window, 'localStorage', {
  value: new MockLocalStorage(),
});

// Mock sessionStorage for testing
Object.defineProperty(window, 'sessionStorage', {
  value: new MockLocalStorage(),
});

// Mock data for orders
export const mockOrders = [
  {
    id: 'order-1',
    orderNumber: 'FBX-20250308-A1B2C3',
    createdAt: '2025-03-08T12:00:00Z',
    status: 'pending',
    customer: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '555-123-4567',
    },
    shipping: {
      address1: '123 Test St',
      city: 'Test City',
      state: 'TS',
      zipCode: '12345',
      country: 'US',
      method: 'standard',
    },
    payment: {
      subtotal: 100,
      shipping: 15,
      tax: 8.75,
      total: 123.75,
    },
    items: [
      {
        id: 'item-1',
        name: 'Test Product',
        price: 100,
        quantity: 1,
        imageUrl: '/api/placeholder/100/100',
        type: 'clothing',
      },
    ],
  },
];

// Mock data for products
export const mockProducts = {
  clothing: [
    {
      id: 'clothing-1',
      name: 'Premium Polo Shirt',
      description: 'High-quality polo shirt made from combed cotton.',
      basePrice: 24.99,
      imageUrl: '/api/placeholder/400/300',
      availableSizes: ['S', 'M', 'L', 'XL'],
      availableColors: ['White', 'Black', 'Navy', 'Red'],
      fabricOptions: ['Cotton', 'Cotton-Poly Blend'],
      gender: ['Men', 'Women', 'Unisex'],
      minOrderQuantity: 50,
    },
  ],
  fabric: [
    {
      id: 'fabric-1',
      name: 'Premium Cotton Twill',
      description: 'Durable cotton twill fabric perfect for professional workwear.',
      pricePerMeter: 12.99,
      imageUrl: '/api/placeholder/400/300',
      type: 'Cotton',
      availableColors: ['White', 'Black', 'Navy', 'Khaki'],
      styles: ['Solid', 'Professional', 'Durable'],
      composition: '100% Cotton',
      weight: '280 GSM',
      minOrderLength: 10,
    },
  ],
};

// Mock API response function
export const mockApiResponse = (data: any, status = 200, headers = {}) => {
  return Promise.resolve({
    data,
    status,
    headers,
    statusText: status === 200 ? 'OK' : 'Error',
    config: {},
  });
};

// Export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };