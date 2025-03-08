import express from 'express';
import { generateChatResponse, getFAQResponse } from '../controllers/chatController';

const router = express.Router();

// Routes
router.post('/gemini', generateChatResponse);
router.get('/faq', getFAQResponse);

export default router;