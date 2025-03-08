/**
 * Common types used throughout the application
 */

// User related types
export interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    addresses?: Address[];
    phone?: string;
    company?: string;
  }
  
  export interface Address {
    _id?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }
  
  // Product related types
  export interface BaseProduct {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    isActive: boolean;
  }
  
  export interface ClothingProduct extends BaseProduct {
    type: 'clothing';
    availableSizes: string[];
    availableColors: string[];
    fabricOptions: string[];
    gender: string[];
    minOrderQuantity: number;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    customizationOptions: {
      allowsLogo: boolean;
      logoPositions: string[];
      allowsCustomColors: boolean;
    };
  }
  
  export interface FabricProduct extends BaseProduct {
    type: 'fabric';
    fabricType: string;
    composition: string;
    weight: string;
    width: number;
    availableColors: string[];
    styles: string[];
    minOrderLength: number;
    careInstructions: string;
    certifications: string[];
  }
  
  export type Product = ClothingProduct | FabricProduct;
  
  // Order related types
  export interface OrderItem {
    id: string;
    type: 'clothing' | 'fabric';
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    // Clothing specific properties
    size?: string;
    color?: string;
    fabric?: string;
    logoUrl?: string;
    orderQuantity?: number;
    logoPosition?: string;
    // Fabric specific properties
    fabricType?: string;
    length?: number;
    fabricStyle?: string;
  }
  
  export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  }
  
  export interface ShippingInfo {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    method: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  }
  
  export interface PaymentInfo {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    isPaid?: boolean;
    paidAt?: string;
    cardBrand?: string;
    lastFour?: string;
    transactionId?: string;
  }
  
  export interface Order {
    id: string;
    orderNumber: string;
    createdAt: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderItem[];
    customer: CustomerInfo;
    shipping: ShippingInfo;
    payment: PaymentInfo;
    notes?: string;
  }
  
  // API response types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any[];
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    pages: number;
    total: number;
  }
  
  // Logo generator types
  export interface LogoGenerationRequest {
    companyName: string;
    industry?: string;
    slogan?: string;
    style: string;
    colors: string[];
    size: 'small' | 'medium' | 'large';
  }
  
  export interface LogoGenerationResponse {
    success: boolean;
    logoUrl: string;
  }
  
  // Chatbot types
  export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }