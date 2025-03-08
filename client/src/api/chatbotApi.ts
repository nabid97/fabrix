import axios from 'axios';

// Message type for chatbot history
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

/**
 * Generate AI response using Gemini API
 * 
 * @param userMessage The current user message
 * @param chatHistory Previous messages in the conversation
 * @returns AI generated response
 */
export const generateAIResponse = async (
  userMessage: string,
  chatHistory: Message[]
): Promise<string> => {
  try {
    // Format chat history for the API
    const formattedHistory = chatHistory
      .map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }))
      .slice(-5); // Only use the last 5 messages for context
    
    // Add current user message
    const messages = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];
    
    // Call to the Gemini API (via our backend proxy)
    const response = await axios.post('/api/chat/gemini', {
      messages,
      // Configuration for the model
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });
    
    // Extract the response text
    return response.data.response.text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Fallback response in case of error
    return "I'm sorry, I'm having trouble connecting right now. Please try again later or contact our support team for assistance.";
  }
};

/**
 * Check if user should be redirected to the contact form
 * 
 * @param userMessage The current user message
 * @param chatHistory Previous messages in the conversation
 * @returns Boolean indicating if user should be redirected
 */
export const shouldRedirectToContactForm = (
  userMessage: string,
  chatHistory: Message[]
): boolean => {
  // Count how many messages have been exchanged
  const messageCount = chatHistory.length;
  
  // Complex inquiries typically have these keywords
  const complexInquiryKeywords = [
    'speak to human',
    'speak to agent',
    'speak to representative',
    'talk to support',
    'speak with someone',
    'contact person',
    'real person',
    'agent',
    'representative',
    'human',
  ];
  
  // Check if the user is asking for a human explicitly
  const isAskingForHuman = complexInquiryKeywords.some((keyword) =>
    userMessage.toLowerCase().includes(keyword)
  );
  
  // Check if this is a long conversation (more than 10 exchanges might indicate the AI can't resolve the issue)
  const isLongConversation = messageCount > 10;
  
  return isAskingForHuman || isLongConversation;
};

/**
 * Get FAQ-based response for common questions
 * 
 * @param userMessage The current user message
 * @returns FAQ response if available, null otherwise
 */
export const getQuickFAQResponse = (userMessage: string): string | null => {
  // Map of common questions and quick responses
  const faqResponses: Record<string, string> = {
    'shipping': 'We offer worldwide shipping with delivery times varying by location. Orders typically arrive within 5-10 business days domestically and 10-20 business days internationally.',
    'return': 'Our return policy allows returns within 30 days for standard catalog items without customization. Custom orders can only be returned if there is a manufacturing defect.',
    'minimum order': 'Our minimum order quantity for clothing typically starts at 50 pieces per style and color. For fabrics, minimum order lengths vary by product.',
    'payment methods': 'We accept all major credit cards, PayPal, and bank transfers for larger orders. For corporate clients, we also offer net 30 payment terms subject to credit approval.',
    'samples': 'Yes, we offer sample services for a nominal fee. Sample costs are credited toward your final order if you proceed with a bulk purchase.',
    'production time': 'Production time is typically 2-3 weeks after order confirmation and artwork approval. For large orders or custom fabrics, it may take 3-4 weeks.',
    'track order': 'You can track your order by logging into your account on our website or using the tracking number provided in your shipping confirmation email.',
  };
  
  // Check if the user message contains any FAQ keywords
  const lowerCaseMessage = userMessage.toLowerCase();
  for (const [keyword, response] of Object.entries(faqResponses)) {
    if (lowerCaseMessage.includes(keyword)) {
      return response;
    }
  }
  
  // No matching FAQ found
  return null;
};