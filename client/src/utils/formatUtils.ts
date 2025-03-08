/**
 * Utility functions for formatting text, numbers, dates, etc.
 */

/**
 * Format price to currency string
 * @param price - Number to format as currency
 * @param currency - Currency code (default: USD)
 * @param locale - Locale string (default: en-US)
 * @returns Formatted currency string
 */
export const formatCurrency = (
    price: number,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  /**
   * Format date to string
   * @param date - Date to format
   * @param options - Intl.DateTimeFormatOptions
   * @param locale - Locale string (default: en-US)
   * @returns Formatted date string
   */
  export const formatDate = (
    date: Date | string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    locale: string = 'en-US'
  ): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  };
  
  /**
   * Format file size
   * @param bytes - Size in bytes
   * @param decimals - Number of decimal places (default: 2)
   * @returns Formatted file size string
   */
  export const formatFileSize = (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };
  
  /**
   * Truncate text with ellipsis
   * @param text - Text to truncate
   * @param maxLength - Maximum length
   * @param suffix - Suffix to add (default: '...')
   * @returns Truncated text
   */
  export const truncateText = (
    text: string,
    maxLength: number,
    suffix: string = '...'
  ): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + suffix;
  };
  
  /**
   * Convert string to title case
   * @param str - String to convert
   * @returns Title case string
   */
  export const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Format phone number to (XXX) XXX-XXXX
   * @param phone - Phone number string
   * @returns Formatted phone number
   */
  export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if the input is of correct length
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    
    return phone;
  };
  
  /**
   * Format address to single line string
   * @param address - Address object
   * @returns Formatted address string
   */
  export const formatAddress = (address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }): string => {
    const parts = [
      address.address1,
      address.address2,
      `${address.city}, ${address.state} ${address.zipCode}`,
      address.country,
    ].filter(Boolean);
    
    return parts.join(', ');
  };
  
  /**
   * Calculate discount percentage
   * @param originalPrice - Original price
   * @param salePrice - Sale price
   * @returns Formatted discount percentage
   */
  export const calculateDiscount = (
    originalPrice: number,
    salePrice: number
  ): string => {
    if (originalPrice <= 0 || salePrice >= originalPrice) return '0% off';
    
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return `${Math.round(discount)}% off`;
  };