/**
 * Generate a unique order number
 * Format: FBX-[YEAR][MONTH][DAY]-[RANDOM]
 * Example: FBX-20250308-A1B2C3
 */
export const generateOrderNumber = (): string => {
    // Get current date
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Date portion
    const datePart = `${year}${month}${day}`;
    
    // Generate random alphanumeric string
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * randomChars.length);
      randomPart += randomChars[randomIndex];
    }
    
    // Combine parts to create order number
    return `FBX-${datePart}-${randomPart}`;
  };