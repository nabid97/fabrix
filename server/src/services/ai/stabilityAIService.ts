import axios from 'axios';
import config from '../../config';

// Stability AI API base URL
const STABILITY_API_BASE_URL = 'https://api.stability.ai/v1';

/**
 * Generate logo using Stability AI API
 * @param prompt - Text description of the logo
 * @param style - Logo style (minimalist, vintage, modern, etc.)
 * @param colorScheme - Array of color hex values
 * @param size - Size of the logo (small, medium, large)
 * @returns Buffer containing the generated image
 */
export const generateStabilityAILogo = async (
  prompt: string,
  style: string = 'minimalist',
  colorScheme: string[] = ['#000000', '#FFFFFF'],
  size: string = 'medium'
): Promise<Buffer> => {
  try {
    // Determine dimensions based on size
    const dimensions = getLogoDimensions(size);
    
    // Enhance the prompt with style and color information
    const enhancedPrompt = enhancePrompt(prompt, style, colorScheme);
    
    // Configure API request
    const response = await axios.post(
      `${STABILITY_API_BASE_URL}/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        text_prompts: [
          {
            text: enhancedPrompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: dimensions.height,
        width: dimensions.width,
        samples: 1,
        steps: 30,
        style_preset: style === 'minimalist' ? 'minimalist' : 
                      style === 'vintage' ? 'vintage' : 
                      style === 'hand-drawn' ? 'comic-book' : 'digital-art'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${config.stabilityAI.apiKey}`
        }
      }
    );

    // Extract image data
    if (response.data && response.data.artifacts && response.data.artifacts.length > 0) {
      const base64Image = response.data.artifacts[0].base64;
      return Buffer.from(base64Image, 'base64');
    } else {
      throw new Error('No image generated');
    }
  } catch (error) {
    console.error('Stability AI generation error:', error);
    throw new Error('Failed to generate logo with Stability AI');
  }
};

/**
 * Enhance the prompt with style and color information
 * @param basePrompt - Original prompt
 * @param style - Logo style
 * @param colorScheme - Array of color hex values
 * @returns Enhanced prompt
 */
const enhancePrompt = (
  basePrompt: string,
  style: string,
  colorScheme: string[]
): string => {
  // Convert hex colors to readable format for the prompt
  const colorDescription = colorScheme.length <= 2 
    ? `using colors ${colorScheme.join(' and ')}` 
    : `using a color palette of ${colorScheme.join(', ')}`;
  
  // Style-specific prompt enhancements
  let stylePrompt = '';
  switch (style.toLowerCase()) {
    case 'minimalist':
      stylePrompt = 'minimalist, clean, simple, elegant design with lots of whitespace';
      break;
    case 'vintage':
      stylePrompt = 'vintage, retro, distressed texture, classic feel';
      break;
    case 'modern':
      stylePrompt = 'modern, sleek, contemporary design with clean lines';
      break;
    case 'abstract':
      stylePrompt = 'abstract, conceptual, non-literal representation';
      break;
    case 'geometric':
      stylePrompt = 'geometric shapes, precise lines, balanced composition';
      break;
    case 'hand-drawn':
      stylePrompt = 'hand-drawn, sketch-like, organic lines, artisanal feel';
      break;
    default:
      stylePrompt = 'professional, balanced design';
  }
  
  // Combine everything into an enhanced prompt
  return `Professional logo design for "${basePrompt}". ${stylePrompt}, ${colorDescription}. 
          The logo should be isolated on a transparent background, work well at different sizes,
          and be recognizable. No text or lettering in the logo.`;
};

/**
 * Get logo dimensions based on requested size
 * @param size - Size string (small, medium, large)
 * @returns Width and height values
 */
const getLogoDimensions = (size: string): { width: number; height: number } => {
  switch (size.toLowerCase()) {
    case 'small':
      return { width: 512, height: 512 };
    case 'medium':
      return { width: 768, height: 768 };
    case 'large':
      return { width: 1024, height: 1024 };
    default:
      return { width: 768, height: 768 }; // Default to medium
  }
};