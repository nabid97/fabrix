import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // MongoDB configuration
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/fabrix',
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your_default_jwt_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // AWS configuration
  aws: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3Bucket: process.env.AWS_S3_BUCKET || 'fabrix-uploads',
  },
  
  // Stripe configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  
  // Google AI (for Gemini API)
  googleAI: {
    apiKey: process.env.GOOGLE_AI_API_KEY || '',
  },
  
  // Stability AI (for logo generation)
  stabilityAI: {
    apiKey: process.env.STABILITY_AI_API_KEY || '',
  },
  
  // CORS configuration
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000'],
  
  // Email configuration
  email: {
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'info@fabrix.com',
  },
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;