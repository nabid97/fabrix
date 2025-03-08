// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { mockAuthenticatedUser } from './utils/testUtils';

// Mock environment variables
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
};

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
  }

  disconnect() {
    // Implementation not needed for tests
  }

  observe() {
    // Implementation not needed for tests
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {
    // Implementation not needed for tests
  }
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock AWS Amplify
jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn().mockImplementation(() => {
      return Promise.resolve(mockAuthenticatedUser);
    }),
    currentSession: jest.fn().mockImplementation(() => {
      return Promise.resolve({
        getIdToken: () => ({
          getJwtToken: () => 'mock-jwt-token',
        }),
      });
    }),
    signIn: jest.fn().mockImplementation((email, password) => {
      if (email === 'admin@fabrix.com' && password === 'password123') {
        return Promise.resolve(mockAuthenticatedUser);
      }
      return Promise.reject(new Error('Invalid credentials'));
    }),
    signOut: jest.fn().mockResolvedValue(undefined),
    signUp: jest.fn().mockResolvedValue({ user: mockAuthenticatedUser }),
    forgotPassword: jest.fn().mockResolvedValue(undefined),
    forgotPasswordSubmit: jest.fn().mockResolvedValue(undefined),
    updateUserAttributes: jest.fn().mockResolvedValue(undefined),
    verifyCurrentUserAttribute: jest.fn().mockResolvedValue(undefined),
  },
  Hub: {
    listen: jest.fn(),
  },
}));

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock console.error to keep test output clean
const originalConsoleError = console.error;

console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Error: Not implemented: navigation'))
  ) {
    return;
  }
  originalConsoleError(...args);
};