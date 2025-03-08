import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Product interfaces
export interface ClothingProduct {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  availableSizes: string[];
  availableColors: string[];
  fabricOptions: string[];
  gender: string[];
  minOrderQuantity: number;
}

export interface FabricProduct {
  id: string;
  name: string;
  description: string;
  pricePerMeter: number;
  imageUrl: string;
  type: string;
  availableColors: string[];
  styles: string[];
  composition: string;
  weight: string;
  minOrderLength: number;
}

/**
 * Fetch all products
 */
export const fetchProducts = async (
  keyword: string = '',
  page: number = 1,
  pageSize: number = 10,
  type?: string
) => {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (page) params.append('page', page.toString());
    if (pageSize) params.append('pageSize', pageSize.toString());
    if (type) params.append('type', type);

    const response = await axios.get(`${API_URL}/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch clothing products
 */
export const fetchClothingProducts = async (): Promise<ClothingProduct[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/clothing`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clothing products:', error);
    throw error;
  }
};

/**
 * Fetch fabric products
 */
export const fetchFabrics = async (): Promise<FabricProduct[]> => {
  try {
    const response = await axios.get(`${API_URL}/products/fabric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fabrics:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 */
export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

/**
 * Search products
 */
export const searchProducts = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/products?keyword=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

/**
 * Filter products
 */
export const filterProducts = async (filters: Record<string, any>) => {
  try {
    const params = new URLSearchParams();
    
    // Add filters to params
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array values
        value.forEach(v => params.append(`${key}[]`, v));
      } else if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });
    
    const response = await axios.get(`${API_URL}/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error filtering products:', error);
    throw error;
  }
};