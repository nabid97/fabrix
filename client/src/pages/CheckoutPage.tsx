import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../api/orderApi';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {AlertCircle, CreditCard, ChevronLeft } from 'lucide-react';

// Initialize Stripe (in a real app, use your publishable key)
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here');

// Shipping method option type
interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

// Checkout form data type
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: string;
  saveAddress: boolean;
  notes: string;
}

// Shipping methods
const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Standard shipping via courier',
    price: 15.0,
    estimatedDelivery: '5-10 business days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Expedited delivery via air freight',
    price: 35.0,
    estimatedDelivery: '2-3 business days',
  },
  {
    id: 'priority',
    name: 'Priority Shipping',
    description: 'Priority delivery with tracking',
    price: 50.0,
    estimatedDelivery: '1-2 business days',
  },
];

// Credit card input style
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

// Checkout form component with Stripe integration
const CheckoutForm = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  
  // Form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    shippingMethod: 'standard',
    saveAddress: true,
    notes: '',
  });
  
  // Processing state
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  
  // Calculate order summary
  const selectedShipping = shippingMethods.find(
    (method) => method.id === formData.shippingMethod
  );
  
  const subtotal = totalPrice;
  const shippingCost = selectedShipping?.price || 0;
  const taxRate = 0.07; // 7% tax rate
  const taxAmount = subtotal * taxRate;
  const orderTotal = subtotal + shippingCost + taxAmount;
  
  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    
    // Reset errors
    setCardError(null);
    setOrderError(null);
    setProcessing(true);
    
    try {
      // Create payment method with Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: {
            line1: formData.address1,
            line2: formData.address2,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zipCode,
            country: formData.country,
          },
        },
      });
      
      if (error) {
        setCardError(error.message || 'An error occurred with your credit card');
        setProcessing(false);
        return;
      }
      
      // Create order
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          type: item.type,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          // Include type-specific properties
          ...(item.type === 'clothing' ? {
            size: item.size,
            color: item.color,
            fabric: item.fabric,
            logoUrl: item.logoUrl,
            orderQuantity: item.orderQuantity,
            logoPosition: item.logoPosition,
          } : {
            fabricType: item.fabricType,
            color: item.color,
            length: item.length,
            fabricStyle: item.fabricStyle,
          }),
        })),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        },
        shipping: {
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          method: formData.shippingMethod,
        },
        payment: {
          paymentMethodId: paymentMethod.id,
          subtotal,
          shipping: shippingCost,
          tax: taxAmount,
          total: orderTotal,
        },
        notes: formData.notes,
      };
      
      // Send order to backend
      const order = await createOrder(orderData);
      
      // Clear cart on successful order
      clearCart();
      
      // Redirect to order confirmation page
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Order processing error:', error);
      setOrderError('There was an error processing your order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Customer & Shipping Information */}
      <div className="lg:col-span-2 space-y-8">
        {/* Customer Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1 *
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="saveAddress"
                  checked={formData.saveAddress}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Save this information for next time
                </span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Shipping Method */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Method</h2>
          
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.shippingMethod === method.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={formData.shippingMethod === method.id}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-teal-600 focus:ring-teal-500 border-gray-300 mt-1"
                />
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{method.name}</span>
                    <span className="font-medium">${method.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{method.description}</p>
                  <p className="text-gray-600 text-sm">Estimated delivery: {method.estimatedDelivery}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        {/* Order Notes */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Order Notes (Optional)</h2>
          
          <div>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              placeholder="Special instructions for your order..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
          
          <div className="mb-6">
            <div className="font-medium text-gray-700 mb-2 flex items-center">
              <CreditCard size={20} className="mr-2" />
              Credit Card
            </div>
            <div className="border border-gray-300 rounded-md p-4">
              <CardElement options={cardElementOptions} />
            </div>
            
            {cardError && (
              <div className="mt-2 text-red-600 text-sm">
                {cardError}
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600">
            Your card will be charged ${orderTotal.toFixed(2)} when you place your order.
          </p>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="max-h-96 overflow-y-auto mb-6">
            {/* Order Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start">
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-gray-600 text-xs">
                      Qty: {item.quantity} x ${(item.price / item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Cost Breakdown */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (7%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Place Order Button */}
          {orderError && (
            <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-md flex items-start">
              <AlertCircle size={18} className="flex-shrink-0 mr-2 mt-0.5" />
              <p className="text-sm">{orderError}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={processing || !stripe}
            className={`w-full bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 transition-colors mt-6 flex items-center justify-center ${
              processing || !stripe ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {processing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            By placing your order, you agree to our 
            <a href="/terms" className="text-teal-600 hover:underline ml-1">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </form>
  );
};

// Main Checkout Page wrapped with Stripe Elements provider
const CheckoutPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // Redirect to cart if no items
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="mb-8">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center text-teal-600 hover:text-teal-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Return to Cart
        </button>
      </div>
      
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;