import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useChatbot } from '../../contexts/ChatbotContext';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { User as UserIcon } from 'lucide-react'; // Rename to avoid conflict with User type

// Make all props optional
interface HeaderProps {
  // Props are optional because we'll use hooks within the component by default
}

const Header: React.FC<HeaderProps> = () => {
  const { itemCount } = useCart();
  const { toggleChatbot } = useChatbot();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-teal-600">FabriX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">
              Home
            </Link>
            <Link to="/clothing" className="text-gray-700 hover:text-teal-600 font-medium">
              Clothing
            </Link>
            <Link to="/fabrics" className="text-gray-700 hover:text-teal-600 font-medium">
              Fabrics
            </Link>
            <Link to="/logo-generator" className="text-gray-700 hover:text-teal-600 font-medium">
              Logo Generator
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Chat Button */}
            <button
              onClick={toggleChatbot}
              className="text-gray-700 hover:text-teal-600"
              aria-label="Chat with us"
            >
              <MessageCircle size={24} />
            </button>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-teal-600 relative">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600">
                  <UserIcon size={24} />
                  <span className="hidden lg:inline">
  {user?.name || user?.email?.split('@')[0] || 'Account'}
</span>
                </button>
                <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-teal-600 font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/clothing"
                className="text-gray-700 hover:text-teal-600 font-medium"
                onClick={toggleMenu}
              >
                Clothing
              </Link>
              <Link
                to="/fabrics"
                className="text-gray-700 hover:text-teal-600 font-medium"
                onClick={toggleMenu}
              >
                Fabrics
              </Link>
              <Link
                to="/logo-generator"
                className="text-gray-700 hover:text-teal-600 font-medium"
                onClick={toggleMenu}
              >
                Logo Generator
              </Link>
              
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block py-2 text-gray-700 hover:text-teal-600"
                      onClick={toggleMenu}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-2 text-gray-700 hover:text-teal-600"
                      onClick={toggleMenu}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="block py-2 text-gray-700 hover:text-teal-600 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-teal-600 font-medium"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-center"
                      onClick={toggleMenu}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;