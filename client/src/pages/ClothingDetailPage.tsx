import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ClothingDetailPage = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  
  // In a real app, you would fetch product data based on the slug
  // For now, we'll use placeholder data
  const [product] = useState({
    id: 'clothing-1',
    name: `${productSlug?.replace(/-/g, ' ')}`,
    description: 'Premium clothing item with high-quality materials',
    basePrice: 29.99,
    imageUrl: '/api/placeholder/400/320',
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: ['White', 'Black', 'Navy', 'Red'],
    fabricOptions: ['Cotton', 'Cotton-Poly Blend'],
    gender: ['Men', 'Women', 'Unisex'],
    minOrderQuantity: 50,
  });
  
  // Form state for customization
  const [customization, setCustomization] = useState({
    size: 'M',
    color: 'Black',
    fabric: 'Cotton',
    quantity: 50,
    logoUrl: '',
    logoPosition: 'left-chest',
    notes: '',
  });
  
  // Simulate loading data
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [productSlug]);
  
  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      type: 'clothing' as const,
      name: product.name,
      price: product.basePrice * customization.quantity,
      quantity: 1,
      imageUrl: product.imageUrl,
      size: customization.size,
      color: customization.color,
      fabric: customization.fabric,
      orderQuantity: customization.quantity,
      logoUrl: customization.logoUrl,
      logoPosition: customization.logoPosition,
      notes: customization.notes
    };
    
    addItem(cartItem);
    alert('Item added to cart!');
  };
  
  if (loading) return <LoadingSpinner message="Loading product details..." />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <div className="mt-4">
            <Link to="/clothing" className="text-red-700 underline">
              Back to All Clothing
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/clothing"
          className="inline-flex items-center text-teal-600 hover:text-teal-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to All Clothing
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-teal-600">${product.basePrice.toFixed(2)}</span>
              <span className="text-gray-500 ml-2">per unit</span>
            </div>
            
            <div className="space-y-6">
              {/* Size Selection */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  id="size"
                  value={customization.size}
                  onChange={(e) => setCustomization({ ...customization, size: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {product.availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <select
                  id="color"
                  value={customization.color}
                  onChange={(e) => setCustomization({ ...customization, color: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {product.availableColors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Fabric Selection */}
              <div>
                <label htmlFor="fabric" className="block text-sm font-medium text-gray-700 mb-1">
                  Fabric
                </label>
                <select
                  id="fabric"
                  value={customization.fabric}
                  onChange={(e) => setCustomization({ ...customization, fabric: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {product.fabricOptions.map((fabric) => (
                    <option key={fabric} value={fabric}>
                      {fabric}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Quantity */}
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity (Minimum {product.minOrderQuantity} pcs)
                </label>
                <input
                  type="number"
                  id="quantity"
                  min={product.minOrderQuantity}
                  step={10}
                  value={customization.quantity}
                  onChange={(e) => setCustomization({
                    ...customization,
                    quantity: Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity)
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Price per unit:</span>
                  <span>${product.basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Quantity:</span>
                  <span>{customization.quantity} pcs</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                  <span>Total Price:</span>
                  <span>${(product.basePrice * customization.quantity).toFixed(2)}</span>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothingDetailPage;