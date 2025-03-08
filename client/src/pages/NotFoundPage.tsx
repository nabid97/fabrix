import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Helmet>
        <title>404 - Page Not Found | FabriX</title>
        <meta name="description" content="The page you requested could not be found." />
      </Helmet>
      
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mb-8">
          <Link to="/" className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors">
            Return to Home
          </Link>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Or explore our collections:</h2>
          <div className="flex space-x-4">
            <Link
              to="/clothing"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Shop Clothing
            </Link>
            <Link
              to="/fabrics"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Shop Fabrics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;