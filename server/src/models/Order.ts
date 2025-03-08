import mongoose, { Document, Schema } from 'mongoose';

// Order item interface
export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  type: 'clothing' | 'fabric';
  // Type-specific properties
  size?: string;
  color?: string;
  fabric?: string;
  logoUrl?: string;
  orderQuantity?: number;
  logoPosition?: string;
  fabricType?: string;
  length?: number;
  fabricStyle?: string;
}

// Customer information interface
export interface ICustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

// Shipping information interface
export interface IShippingInfo {
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

// Payment information interface
export interface IPaymentInfo {
  paymentMethodId: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: Date;
  cardBrand?: string;
  lastFour?: string;
  transactionId?: string;
}

// Order status type
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order interface
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  customer: ICustomerInfo;
  shipping: IShippingInfo;
  payment: IPaymentInfo;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order item schema
const orderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['clothing', 'fabric'],
  },
  // Type-specific properties
  size: String,
  color: String,
  fabric: String,
  logoUrl: String,
  orderQuantity: Number,
  logoPosition: String,
  fabricType: String,
  length: Number,
  fabricStyle: String,
});

// Customer information schema
const customerInfoSchema = new Schema<ICustomerInfo>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: String,
});

// Shipping information schema
const shippingInfoSchema = new Schema<IShippingInfo>({
  address1: {
    type: String,
    required: true,
  },
  address2: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  trackingNumber: String,
  estimatedDelivery: String,
});

// Payment information schema
const paymentInfoSchema = new Schema<IPaymentInfo>({
  paymentMethodId: {
    type: String,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: Date,
  cardBrand: String,
  lastFour: String,
  transactionId: String,
});

// Order schema
const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [orderItemSchema],
    customer: customerInfoSchema,
    shipping: shippingInfoSchema,
    payment: paymentInfoSchema,
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;