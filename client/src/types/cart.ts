// src/types/cart.ts
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    fabricType?: string;
    color?: string;
    fabric?: string;
    logoUrl?: string;
    orderQuantity?: number;
    logoPosition?: string;
    // Add any additional cart item properties as needed
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
  }