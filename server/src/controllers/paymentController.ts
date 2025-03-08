import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { AuthRequest } from '../types/express';
import { createPaymentIntent as stripeCreatePaymentIntent, handleWebhookEvent } from '../services/payment/stripeService';
import Order from '../models/Order';

// @desc    Create payment intent for Stripe
// @route   POST /api/payments/create-payment-intent
// @access  Private
export const createPaymentIntent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { amount, currency, orderId, metadata } = req.body;

  if (!amount || !orderId) {
    throw new ApiError(400, 'Amount and orderId are required');
  }

  // Check if order exists and belongs to the user
  const order = await Order.findById(orderId);
  
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }
  
  if (order.user.toString() !== req.user?._id.toString() && !req.user?.isAdmin) {
    throw new ApiError(403, 'Not authorized to access this order');
  }

  try {
    // Create payment intent with Stripe
    const paymentIntent = await stripeCreatePaymentIntent(
      amount,
      currency || 'usd',
      { 
        orderId,
        userId: req.user?._id.toString() || '',
        ...metadata 
      }
    );
    
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    throw new ApiError(500, 'Failed to create payment intent');
  }
});

// @desc    Process Stripe webhook
// @route   POST /api/payments/webhook
// @access  Public
export const processWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  
  if (!signature) {
    throw new ApiError(400, 'Missing Stripe signature');
  }

  try {
    // Verify and process the webhook event
    const event = handleWebhookEvent(req.body, signature);
    
    // Handle specific events
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
        
      // Add other event types as needed
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return res.status(400).json({ message: `Webhook Error: ${error.message}` });
  }
});

/**
 * Handle successful payment webhook
 * @param paymentIntent - Stripe payment intent object
 */
const handlePaymentSuccess = async (paymentIntent: any) => {
  try {
    const { orderId } = paymentIntent.metadata;
    
    if (!orderId) {
      console.error('No orderId in payment intent metadata');
      return;
    }
    
    // Update order payment status
    const order = await Order.findById(orderId);
    
    if (!order) {
      console.error(`Order ${orderId} not found`);
      return;
    }
    
    // Update payment status
    order.payment.isPaid = true;
    order.payment.paidAt = new Date();
    order.status = 'processing';
    
    // Store payment details
    if (paymentIntent.charges && paymentIntent.charges.data.length > 0) {
      const charge = paymentIntent.charges.data[0];
      
      if (charge.payment_method_details && charge.payment_method_details.card) {
        const card = charge.payment_method_details.card;
        order.payment.cardBrand = card.brand;
        order.payment.lastFour = card.last4;
      }
      
      order.payment.transactionId = charge.id;
    }
    
    await order.save();
    
    console.log(`Payment for order ${orderId} processed successfully`);
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
};

/**
 * Handle failed payment webhook
 * @param paymentIntent - Stripe payment intent object
 */
const handlePaymentFailure = async (paymentIntent: any) => {
  try {
    const { orderId } = paymentIntent.metadata;
    
    if (!orderId) {
      console.error('No orderId in payment intent metadata');
      return;
    }
    
    // Log payment failure but don't change order status
    // May want to notify admin or customer
    console.log(`Payment for order ${orderId} failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`);
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
};