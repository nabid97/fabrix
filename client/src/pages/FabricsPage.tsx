import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { fetchFabrics } from '../api/productApi';
import { ShoppingCart, Filter, X, Plus, Minus } from 'lucide-react';

// Fabric Type
interface Fabric {
  id: string;
  name: string;
  type: string;
  pricePerMeter: number;
  imageUrl: string;
  description: string;
  availableColors: string[];
  styles: string[];
  composition: string;
  weight: string;
  minOrderLength: number;
}

// Color options with hex values
const colorOptions = [
  { name: 'White', value: 'white', hex: '#FFFFFF' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'Navy', value: 'navy', hex: '#0a192f' },
  { name: 'Red', value: 'red', hex: '#e11d48' },
  { name: 'Green', value: 'green', hex: '#059669' },
  { name: 'Blue', value: 'blue', hex: '#3b82f6' },
  { name: 'Gray', value: 'gray', hex: '#6b7280' },
  { name: 'Yellow', value: 'yellow', hex: '#fbbf24' },
  { name: 'Purple', value: 'purple', hex: '#8b5cf6' },
  { name: 'Pink', value: 'pink', hex: '#ec4899' },
  { name: 'Beige', value: 'beige', hex: '#e5e7eb' },
  { name: 'Brown', value: 'brown', hex: '#92400e' },
];

const FabricsPage = () => {
  const { addItem } = useCart();
  
  // Fabric state
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [showFilters, setShowFilters] = useState(false);
  
  // Selected fabric state for customization
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [customization, setCustomization] = useState({
    color: '',
    length: 1,
    notes: '',
  });
  
  // Load fabrics on initial render
  useEffect(() => {
    const loadFabrics = async () => {
      setLoading(true);
      try {
        const data = await fetchFabrics();
        setFabrics(data);
      } catch (err) {
        setError('Failed to load fabrics. Please try again later.');
        console.error('Error loading fabrics:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadFabrics();
  }, []);
  
  // Filter fabrics based on selections
  const filteredFabrics = fabrics.filter((fabric) => {
    // Filter by type
    if (selectedTypes.length > 0 && !selectedTypes.includes(fabric.type.toLowerCase())) {
      return false;
    }
    
    // Filter by color
    if (selectedColors.length > 0 && !fabric.availableColors.some(c => selectedColors.includes(c.toLowerCase()))) {
      return false;
    }
    
    // Filter by style
    if (selectedStyles.length > 0 && !fabric.styles.some(s => selectedStyles.includes(s.toLowerCase()))) {
      return false;
    }
    
    // Filter by price
    if (fabric.pricePerMeter < minPrice || fabric.pricePerMeter > maxPrice) {
      return false;
    }
    
    return true;
  });
  
  // Toggle selection of filter items
  const toggleFilter = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };
  
  // Handle opening the customization modal
  const openCustomization = (fabric: Fabric) => {
    setSelectedFabric(fabric);
    // Set default customization values
    setCustomization({
      color: fabric.availableColors[0],
      length: fabric.minOrderLength,
      notes: '',
    });
  };
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedFabric) return;
    
    // Calculate total price based on length
    const totalPrice = selectedFabric.pricePerMeter * customization.length;
    
    // Create cart item
    const cartItem = {
      id: `${selectedFabric.id}-${Date.now()}`,
      type: 'fabric' as const,
      name: selectedFabric.name,
      price: totalPrice,
      quantity: 1, // One order item
      imageUrl: selectedFabric.imageUrl,
      fabricType: selectedFabric.type,
      color: customization.color,
      length: customization.length,
      fabricStyle: selectedFabric.styles[0],
      notes: customization.notes
    };
    
    // Add to cart
    addItem(cartItem);
    
    // Close modal
    setSelectedFabric(null);
  };
  
  // All possible fabric types from the data
  const allFabricTypes = [...new Set(fabrics.map((fabric) => fabric.type.toLowerCase()))];
  
  // All possible fabric styles from the data
  const allFabricStyles = [...new Set(fabrics.flatMap((fabric) => fabric.styles.map(s => s.toLowerCase())))];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Premium Fabrics</h1>
      
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-gray-100 px-4 py-2 rounded-md flex items-center justify-center space-x-2"
        >
          <Filter size={18} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block lg:w-1/4 bg-white rounded-xl shadow-md p-6 h-fit sticky top-24`}
        >
          <h2 className="text-xl font-semibold mb-6">Filters</h2>
          
          {/* Fabric Type Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Fabric Type</h3>
            <div className="space-y-2">
              {allFabricTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Color Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Color</h3>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <label
                  key={color.value}
                  className={`flex flex-col items-center cursor-pointer`}
                  title={color.name}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color.value)
                        ? 'border-teal-500'
                        : 'border-gray-300'
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: color.value === 'white' ? 'inset 0 0 0 1px #e5e7eb' : 'none',
                    }}
                  >
                    {selectedColors.includes(color.value) && (
                      <div className="flex items-center justify-center h-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={color.value === 'white' ? 'black' : 'white'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color.value)}
                    onChange={() => toggleFilter(color.value, selectedColors, setSelectedColors)}
                    className="sr-only"
                  />
                  <span className="text-xs mt-1">{color.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Fabric Style Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Fabric Style</h3>
            <div className="space-y-2">
              {allFabricStyles.map((style) => (
                <label key={style} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style)}
                    onChange={() => toggleFilter(style, selectedStyles, setSelectedStyles)}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="capitalize">{style}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range (per meter)</h3>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="minPrice" className="sr-only">
                  Minimum Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    min="0"
                    max={maxPrice}
                    className="pl-7 pr-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
              <span>to</span>
              <div>
                <label htmlFor="maxPrice" className="sr-only">
                  Maximum Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    min={minPrice}
                    className="pl-7 pr-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Reset Filters */}
          <button
            onClick={() => {
              setSelectedTypes([]);
              setSelectedColors([]);
              setSelectedStyles([]);
              setMinPrice(0);
              setMaxPrice(100);
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
        
        {/* Fabric Grid */}
        <div className="lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          ) : filteredFabrics.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No fabrics found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedColors([]);
                  setSelectedStyles([]);
                  setMinPrice(0);
                  setMaxPrice(100);
                }}
                className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFabrics.map((fabric) => (
                <div
                  key={fabric.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={fabric.imageUrl}
                      alt={fabric.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{fabric.name}</h3>
                    <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                      {fabric.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {fabric.type}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {fabric.weight}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {fabric.composition}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-teal-600">
                        ${fabric.pricePerMeter.toFixed(2)}/m
                      </span>
                      <span className="text-sm text-gray-500">
                        Min. Order: {fabric.minOrderLength}m
                      </span>
                    </div>
                    
                    <button
                      onClick={() => openCustomization(fabric)}
                      className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Order Fabric
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Fabric Customization Modal */}
      {selectedFabric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Fabric</h2>
              <button
                onClick={() => setSelectedFabric(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Fabric Preview */}
                <div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                    <img
                      src={selectedFabric.imageUrl}
                      alt={selectedFabric.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">{selectedFabric.name}</h3>
                    <p className="text-gray-600">${selectedFabric.pricePerMeter.toFixed(2)} per meter</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedFabric.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Composition:</span>
                      <span className="font-medium">{selectedFabric.composition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium">{selectedFabric.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Order:</span>
                      <span className="font-medium">{selectedFabric.minOrderLength} meters</span>
                    </div>
                  </div>
                </div>
                
                {/* Customization Form */}
                <div>
                  <div className="space-y-6">
                    {/* Color Selection */}
                    <div>
                      <label className="block font-medium mb-2">Color</label>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedFabric.availableColors.map((colorName) => {
                          const colorOption = colorOptions.find(
                            (c) => c.value === colorName.toLowerCase()
                          );
                          return (
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
                                  backgroundColor: colorOption?.hex || '#CCCCCC',
                                  boxShadow:
                                    colorName.toLowerCase() === 'white'
                                      ? 'inset 0 0 0 1px #e5e7eb'
                                      : 'none',
                                }}
                              ></div>
                              <input
                                type="radio"
                                name="color"
                                value={colorName}
                                checked={customization.color === colorName}
                                onChange={(e) =>
                                  setCustomization((prev) => ({
                                    ...prev,
                                    color: e.target.value,
                                  }))
                                }
                                className="sr-only"
                              />
                              <span className="text-xs">{colorName}</span>
                            </label>
                          );
                        })}
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
                              length: Math.max(selectedFabric.minOrderLength, prev.length - 1),
                            }))
                          }
                          className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          id="length"
                          min={selectedFabric.minOrderLength}
                          step={1}
                          value={customization.length}
                          onChange={(e) =>
                            setCustomization((prev) => ({
                              ...prev,
                              length: Math.max(
                                selectedFabric.minOrderLength,
                                parseInt(e.target.value) || selectedFabric.minOrderLength
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
                        <span>${selectedFabric.pricePerMeter.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Length:</span>
                        <span>{customization.length} m</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                        <span>Total Price:</span>
                        <span>${(selectedFabric.pricePerMeter * customization.length).toFixed(2)}</span>
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
        </div>
      )}
      
      {/* Information Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">About Our Fabrics</h2>
        <p className="text-gray-700 mb-4">
          All our fabrics are sourced from premium suppliers and undergo rigorous quality testing. 
          We offer a wide range of fabric types suitable for various applications, from fashion to 
          home décor and industrial use.
        </p>
        <p className="text-gray-700">
          Each fabric has a minimum order length requirement. Custom dyeing and printing services 
          are available for larger orders. Please contact our team for special requirements not 
          available through our standard ordering process.
        </p>
      </div>
    </div>
  );
};

export default FabricsPage;