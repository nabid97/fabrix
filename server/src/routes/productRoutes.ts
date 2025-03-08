import express from 'express';
import {
  getProducts,
  getProductById,
  createClothingProduct,
  createFabricProduct,
  updateProduct,
  deleteProduct,
  getClothingProducts,
  getFabricProducts
} from '../controllers/productController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.route('/')
  .get(getProducts);

router.route('/clothing')
  .get(getClothingProducts)
  .post(protect, admin, createClothingProduct);

router.route('/fabric')
  .get(getFabricProducts)
  .post(protect, admin, createFabricProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;