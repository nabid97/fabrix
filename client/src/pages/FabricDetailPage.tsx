import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ChevronLeft, Plus, Minus } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FabricDetailPage = () => {
  const { fabricSlug } = useParams<{ fabricSlug: string }>();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // In a real app, you would fetch fabric data based on the slug
  // For now, we'll use placeholder data
  const [fabric, setFabric] = useState({
    id: 'fabric-1',
    name: `${fabricSlug?.replace(/-/g, ' ')}`,
    description: 'Premium fabric with high-quality materials suitable for various applications.',
    type: 'Cotton',
    pricePerMeter: 12.99,
    imageUrl: '/api/placeholder/400/320',
    availableColors: ['White', 'Black', 'Navy', 'Red', 'Green', 'Blue'],
    styles: ['Solid', 'Professional', 'Durable'],
    composition: '100% Cotton',
    weight: '280 GSM',
    minOrderLength: 5,
  });
  
  // Customization state
  const [customization, setCustomization] = useState({
    color: 'White',
    length: 5,
    notes: '',
  });
  
  // Simulate loading data
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [fabricSlug]);
  
  const handleAddToCart = () => {
    const cartItem = {
      id: `${fabric.id}-${Date.now()}`,
      type: 'fabric' as const,
      name: fabric.name,
      price: fabric.pricePerMeter * customization.length,
      quantity: 1,
      imageUrl: fabric.imageUrl,
      fabricType: fabric.type,
      color: customization.color,
      length: customization.length,
      fabricStyle: fabric.styles[0],
      notes: customization.notes
    };
    
    addItem(cartItem);
    alert('Fabric added to cart!');
  };
  
  if (loading) return <LoadingSpinner message="Loading fabric details..." />;
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <div className="mt-4">
            <Link to="/fabrics" className="text-red-700 underline">
              Back to All Fabrics
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
          to="/fabrics"
          className="inline-flex items-center text-teal-600 hover:text-teal-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to All Fabrics
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Fabric Image */}
          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            <img
              src={fabric.imageUrl}
              alt={fabric.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Fabric Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{fabric.name}</h1>
            <p className="text-gray-600 mb-4">{fabric.description}</p>
            
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-teal-600">${fabric.pricePerMeter.toFixed(2)}</span>
              <span className="text-gray-500 ml-2">per meter</span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{fabric.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Composition:</span>
                <span className="font-medium">{fabric.composition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{fabric.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Order:</span>
                <span className="font-medium">{fabric.minOrderLength} meters</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <label className="block font-medium mb-2">Color</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {fabric.availableColors.map((colorName) => (
                    <label
                      key={colorName}
                      className={`border rounded-md p-2 flex flex-col items-center cursor-pointer transition-colors ${
                        customization.color === colorName
                          ? 'bg-teal-50 border-teal-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full border border-gray-300 mb-1"
                        style={{
                          backgroundColor: colorName.toLowerCase(),
                          boxShadow: colorName.toLowerCase() === 'white' ? 'inset 0 0 0 1px #e5e7eb' : 'none',
                        }}
                      ></div>
                      <input
                        type="radio"
                        name="color"
                        value={colorName}
                        checked={customization.color === colorName}
                        onChange={(e) => setCustomization((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))}
                        className="sr-only"
                      />
                      <span className="text-xs">{colorName}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Length Selection */}
              <div>
                <label htmlFor="length" className="block font-medium mb-2">
                  Length (meters)
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomization((prev) => ({
                        ...prev,
                        length: Math.max(fabric.minOrderLength, prev.length - 1),
                      }))
                    }
                    className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    id="length"
                    min={fabric.minOrderLength}
                    step={1}
                    value={customization.length}
                    onChange={(e) =>
                      setCustomization((prev) => ({
                        ...prev,
                        length: Math.max(
                          fabric.minOrderLength,
                          parseInt(e.target.value) || fabric.minOrderLength
                        ),
                      }))
                    }
                    className="w-20 text-center py-2 border-y border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCustomization((prev) => ({
                        ...prev,
                        length: prev.length + 1,
                      }))
                    }
                    className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Special Instructions */}
              <div>
                <label htmlFor="notes" className="block font-medium mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="notes"
                  value={customization.notes}
                  onChange={(e) =>
                    setCustomization((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Any specific requirements for your order..."
                ></textarea>
              </div>
              
              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Price per meter:</span>
                  <span>${fabric.pricePerMeter.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Length:</span>
                  <span>{customization.length} m</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                  <span>Total Price:</span>
                  <span>${(fabric.pricePerMeter * customization.length).toFixed(2)}</span>
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

export default FabricDetailPage;