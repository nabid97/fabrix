import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../api/orderApi';
import { CheckCircle, ArrowRight, Printer, Mail, Package, Clock } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Define the order types
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  type: 'clothing' | 'fabric';
  // Clothing specific props
  size?: string;
  color?: string;
  orderQuantity?: number;
  // Fabric specific props
  length?: number;
  fabricType?: string;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

interface Shipping {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  method: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface Payment {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  cardBrand?: string;
  lastFour?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer: Customer;
  shipping: Shipping;
  payment: Payment;
  items: OrderItem[];
}

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          setError('Order ID not found');
          setLoading(false);
          return;
        }
        
        const orderData = await getOrderDetails(orderId);
        setOrder(orderData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <LoadingSpinner message="Loading order details..." />;
  
  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error || 'Order not found'}</p>
          <div className="mt-4">
            <Link to="/contact" className="text-red-700 underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Print-only header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-2xl font-bold">Order Confirmation - FabriX</h1>
        <p className="text-gray-600">
          www.fabrix.com | info@fabrix.com | +1 (555) 123-4567
        </p>
      </div>
      
      {/* Success Message */}
      <div className="max-w-4xl mx-auto bg-green-50 border border-green-200 rounded-xl p-6 mb-8 print:bg-white print:border-0">
        <div className="flex items-center">
          <CheckCircle size={32} className="text-green-600 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-green-800">Order Confirmed!</h1>
            <p className="text-green-700">
              Thank you for your order. A confirmation has been sent to {order.customer.email}.
            </p>
          </div>
        </div>
      </div>
      
      {/* Order Details */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 print:shadow-none">
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-xl font-bold mb-2">Order #{order.orderNumber}</h2>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                {new Date(order.createdAt).toLocaleTimeString()}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 print:hidden flex flex-wrap gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                <Printer size={18} className="mr-2" />
                Print
              </button>
              
              <button
                onClick={() => window.location.href = `mailto:?subject=My FabriX Order ${order.orderNumber}&body=Order details: ${window.location.href}`}
                className="inline-flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                <Mail size={18} className="mr-2" />
                Email
              </button>
            </div>
          </div>
        </div>
        
        {/* Order Status */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold mb-4">Order Status</h3>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              {order.status === 'pending' || order.status === 'processing' ? (
                <Clock size={20} className="text-teal-600" />
              ) : (
                <Package size={20} className="text-teal-600" />
              )}
            </div>
            <div className="ml-4">
              <p className="font-medium capitalize">{order.status}</p>
              <p className="text-sm text-gray-600">
                {order.status === 'pending'
                  ? 'Your order has been received and is pending processing.'
                  : order.status === 'processing'
                  ? 'Your order is being processed and prepared for shipping.'
                  : order.status === 'shipped'
                  ? `Your order has been shipped. Tracking number: ${order.shipping.trackingNumber || 'Not available yet'}`
                  : order.status === 'delivered'
                  ? 'Your order has been delivered.'
                  : 'Your order has been cancelled.'}
              </p>
              {order.shipping.estimatedDelivery && (
                <p className="text-sm text-gray-600 mt-1">
                  Estimated delivery: {order.shipping.estimatedDelivery}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex">
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {item.type === 'clothing'
                      ? `Size: ${item.size} | Color: ${item.color} | Quantity: ${item.orderQuantity} pcs`
                      : `Color: ${item.color} | Length: ${item.length}m | Type: ${item.fabricType}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customer and Shipping Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-200">
          <div>
            <h3 className="font-semibold mb-4">Customer Information</h3>
            <p className="font-medium">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <p className="text-gray-600">{order.customer.email}</p>
            <p className="text-gray-600">{order.customer.phone}</p>
            {order.customer.company && (
              <p className="text-gray-600">{order.customer.company}</p>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Shipping Information</h3>
            <p className="font-medium">
              {order.customer.firstName} {order.customer.lastName}
            </p>
            <div className="text-gray-600">
              <p>{order.shipping.address1}</p>
              {order.shipping.address2 && <p>{order.shipping.address2}</p>}
              <p>
                {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
              </p>
              <p>{order.shipping.country}</p>
            </div>
            <p className="mt-2 text-gray-600">
              Shipping Method: {order.shipping.method.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
        </div>
        
        {/* Payment Summary */}
        <div className="p-6">
          <h3 className="font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${order.payment.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${order.payment.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>${order.payment.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.payment.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          {order.payment.cardBrand && order.payment.lastFour && (
            <div className="mt-4">
              <p className="text-gray-600">
                Paid with {order.payment.cardBrand} ending in {order.payment.lastFour}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* What's Next Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8 print:shadow-none print:border print:border-gray-200">
        <h2 className="text-xl font-bold mb-4">What's Next?</h2>
        <p className="text-gray-700 mb-4">
          Your order has been received and is being processed. You will receive an email notification
          when your order ships with tracking information.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Track Your Order</h3>
            <p className="text-sm text-gray-600 mb-4">
              You can track your order status in your account dashboard.
            </p>
            <Link
              to="/account/orders"
              className="text-teal-600 hover:text-teal-800 text-sm inline-flex items-center"
            >
              Order History <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions about your order, please contact us.
            </p>
            <Link
              to="/contact"
              className="text-teal-600 hover:text-teal-800 text-sm inline-flex items-center"
            >
              Contact Support <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Continue Shopping</h3>
            <p className="text-sm text-gray-600 mb-4">
              Browse our catalog for more premium fabrics and custom clothing.
            </p>
            <Link
              to="/"
              className="text-teal-600 hover:text-teal-800 text-sm inline-flex items-center"
            >
              Return to Shop <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Product Recommendations (hidden on print) */}
      <div className="max-w-4xl mx-auto print:hidden">
        <h2 className="text-xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* This would typically be populated with recommended products */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={`/api/placeholder/400/320`}
                  alt={`Recommended product ${num}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Recommended Product {num}</h3>
                <p className="text-gray-600 text-sm mb-2">Product description here</p>
                <p className="font-bold text-teal-600">$XX.XX</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;