import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ClothingPage = lazy(() => import('./pages/ClothingPage'));
const FabricsPage = lazy(() => import('./pages/FabricsPage'));
const LogoGeneratorPage = lazy(() => import('./pages/LogoGeneratorPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ChatbotProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/clothing" element={<ClothingPage />} />
                    <Route path="/fabrics" element={<FabricsPage />} />
                    <Route path="/logo-generator" element={<LogoGeneratorPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <CheckoutPage />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/order-confirmation/:orderId" 
                      element={
                        <ProtectedRoute>
                          <OrderConfirmationPage />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ChatbotProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;