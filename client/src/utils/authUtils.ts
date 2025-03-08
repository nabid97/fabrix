import { Auth } from 'aws-amplify';
import { User } from '../types';

/**
 * Parse JWT token to extract expiration time and other claims
 * @param token JWT token string
 * @returns Parsed token object
 */
export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param token JWT token or parsed token object
 * @returns Boolean indicating if token is expired
 */
export const isTokenExpired = (token: string | Record<string, any>) => {
  try {
    const parsedToken = typeof token === 'string' ? parseJwt(token) : token;
    if (!parsedToken) return true;

    const expirationTime = parsedToken.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // If there's an error, assume the token is expired
  }
};

/**
 * Format Cognito user object to application User model
 * @param cognitoUser Cognito user object
 * @returns Formatted user object
 */
export const formatCognitoUser = (cognitoUser: any): User => {
  return {
    _id: cognitoUser.attributes.sub,
    name: cognitoUser.attributes.name || cognitoUser.username,
    email: cognitoUser.attributes.email,
    isAdmin: cognitoUser.signInUserSession.accessToken.payload['cognito:groups']?.includes('admin') || false,
    phone: cognitoUser.attributes.phone_number,
    company: cognitoUser.attributes['custom:company'],
  };
};

/**
 * Get current authenticated user from Cognito
 * @returns Formatted user object or null if not authenticated
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    return formatCognitoUser(cognitoUser);
  } catch (error) {
    console.log('Not authenticated:', error);
    return null;
  }
};

/**
 * Get current session JWT token
 * @returns Current valid JWT token or null
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  } catch (error) {
    console.log('No current session:', error);
    return null;
  }
};

/**
 * Register a new user in Cognito
 * @param email User email
 * @param password User password
 * @param name User name
 * @returns Result of sign up operation
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<any> => {
  try {
    return await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name,
      },
    });
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign in a user with Cognito
 * @param email User email
 * @param password User password
 * @returns Authenticated user object
 */
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const cognitoUser = await Auth.signIn(email, password);
    return formatCognitoUser(cognitoUser);
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<void> => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Initiate forgot password flow
 * @param email User email
 */
export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await Auth.forgotPassword(email);
  } catch (error) {
    console.error('Error initiating forgot password:', error);
    throw error;
  }
};

/**
 * Complete forgot password flow with verification code
 * @param email User email
 * @param code Verification code
 * @param newPassword New password
 */
export const forgotPasswordSubmit = async (
  email: string,
  code: string,
  newPassword: string
): Promise<void> => {
  try {
    await Auth.forgotPasswordSubmit(email, code, newPassword);
  } catch (error) {
    console.error('Error submitting new password:', error);
    throw error;
  }
};

/**
 * Change password for authenticated user
 * @param oldPassword Current password
 * @param newPassword New password
 */
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword);
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

/**
 * Update user attributes
 * @param attributes User attributes to update
 */
export const updateUserAttributes = async (
  attributes: Record<string, string>
): Promise<void> => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, attributes);
  } catch (error) {
    console.error('Error updating user attributes:', error);
    throw error;
  }
};