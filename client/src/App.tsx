// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from "react-oidc-context";
import { CartProvider } from './contexts/CartContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';
import Chatbot from './components/common/Chatbot';

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
  const auth = useAuth();
  
  const signOutRedirect = () => {
    const clientId = "3ooosvm0j68hnsvpnangdlkfvt";
    const logoutUri = "https://d84l1y8p4kdic.cloudfront.net"; // Replace with your actual logout URI
    const cognitoDomain = "https://us-east-19h0gljvwo.auth.us-east-1.amazoncognito.com"; // Replace with your actual Cognito domain
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <LoadingSpinner message="Loading authentication..." />;
  }

  if (auth.error) {
    return <div className="container mx-auto p-4">
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Authentication Error</h2>
        <p>{auth.error.message}</p>
      </div>
    </div>;
  }

  // Debug view for authentication data - you can remove this in production
  if (process.env.NODE_ENV === 'development' && false) { // Set to true to enable debug view
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[80vh]">
          <p>Authenticated: {auth.isAuthenticated ? 'Yes' : 'No'}</p>
          <p>Email: {auth.user?.profile.email}</p>
          <p>ID Token: {auth.user?.id_token}</p>
          <p>Access Token: {auth.user?.access_token}</p>
        </pre>
        <div className="mt-4 space-x-4">
          <button 
            onClick={() => auth.signinRedirect()}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign in
          </button>
          <button 
            onClick={() => auth.removeUser()}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Sign out (Local)
          </button>
          <button 
            onClick={signOutRedirect}
            className="bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Sign out (Redirect)
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <CartProvider>
        <ChatbotProvider>
          <div className="flex flex-col min-h-screen">
            <Header isAuthenticated={auth.isAuthenticated} user={auth.user} signOut={auth.removeUser} />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/clothing" element={<ClothingPage />} />
                  <Route path="/fabrics" element={<FabricsPage />} />
                  <Route path="/logo-generator" element={<LogoGeneratorPage />} />
                  <Route path="/contact" element={<ContactUsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  
                  {/* Auth routes - conditionally rendered based on auth state */}
                  {!auth.isAuthenticated ? (
                    <>
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/login" element={
                        <div className="text-center p-8">
                          <h2 className="text-xl mb-4">Please sign in to continue</h2>
                          <button 
                            onClick={() => auth.signinRedirect()}
                            className="bg-teal-600 text-white px-6 py-2 rounded-md"
                          >
                            Sign in with Cognito
                          </button>
                        </div>
                      } />
                    </>
                  ) : null}
                  
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* Protected routes that require authentication */}
                  <Route 
                    path="/checkout" 
                    element={
                      auth.isAuthenticated ? (
                        <CheckoutPage />
                      ) : (
                        <div className="text-center p-8">
                          <h2 className="text-xl mb-4">Please sign in to checkout</h2>
                          <button 
                            onClick={() => auth.signinRedirect()}
                            className="bg-teal-600 text-white px-6 py-2 rounded-md"
                          >
                            Sign in with Cognito
                          </button>
                        </div>
                      )
                    } 
                  />
                  
                  <Route 
                    path="/order-confirmation/:orderId" 
                    element={
                      auth.isAuthenticated ? (
                        <OrderConfirmationPage />
                      ) : (
                        <div className="text-center p-8">
                          <h2 className="text-xl mb-4">Please sign in to view your order</h2>
                          <button 
                            onClick={() => auth.signinRedirect()}
                            className="bg-teal-600 text-white px-6 py-2 rounded-md"
                          >
                            Sign in with Cognito
                          </button>
                        </div>
                      )
                    } 
                  />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <Chatbot />
          </div>
        </ChatbotProvider>
      </CartProvider>
    </Router>
  );
}

export default App;