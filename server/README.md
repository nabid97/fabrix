# FabriX Backend API

This is the Express backend API for the FabriX e-commerce platform.

## Overview

The FabriX backend is built with Node.js, Express, TypeScript, and MongoDB. It handles user authentication, product management, orders, payments, and integration with third-party services like Stripe, AWS, and AI providers.

## Structure

- `src/config/`: Configuration settings
- `src/controllers/`: Request handlers for each route
- `src/data/`: Seed data for database initialization
- `src/middleware/`: Express middleware functions
- `src/models/`: Mongoose schema definitions
- `src/routes/`: API route definitions
- `src/services/`: Service modules for external integrations
  - `ai/`: AI-related services (Stability AI, Gemini)
  - `aws/`: AWS service integrations (S3)
  - `email/`: Email sending functionality
  - `payment/`: Payment processing (Stripe)
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions

## API Endpoints

### Authentication
- `POST /api/users`: Register a new user
- `POST /api/users/login`: Login user
- `POST /api/users/logout`: Logout user
- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile

### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get product by ID
- `GET /api/products/clothing`: Get clothing products
- `GET /api/products/fabric`: Get fabric products
- `POST /api/products/clothing`: Create clothing product (admin)
- `POST /api/products/fabric`: Create fabric product (admin)

### Orders
- `POST /api/orders`: Create new order
- `GET /api/orders`: Get all orders
- `GET /api/orders/:id`: Get order by ID
- `GET /api/orders/myorders`: Get user's orders
- `PUT /api/orders/:id/pay`: Update order to paid status
- `PUT /api/orders/:id/status`: Update order status (admin)

### Payments
- `POST /api/payments/create-payment-intent`: Create Stripe payment intent
- `POST /api/payments/webhook`: Handle Stripe webhook events

### Logo Generation
- `POST /api/logo/generate`: Generate logo with AI
- `POST /api/logo/upload`: Upload custom logo
- `GET /api/logo/:id`: Get logo by ID

### Chat
- `POST /api/chat/gemini`: Generate AI response
- `GET /api/chat/faq`: Get FAQ response

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB installed locally or access to MongoDB Atlas

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fabrix
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# AWS Credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your-bucket-name

# Stripe API Keys
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# AI API Keys
STABILITY_AI_API_KEY=your_stability_ai_key
GOOGLE_AI_API_KEY=your_gemini_ai_key

# Email Config
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@fabrix.com
```

3. Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm start`: Start the server in production mode
- `npm run dev`: Start the server in development mode with hot reload
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run seed`: Seed the database with sample data
- `npm run seed:destroy`: Remove all data from the database

## Dependencies

- **Express**: Web framework
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **AWS SDK**: AWS services integration
- **Stripe**: Payment processing
- **Google Generative AI**: Gemini AI integration
- **nodemailer**: Email sending
- **multer**: File uploads handling

## Database Models

- **User**: Authentication and user data
- **Product**: Base product schema with discriminators for:
  - **ClothingProduct**: Clothing-specific properties
  - **FabricProduct**: Fabric-specific properties
- **Order**: Order details and tracking