import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { ApiError } from '../utils/ApiError';
import config from '../config';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { uploadToS3 } from '../services/aws/s3Service';
import { generateStabilityAILogo } from '../services/ai/stabilityAIService';

// @desc    Generate logo using Stability AI
// @route   POST /api/logo/generate
// @access  Public
export const generateLogo = asyncHandler(async (req: Request, res: Response) => {
  const { prompt, style, colorScheme, size } = req.body;

  if (!prompt) {
    throw new ApiError(400, 'Prompt is required');
  }

  try {
    // Generate logo using Stability AI API
    const logoData = await generateStabilityAILogo(prompt, style, colorScheme, size);
    
    // Upload logo to S3
    const fileName = `logo-${uuidv4()}.png`;
    const logoUrl = await uploadToS3(logoData, fileName, 'logos');
    
    res.json({
      success: true,
      logoUrl
    });
  } catch (error) {
    console.error('Logo generation error:', error);
    throw new ApiError(500, 'Logo generation failed');
  }
});

// @desc    Upload custom logo
// @route   POST /api/logo/upload
// @access  Public
export const uploadLogo = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, 'No logo file uploaded');
  }

  try {
    const file = req.file;
    const fileName = `logo-${uuidv4()}${path.extname(file.originalname)}`;
    
    // Read file buffer
    const fileData = fs.readFileSync(file.path);
    
    // Upload to S3
    const logoUrl = await uploadToS3(fileData, fileName, 'logos');
    
    // Delete temporary file
    fs.unlinkSync(file.path);
    
    res.json({
      success: true,
      logoUrl
    });
  } catch (error) {
    console.error('Logo upload error:', error);
    throw new ApiError(500, 'Logo upload failed');
  }
});

// @desc    Get logo by ID
// @route   GET /api/logo/:id
// @access  Public
export const getLogoById = asyncHandler(async (req: Request, res: Response) => {
  const logoId = req.params.id;
  
  if (!logoId) {
    throw new ApiError(400, 'Logo ID is required');
  }
  
  try {
    // Construct the S3 URL for the logo
    const logoUrl = `https://${config.aws.s3Bucket}.s3.${config.aws.region}.amazonaws.com/logos/${logoId}`;
    
    res.json({
      success: true,
      logoUrl
    });
  } catch (error) {
    console.error('Get logo error:', error);
    throw new ApiError(500, 'Failed to retrieve logo');
  }
});
