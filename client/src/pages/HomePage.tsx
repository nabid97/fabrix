import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">FabriX</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Premium fabrics and custom clothing solutions for businesses
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/clothing"
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore Clothing
            </Link>
            <Link
              to="/fabrics"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-colors shadow-lg"
            >
              Browse Fabrics
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">Our Mission</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              At FabriX, we're committed to providing high-quality fabrics and custom clothing solutions
              that help businesses create unique identities through textile. Our mission is to combine
              innovation, sustainability, and exceptional craftsmanship to deliver products that exceed
              our clients' expectations while minimizing environmental impact.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-200">
                <img
                  src="/api/placeholder/400/320"
                  alt="Cotton Fabric"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Premium Cotton</h3>
                <p className="text-gray-600 mb-4">
                  High-quality, sustainable cotton for comfortable and durable clothing.
                </p>
                <Link
                  to="/fabrics/cotton"
                  className="text-teal-600 font-medium inline-flex items-center hover:text-teal-700"
                >
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-200">
                <img
                  src="/api/placeholder/400/320"
                  alt="Custom Polo Shirts"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Custom Polo Shirts</h3>
                <p className="text-gray-600 mb-4">
                  Professional polo shirts with your logo, perfect for company uniforms.
                </p>
                <Link
                  to="/clothing/polo-shirts"
                  className="text-teal-600 font-medium inline-flex items-center hover:text-teal-700"
                >
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gray-200">
                <img
                  src="/api/placeholder/400/320"
                  alt="Logo Design Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Logo Design</h3>
                <p className="text-gray-600 mb-4">
                  Create a custom logo for your brand with our AI-powered generator.
                </p>
                <Link
                  to="/logo-generator"
                  className="text-teal-600 font-medium inline-flex items-center hover:text-teal-700"
                >
                  Try Now <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Our Suppliers' Customers</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <img src="/api/placeholder/120/60" alt="Primark" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <img src="/api/placeholder/120/60" alt="H&M" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <img src="/api/placeholder/120/60" alt="Zara" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <img src="/api/placeholder/120/60" alt="Nike" className="max-w-full max-h-full" />
            </div>
            <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
              <img src="/api/placeholder/120/60" alt="Adidas" className="max-w-full max-h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Story</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Founded in 2025, FabriX has grown from a small fabric supplier to a comprehensive 
                textile solution provider serving businesses across the globe. Our journey started 
                with a passion for quality fabrics and a vision to revolutionize how businesses 
                approach their textile needs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we're proud to offer not just premium fabrics, but also custom clothing 
                production, logo design services, and end-to-end supply chain solutions for businesses 
                of all sizes. Our commitment to sustainability and innovation drives everything we do.
              </p>
            </div>
            <div className="bg-gray-200 rounded-xl overflow-hidden h-80">
              <img
                src="/api/placeholder/600/480"
                alt="FabriX Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Contact our team today to discuss your fabric and clothing needs.
          </p>
          <Link
            to="/contact"
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;