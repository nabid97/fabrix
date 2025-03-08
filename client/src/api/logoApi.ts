import axios from 'axios';

// Logo generation request payload
interface LogoGenerationRequest {
  companyName: string;
  industry?: string;
  slogan?: string;
  style: string;
  colors: string[];
  size: 'small' | 'medium' | 'large';
}

/**
 * Generate a logo using Stability AI API
 * 
 * @param params Logo generation parameters
 * @returns URL of the generated logo image
 */
export const generateLogo = async (params: LogoGenerationRequest): Promise<string> => {
  try {
    // Construct the prompt for the AI
    const prompt = constructLogoPrompt(params);
    
    // Call the API to generate the logo (via our backend proxy)
    const response = await axios.post('/api/logo/generate', {
      prompt,
      style: params.style,
      colorScheme: params.colors,
      size: params.size,
    });
    
    // Return the URL of the generated logo
    return response.data.logoUrl;
  } catch (error) {
    console.error('Error generating logo:', error);
    throw new Error('Failed to generate logo. Please try again.');
  }
};

/**
 * Construct a detailed prompt for the logo generation
 * 
 * @param params Logo generation parameters
 * @returns Formatted prompt string
 */
const constructLogoPrompt = (params: LogoGenerationRequest): string => {
  const { companyName, industry, slogan, style } = params;
  
  // Start with the company name
  let prompt = `Create a professional logo for "${companyName}"`;
  
  // Add industry context if provided
  if (industry) {
    prompt += ` in the ${industry} industry`;
  }
  
  // Add style specifications
  prompt += `, in a ${style} style`;
  
  // Add slogan if provided
  if (slogan) {
    prompt += `, featuring the slogan "${slogan}"`;
  }
  
  // Style-specific details
  switch (style.toLowerCase()) {
    case 'minimalist':
      prompt += `. The logo should be clean, simple, and use minimal elements with plenty of white space.`;
      break;
    case 'vintage':
      prompt += `. The logo should have a retro feel with textures, badges, or ribbon elements that evoke nostalgia.`;
      break;
    case 'modern':
      prompt += `. The logo should look contemporary with sleek shapes, possibly using gradient colors and geometric forms.`;
      break;
    case 'abstract':
      prompt += `. The logo should use non-literal shapes and forms that convey the essence of the brand without obvious imagery.`;
      break;
    case 'geometric':
      prompt += `. The logo should be composed of precise geometric shapes that form a balanced and harmonious design.`;
      break;
    case 'handdrawn':
      prompt += `. The logo should have an organic, hand-drawn aesthetic with flowing lines that feels personal and artisanal.`;
      break;
    default:
      prompt += `. The logo should be professional and reflect the brand's identity.`;
  }
  
  // Additional specifications
  prompt += ` The logo should work well on both light and dark backgrounds, be scalable without losing detail, and be memorable and distinctive.`;
  
  return prompt;
};

/**
 * Upload a custom logo to the server
 * 
 * @param file Logo file to upload
 * @returns URL of the uploaded logo
 */
export const uploadLogo = async (file: File): Promise<string> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('logo', file);
    
    // Upload the file
    const response = await axios.post('/api/logo/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Return the URL of the uploaded logo
    return response.data.logoUrl;
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw new Error('Failed to upload logo. Please try again.');
  }
};