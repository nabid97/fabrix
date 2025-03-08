/**
 * Utility functions for form validation
 */

/**
 * Check if email is valid
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  /**
   * Check if password meets minimum requirements
   * @param password - Password to validate
   * @param options - Validation options
   * @returns Boolean indicating if password is valid
   */
  export const isValidPassword = (
    password: string,
    options: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumbers?: boolean;
      requireSpecialChars?: boolean;
    } = {}
  ): boolean => {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = true,
    } = options;
  
    // Check minimum length
    if (password.length < minLength) return false;
  
    // Check for uppercase letters
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
  
    // Check for lowercase letters
    if (requireLowercase && !/[a-z]/.test(password)) return false;
  
    // Check for numbers
    if (requireNumbers && !/[0-9]/.test(password)) return false;
  
    // Check for special characters
    if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return false;
  
    return true;
  };
  
  /**
   * Get password strength score (0-4)
   * @param password - Password to evaluate
   * @returns Score from 0 (very weak) to 4 (very strong)
   */
  export const getPasswordStrength = (password: string): number => {
    let score = 0;
  
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
  
    // Complexity checks
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  
    // Add score for different character types
    const varietyCount = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    score += Math.min(varietyCount, 3);
  
    return score;
  };
  
  /**
   * Check if phone number is valid
   * @param phone - Phone number to validate
   * @returns Boolean indicating if phone number is valid
   */
  export const isValidPhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if the input has 10-15 digits
    return cleaned.length >= 10 && cleaned.length <= 15;
  };
  
  /**
   * Check if zip/postal code is valid (US or Canada)
   * @param zipCode - Zip/postal code to validate
   * @param country - Country code (default: 'US')
   * @returns Boolean indicating if zip/postal code is valid
   */
  export const isValidZipCode = (zipCode: string, country: string = 'US'): boolean => {
    if (country === 'US') {
      // US ZIP code: 5 digits or 5+4 format
      return /^\d{5}(-\d{4})?$/.test(zipCode);
    } else if (country === 'CA') {
      // Canadian postal code: A1A 1A1
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(zipCode);
    }
    
    // For other countries, just ensure it's not empty
    return zipCode.trim().length > 0;
  };
  
  /**
   * Check if credit card number is valid (using Luhn algorithm)
   * @param cardNumber - Credit card number to validate
   * @returns Boolean indicating if card number is valid
   */
  export const isValidCreditCard = (cardNumber: string): boolean => {
    // Remove all non-digit characters
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Check if empty or not a number
    if (!cleaned || isNaN(Number(cleaned))) return false;
  
    // Luhn algorithm
    let sum = 0;
    let shouldDouble = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i));
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    return sum % 10 === 0;
  };
  
  /**
   * Get credit card type based on number
   * @param cardNumber - Credit card number
   * @returns Card type (visa, mastercard, amex, discover, unknown)
   */
  export const getCreditCardType = (cardNumber: string): string => {
    // Remove all non-digit characters
    const cleaned = cardNumber.replace(/\D/g, '');
    
    // Visa: Starts with 4
    if (/^4/.test(cleaned)) return 'visa';
    
    // Mastercard: Starts with 51-55 or 2221-2720
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]2[0-1]/.test(cleaned)) return 'mastercard';
    
    // Amex: Starts with 34 or 37
    if (/^3[47]/.test(cleaned)) return 'amex';
    
    // Discover: Starts with 6011, 622126-622925, 644-649, or 65
    if (/^6011/.test(cleaned) || /^65/.test(cleaned) || /^64[4-9]/.test(cleaned) || /^62212[6-9]/.test(cleaned) || /^6221[3-9]/.test(cleaned) || /^622[2-9]/.test(cleaned) || /^6229[0-5]/.test(cleaned)) {
      return 'discover';
    }
    
    return 'unknown';
  };
  
  /**
   * Validate form fields
   * @param fields - Object containing field values
   * @param rules - Validation rules for each field
   * @returns Object with validation results
   */
  export const validateForm = (
    fields: Record<string, any>,
    rules: Record<string, (value: any) => boolean>
  ): { isValid: boolean; errors: Record<string, boolean> } => {
    const errors: Record<string, boolean> = {};
    let isValid = true;
  
    // Check each field against its rule
    Object.entries(rules).forEach(([fieldName, validationFn]) => {
      if (fieldName in fields) {
        const fieldIsValid = validationFn(fields[fieldName]);
        errors[fieldName] = !fieldIsValid;
        
        if (!fieldIsValid) {
          isValid = false;
        }
      }
    });
  
    return { isValid, errors };
  };