import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import Order from '../models/Order';
import { ApiError } from '../utils/ApiError';
import { NextFunction } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount) {
    throw new ApiError(400, 'Amount is required');
  }

  const amountInCents = Math.round(Number(amount) * 100);
  if (isNaN(amountInCents) || amountInCents <= 0) {
    throw new ApiError(400, 'Invalid amount');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'eur',
    payment_method_types: ['card'],
  });

  res.status(201).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});
export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', paymentFailed.last_payment_error?.message);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.json({ received: true });
};
function asyncHandler(fn: (req: Request, res: Response) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
}
