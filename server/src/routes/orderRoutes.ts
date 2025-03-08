import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getOrderByNumber,
  getMyOrders,
  cancelOrder
} from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Private routes
router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.get('/myorders', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.put('/:id/status', protect, admin, updateOrderStatus);

// Public route for tracking orders
router.get('/number/:orderNumber', getOrderByNumber);

export default router;