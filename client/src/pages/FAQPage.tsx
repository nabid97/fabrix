import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

// FAQ Category type
interface FAQCategory {
  id: string;
  name: string;
  faqs: FAQ[];
}

// FAQ type
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQPage = () => {
  // State for expanded FAQs
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Toggle FAQ expansion
  const toggleFAQ = (id: string) => {
    setExpandedFAQs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // FAQ data grouped by category
  const faqCategories: FAQCategory[] = [
    {
      id: 'ordering',
      name: 'Ordering & Payment',
      faqs: [
        {
          id: 'order-minimum',
          question: 'What is the minimum order quantity for clothing?',
          answer: 'Our minimum order quantity varies by product, but typically starts at 50 pieces per style and color. This allows us to provide high-quality customization while keeping costs reasonable.',
        },
        {
          id: 'order-time',
          question: 'How long does it take to fulfill an order?',
          answer: 'Production time is typically 2-3 weeks after order confirmation and artwork approval. For large orders or custom fabrics, it may take 3-4 weeks. Shipping time depends on your location, but we offer expedited shipping options if you need your order sooner.',
        },
        {
          id: 'payment-methods',
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for larger orders. For corporate clients, we also offer net 30 payment terms subject to credit approval.',
        },
        {
          id: 'order-cancel',
          question: 'Can I cancel or modify my order after placing it?',
          answer: 'Order modifications or cancellations are possible within 24 hours of placing your order. After this period, once production has begun, we cannot accept cancellations. Please contact our customer service team immediately if you need to make changes.',
        },
      ],
    },
    {
      id: 'products',
      name: 'Products & Customization',
      faqs: [
        {
          id: 'samples-available',
          question: 'Can I get samples before placing a bulk order?',
          answer: 'Yes, we offer sample services for a nominal fee. You can order individual samples to check the quality, color, and fit before placing a larger order. Sample costs are credited toward your final order if you proceed with the bulk purchase.',
        },
        {
          id: 'custom-design',
          question: 'Can I create custom designs with my own logo?',
          answer: 'Absolutely! You can upload your own logo or use our Logo Generator to create a custom design. We offer various printing and embroidery techniques to apply your logo to the clothing items. Our team will work with you to ensure optimal placement and quality.',
        },
        {
          id: 'fabric-quality',
          question: 'What is the quality of your fabrics?',
          answer: 'We source our fabrics from premium suppliers who meet international quality and sustainability standards. Each fabric undergoes rigorous testing for durability, colorfastness, and comfort. Detailed specifications including composition, weight, and care instructions are provided on each product page.',
        },
        {
          id: 'size-guide',
          question: 'How do I find the right sizes for my order?',
          answer: 'We provide detailed size charts for each product category. For bulk orders, we recommend ordering samples first to confirm sizing. We also offer size customization for larger orders, including the creation of custom size charts tailored to your specific requirements.',
        },
        {
          id: 'eco-friendly',
          question: 'Do you offer eco-friendly fabric options?',
          answer: 'Yes, we offer a range of sustainable and eco-friendly fabrics including organic cotton, recycled polyester, and other environmentally conscious options. These are clearly marked on our product pages, and we can provide certification documentation upon request.',
        },
      ],
    },
    {
      id: 'shipping',
      name: 'Shipping & Delivery',
      faqs: [
        {
          id: 'international-shipping',
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary based on location. You can get an estimate of shipping costs during checkout before completing your purchase.',
        },
        {
          id: 'track-order',
          question: 'How can I track my order?',
          answer: 'Once your order ships, you will receive a confirmation email with a tracking number and link. You can also track your order by logging into your account on our website or contacting our customer service team.',
        },
        {
          id: 'shipping-cost',
          question: 'How are shipping costs calculated?',
          answer: 'Shipping costs are calculated based on the weight of your order, dimensions, and delivery location. We work with multiple shipping partners to offer you the best rates. For bulk orders, we may split shipments to optimize costs.',
        },
      ],
    },
    {
      id: 'returns',
      name: 'Returns & Exchanges',
      faqs: [
        {
          id: 'return-policy',
          question: 'What is your return policy?',
          answer: 'For standard catalog items without customization, we offer a 30-day return policy. Custom orders (including logo printing, embroidery, or custom fabrics) can only be returned if there is a manufacturing defect. All returns must be in original unused condition with tags attached.',
        },
        {
          id: 'defective-items',
          question: 'What if I receive defective items?',
          answer: 'If you receive defective items, please contact us within 7 days of delivery with photos of the defects. Our quality control team will review your claim and arrange for replacements or refunds as appropriate, including covering return shipping costs for confirmed defects.',
        },
        {
          id: 'exchange-process',
          question: 'How does the exchange process work?',
          answer: 'To request an exchange, contact our customer service team within 30 days of receiving your order. They will guide you through the process and provide a return label if the exchange is due to our error. For size exchanges on custom orders, additional fees may apply.',
        },
      ],
    },
    {
      id: 'account',
      name: 'Account & Privacy',
      faqs: [
        {
          id: 'create-account',
          question: 'Do I need to create an account to place an order?',
          answer: 'Yes, an account is required to place orders. This allows us to provide better service, save your order history, and simplify reordering. Creating an account is quick and only requires basic information to get started.',
        },
        {
          id: 'data-privacy',
          question: 'How is my personal data handled?',
          answer: 'We take data privacy seriously. Your personal information is encrypted and stored securely. We never share your data with third parties except as required to fulfill your order (such as shipping partners). You can review our complete Privacy Policy for more details.',
        },
        {
          id: 'save-designs',
          question: 'Can I save my designs for future orders?',
          answer: 'Yes, when you create a design using our Logo Generator or upload your own designs, they are saved to your account. You can access and reuse them for future orders, making reordering simple and consistent.',
        },
      ],
    },
  ];

  // Flatten all FAQs for search
  const allFAQs = faqCategories.flatMap((category) => category.faqs);

  // Filter FAQs based on search query and selected category
  const filteredFAQs = allFAQs.filter((faq) => {
    const matchesSearch =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null ||
      faqCategories.find((category) => category.id === selectedCategory)?.faqs.includes(faq);

    return matchesSearch && matchesCategory;
  });

  // Group filtered FAQs by category for display
  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter((faq) => filteredFAQs.includes(faq)),
  })).filter((category) => category.faqs.length > 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      {/* Search and Filter */}
      <div className="mb-10 max-w-2xl mx-auto">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-md text-sm ${
              selectedCategory === null
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm ${
                selectedCategory === category.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordions */}
      <div className="max-w-3xl mx-auto">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-2">No matching FAQs found</h3>
            <p className="text-gray-600">
              Try adjusting your search query or selecting a different category.
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="mb-8">
              {(selectedCategory === null || filteredCategories.length > 1) && (
                <h2 className="text-xl font-bold mb-4">{category.name}</h2>
              )}
              <div className="space-y-4">
                {category.faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQs.includes(faq.id) ? (
                        <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQs.includes(faq.id) && (
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contact Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Can't find what you're looking for?</h2>
        <p className="text-gray-700 mb-6">
          Our customer support team is here to help with any questions you might have.
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default FAQPage;