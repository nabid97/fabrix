import mongoose, { Document, Schema } from 'mongoose';

// Base product interface
export interface IBaseProduct extends Document {
  name: string;
  description: string;
  images: string[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Clothing product interface
export interface IClothingProduct extends IBaseProduct {
  type: 'clothing';
  availableSizes: string[];
  availableColors: string[];
  fabricOptions: string[];
  gender: string[];
  minOrderQuantity: number;
  weight: number; // in grams
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

// Fabric product interface
export interface IFabricProduct extends IBaseProduct {
  type: 'fabric';
  fabricType: string;
  composition: string;
  weight: string; // e.g., "200 GSM"
  width: number; // in cm
  availableColors: string[];
  styles: string[];
  minOrderLength: number;
  careInstructions: string;
  certifications: string[];
}

// Base product schema
const baseProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: [(val: string[]) => val.length > 0, 'At least one image is required'],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'type',
  }
);

// Create the base model
const Product = mongoose.model<IBaseProduct>('Product', baseProductSchema);

// Clothing product schema
const clothingSchema = new Schema({
  availableSizes: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length > 0, 'At least one size is required'],
  },
  availableColors: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length > 0, 'At least one color is required'],
  },
  fabricOptions: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length > 0, 'At least one fabric option is required'],
  },
  gender: {
    type: [String],
    required: true,
    // Remove the enum restriction or update it to include all valid values
    // enum: {
    //   values: ['men', 'women', 'unisex'],
    //   message: '{VALUE} is not a valid gender',
    // },
  },
  minOrderQuantity: {
    type: Number,
    required: true,
    min: [1, 'Minimum order quantity must be at least 1'],
    default: 50,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  dimensions: {
    length: {
      type: Number,
      required: true,
      min: 0,
    },
    width: {
      type: Number,
      required: true,
      min: 0,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  customizationOptions: {
    allowsLogo: {
      type: Boolean,
      default: true,
    },
    logoPositions: {
      type: [String],
      default: ['left-chest', 'right-chest', 'center-chest', 'back'],
    },
    allowsCustomColors: {
      type: Boolean,
      default: false,
    },
  },
});

// Fabric product schema
const fabricSchema = new Schema({
  fabricType: {
    type: String,
    required: true,
    trim: true,
  },
  composition: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: String,
    required: true,
    trim: true,
  },
  width: {
    type: Number,
    required: true,
    min: 0,
  },
  availableColors: {
    type: [String],
    required: true,
    validate: [(val: string[]) => val.length > 0, 'At least one color is required'],
  },
  styles: {
    type: [String],
    required: true,
  },
  minOrderLength: {
    type: Number,
    required: true,
    min: [0.1, 'Minimum order length must be at least 0.1 meter'],
    default: 1,
  },
  careInstructions: {
    type: String,
    required: true,
  },
  certifications: {
    type: [String],
    default: [],
  },
});

// Create discriminators
export const ClothingProduct = Product.discriminator<IClothingProduct>(
  'clothing',
  clothingSchema
);

export const FabricProduct = Product.discriminator<IFabricProduct>('fabric', fabricSchema);

export default Product;