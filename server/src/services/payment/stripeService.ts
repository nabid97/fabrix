import Stripe from 'stripe';
import config from '../../config';

// Initialize Stripe with secret key
const stripe = new Stripe(config.stripe.secretKey, {
  apiVersion: '2023-10-16', // Use the latest API version
});

/**
 * Create a payment intent for an order
 * @param amount - Amount in cents
 * @param currency - Currency code (default: USD)
 * @param metadata - Additional metadata for the payment
 * @returns Stripe payment intent object
 */
export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string> = {}
): Promise<Stripe.PaymentIntent> => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    throw new Error('Failed to create payment intent');
  }
};

/**
 * Retrieve payment intent by ID
 * @param paymentIntentId - Stripe payment intent ID
 * @returns Payment intent object
 */
export const getPaymentIntent = async (
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Stripe payment intent retrieval error:', error);
    throw new Error('Failed to retrieve payment intent');
  }
};

/**
 * Create a customer in Stripe
 * @param email - Customer email
 * @param name - Customer name
 * @param metadata - Additional metadata
 * @returns Stripe customer object
 */
export const createCustomer = async (
  email: string,
  name: string,
  metadata: Record<string, string> = {}
): Promise<Stripe.Customer> => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata,
    });
    
    return customer;
  } catch (error) {
    console.error('Stripe customer creation error:', error);
    throw new Error('Failed to create customer');
  }
};

/**
 * Create a product in Stripe
 * @param name - Product name
 * @param description - Product description
 * @param images - Array of image URLs
 * @param metadata - Additional metadata
 * @returns Stripe product object
 */
export const createProduct = async (
  name: string,
  description: string,
  images: string[] = [],
  metadata: Record<string, string> = {}
): Promise<Stripe.Product> => {
  try {
    const product = await stripe.products.create({
      name,
      description,
      images,
      metadata,
    });
    
    return product;
  } catch (error) {
    console.error('Stripe product creation error:', error);
    throw new Error('Failed to create product');
  }
};

/**
 * Handle webhook events from Stripe
 * @param payload - Raw request body
 * @param signature - Stripe signature header
 * @returns Parsed event
 */
export const handleWebhookEvent = (
  payload: Buffer,
  signature: string
): Stripe.Event => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      config.stripe.webhookSecret
    );
    
    return event;
  } catch (error) {
    console.error('Stripe webhook error:', error);
    throw new Error('Invalid Stripe webhook');
  }
};

/**
 * Create a refund for a payment
 * @param paymentIntentId - Payment intent ID to refund
 * @param amount - Amount to refund (in cents)
 * @param reason - Reason for refund
 * @returns Refund object
 */
export const createRefund = async (
  paymentIntentId: string,
  amount?: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
): Promise<Stripe.Refund> => {
  try {
    const refundParams: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId,
    };
    
    if (amount) {
      refundParams.amount = amount;
    }
    
    if (reason) {
      refundParams.reason = reason;
    }
    
    const refund = await stripe.refunds.create(refundParams);
    
    return refund;
  } catch (error) {
    console.error('Stripe refund creation error:', error);
    throw new Error('Failed to create refund');
  }
};