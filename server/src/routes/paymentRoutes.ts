import { Router } from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController';
import bodyParser from 'body-parser';

const router = Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleWebhook);

export default router;