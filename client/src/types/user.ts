// server/src/types/user.ts
export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    avatar?: string;
    company?: string;
    phone?: string;
    // Add any additional user properties as needed
  }