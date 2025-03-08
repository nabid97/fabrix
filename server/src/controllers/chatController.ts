import { Request, Response } from 'express';
//import { asyncHandler } from '../middleware/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { generateGeminiResponse } from '../services/ai/geminiService';
import asyncHandler from 'express-async-handler';

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
  try {
    // Your logic here
    res.status(200).json({ success: true, data: 'FAQ response' });
  } catch (error) {
    console.error('FAQ Response Error:', error);
    res.status(500).json({ success: false, message: 'Failed to get FAQ response' });
  }
});
