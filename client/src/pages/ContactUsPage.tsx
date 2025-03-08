import { useState } from 'react';
import { useChatbot } from '../contexts/ChatbotContext';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';

// Form data type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactUsPage = () => {
  const { toggleChatbot } = useChatbot();
  
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // In a real app, you would send this data to your backend
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Successful submission
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Pre-defined subject options
  const subjectOptions = [
    'General Inquiry',
    'Order Status',
    'Custom Quote Request',
    'Returns & Exchanges',
    'Bulk Order Information',
    'Technical Support',
    'Other',
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      
      {/* Contact Options */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We're here to help! Choose how you'd like to get in touch with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Chatbot Option */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MessageCircle size={32} className="text-teal-600" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Chat with our AI Assistant</h2>
              <p className="text-gray-600 text-center mb-6">
                Get immediate answers to common questions with our AI chatbot.
              </p>
              <button
                onClick={toggleChatbot}
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-md font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
              >
                <MessageCircle size={20} className="mr-2" />
                Start Chat
              </button>
            </div>
          </div>
          
          {/* Contact Form Option */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Mail size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-center mb-2">Send Us a Message</h2>
              <p className="text-gray-600 text-center mb-6">
                Fill out our contact form for a response from our team within 24 hours.
              </p>
              <a
                href="#contact-form"
                className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors text-center"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Company Contact Information */}
      <div className="max-w-5xl mx-auto mb-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin size={24} className="text-teal-600" />
            </div>
            <h3 className="font-semibold mb-2">Address</h3>
            <address className="not-italic text-gray-600">
              123 Fabric Street, Suite 100<br />
              Textile City, TX 75001<br />
              United States
            </address>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} className="text-teal-600" />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">
              <a href="tel:+15551234567" className="hover:text-teal-600 transition-colors">
                +1 (555) 123-4567
              </a>
              <br />
              <span className="text-sm">
                Monday-Friday: 8am-6pm ET<br />
                Saturday: 9am-3pm ET
              </span>
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mail size={24} className="text-teal-600" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-600">
              <a href="mailto:info@fabrix.com" className="hover:text-teal-600 transition-colors">
                info@fabrix.com
              </a>
              <br />
              <a href="mailto:orders@fabrix.com" className="hover:text-teal-600 transition-colors">
                orders@fabrix.com
              </a>
              <br />
              <a href="mailto:support@fabrix.com" className="hover:text-teal-600 transition-colors">
                support@fabrix.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div id="contact-form" className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        
        {submitSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Thank you for your message!</h3>
            <p>
              We've received your inquiry and will get back to you within 24 hours. A confirmation 
              has been sent to your email address.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {submitError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Send Message
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-4">
              * Required fields. By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </div>
      
      {/* Map Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <div className="bg-gray-200 rounded-xl h-80 overflow-hidden">
          {/* This would typically be a Google Maps embed */}
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <div className="text-center">
              <MapPin size={48} className="text-gray-500 mb-2 mx-auto" />
              <p className="text-gray-700">Map location would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;