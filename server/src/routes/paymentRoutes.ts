import express from 'express';
import { createPaymentIntent, processWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', protect, createPaymentIntent);

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), processWebhook);

export default router;