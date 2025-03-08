import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import Product, { ClothingProduct, FabricProduct } from '../models/Product';
import { ApiError } from '../utils/ApiError';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const page = Number(req.query.page) || 1;
  const type = req.query.type as string;
  
  // Build filter based on query parameters
  const filters: any = { isActive: true };
  
  // Filter by product type if specified
  if (type === 'clothing' || type === 'fabric') {
    filters.type = type;
  }
  
  // Handle search query
  if (req.query.keyword) {
    filters.name = {
      $regex: req.query.keyword,
      $options: 'i'
    };
  }
  
  // Get total count for pagination
  const count = await Product.countDocuments(filters);
  
  // Fetch products with pagination
  const products = await Product.find(filters)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  
  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  res.json(product);
});

// @desc    Create a new clothing product
// @route   POST /api/products/clothing
// @access  Private/Admin
export const createClothingProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    images,
    price,
    availableSizes,
    availableColors,
    fabricOptions,
    gender,
    minOrderQuantity,
    weight,
    dimensions,
    customizationOptions
  } = req.body;
  
  // Validate required fields
  if (!name || !description || !price || !images || images.length === 0) {
    throw new ApiError(400, 'Please provide all required fields');
  }
  
  const product = await ClothingProduct.create({
    name,
    description,
    images,
    price,
    availableSizes,
    availableColors,
    fabricOptions,
    gender,
    minOrderQuantity: minOrderQuantity || 50,
    weight,
    dimensions,
    customizationOptions
  });
  
  res.status(201).json(product);
});

// @desc    Create a new fabric product
// @route   POST /api/products/fabric
// @access  Private/Admin
export const createFabricProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    images,
    price,
    fabricType,
    composition,
    weight,
    width,
    availableColors,
    styles,
    minOrderLength,
    careInstructions,
    certifications
  } = req.body;
  
  // Validate required fields
  if (!name || !description || !price || !images || images.length === 0) {
    throw new ApiError(400, 'Please provide all required fields');
  }
  
  const product = await FabricProduct.create({
    name,
    description,
    images,
    price,
    fabricType,
    composition,
    weight,
    width,
    availableColors,
    styles,
    minOrderLength: minOrderLength || 1,
    careInstructions,
    certifications
  });
  
  res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  // Update product with new data
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  // Instead of deleting, set as inactive
  product.isActive = false;
  await product.save();
  
  res.json({ message: 'Product removed' });
});

// @desc    Fetch clothing products
// @route   GET /api/products/clothing
// @access  Public
export const getClothingProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await ClothingProduct.find({ isActive: true });
  res.json(products);
});

// @desc    Fetch fabric products
// @route   GET /api/products/fabric
// @access  Public
export const getFabricProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await FabricProduct.find({ isActive: true });
  res.json(products);
});