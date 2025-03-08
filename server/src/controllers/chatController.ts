import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { generateGeminiResponse } from '../services/ai/geminiService';

// @desc    Generate AI response using Gemini API
// @route   POST /api/chat/gemini
// @access  Public
export const generateChatResponse = asyncHandler(async (req: Request, res: Response) => {
  const { messages, generationConfig } = req.body;
  
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new ApiError(400, 'Messages are required and must be an array');
  }
  
  try {
    // Generate response using Gemini API
    const response = await generateGeminiResponse(messages, generationConfig);
    
    res.json({
      success: true,
      response
    });
  } catch (error) {
    console.error('AI chat generation error:', error);
    throw new ApiError(500, 'Failed to generate AI response');
  }
});

// @desc    Get quick FAQ response without using AI
// @route   GET /api/chat/faq
// @access  Public
export const getFAQResponse = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;
  
  if (!query || typeof query !== 'string') {
    throw new ApiError(400, 'Query parameter is required');
  }
  
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
  
  // Check if the query contains any FAQ keywords
  const lowerCaseQuery = query.toLowerCase();
  
  for (const [keyword, response] of Object.entries(faqResponses)) {
    if (lowerCaseQuery.includes(keyword)) {
      return res.json({
        success: true,
        response: {
          text: response,
          isFAQ: true,
          matchedKeyword: keyword
        }
      });
    }
  }
  
  // No match found
  res.json({
    success: true,
    response: {
      text: null,
      isFAQ: false
    }
  });
});
