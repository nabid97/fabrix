import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import Chatbot from './components/common/Chatbot';
import { HelmetProvider } from 'react-helmet-async';

// Lazy-loaded page components
const HomePage = lazy(() => import('./pages/HomePage'));
const ClothingPage = lazy(() => import('./pages/ClothingPage'));
const ClothingDetailPage = lazy(() => import('./pages/ClothingDetailPage'));
const FabricsPage = lazy(() => import('./pages/FabricsPage'));
const FabricDetailPage = lazy(() => import('./pages/FabricDetailPage'));
const LogoGeneratorPage = lazy(() => import('./pages/LogoGeneratorPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = lazy(() => import('./pages/OrderConfirmationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <CartProvider>
            <ChatbotProvider>
              <div className="flex flex-col min-h-screen">
                {/* No props needed as Header now uses the AuthContext internally */}
                <Header />
                <main className="flex-grow">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/clothing" element={<ClothingPage />} />
                      <Route path="/clothing/:productSlug" element={<ClothingDetailPage />} />
                      <Route path="/fabrics" element={<FabricsPage />} />
                      <Route path="/fabrics/:fabricSlug" element={<FabricDetailPage />} />
                      <Route path="/logo-generator" element={<LogoGeneratorPage />} />
                      <Route path="/contact" element={<ContactUsPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <Chatbot />
              </div>
            </ChatbotProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;