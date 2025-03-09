import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronDown } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Categories dropdown state
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call handler right away to get initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold text-teal-600">FabriX</a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-teal-600 font-medium">Home</a>
            
            {/* Categories dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-teal-600 font-medium"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                Categories <ChevronDown size={16} className="ml-1" />
              </button>
              
              {/* Dropdown menu */}
              <div 
                className={`absolute left-0 w-56 mt-2 bg-white shadow-xl rounded-lg py-2 transform transition-all duration-200 ${categoriesOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <a href="/clothing" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">
                  Clothing
                </a>
                <a href="/fabrics" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">
                  Fabrics
                </a>
                <a href="/accessories" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">
                  Accessories
                </a>
                <a href="/logo-generator" className="block px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600">
                  Logo Generator
                </a>
              </div>
            </div>
            
            <a href="/new-arrivals" className="text-gray-700 hover:text-teal-600 font-medium">New Arrivals</a>
            <a href="/sales" className="text-gray-700 hover:text-teal-600 font-medium">Sale</a>
            <a href="/contact" className="text-gray-700 hover:text-teal-600 font-medium">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            {/* Wishlist - Desktop only */}
            <a href="/wishlist" className="hidden sm:block text-gray-700 hover:text-teal-600">
              <Heart size={20} />
            </a>
            
            {/* User Account - Desktop only */}
            <a href="/account" className="hidden sm:block text-gray-700 hover:text-teal-600">
              <User size={20} />
            </a>
            
            {/* Cart */}
            <a href="/cart" className="text-gray-700 hover:text-teal-600 relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-teal-600 focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar - Expandable */}
        <div className={`mt-4 transition-all duration-300 overflow-hidden ${searchOpen ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <div 
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="px-4 py-6 space-y-6">
          <a href="/" className="block text-lg font-medium">Home</a>
          
          <div className="space-y-4">
            <p className="font-bold text-gray-700">Categories</p>
            <a href="/clothing" className="block ml-4 text-gray-600 hover:text-teal-600">Clothing</a>
            <a href="/fabrics" className="block ml-4 text-gray-600 hover:text-teal-600">Fabrics</a>
            <a href="/accessories" className="block ml-4 text-gray-600 hover:text-teal-600">Accessories</a>
            <a href="/logo-generator" className="block ml-4 text-gray-600 hover:text-teal-600">Logo Generator</a>
          </div>
          
          <a href="/new-arrivals" className="block text-lg font-medium">New Arrivals</a>
          <a href="/sales" className="block text-lg font-medium">Sale</a>
          <a href="/contact" className="block text-lg font-medium">Contact</a>
          
          <div className="pt-6 mt-6 border-t border-gray-200">
            <a href="/account" className="flex items-center py-2 text-gray-600 hover:text-teal-600">
              <User size={20} className="mr-2" />
              My Account
            </a>
            <a href="/wishlist" className="flex items-center py-2 text-gray-600 hover:text-teal-600">
              <Heart size={20} className="mr-2" />
              Wishlist
            </a>
            <a href="/cart" className="flex items-center py-2 text-gray-600 hover:text-teal-600">
              <ShoppingBag size={20} className="mr-2" />
              Cart ({cartCount})
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;