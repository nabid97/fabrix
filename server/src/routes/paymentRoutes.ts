import { Router } from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController';

const router = Router();

router.post('/create-payment-intent', createPaymentIntent);router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', handleWebhook);

export default router;