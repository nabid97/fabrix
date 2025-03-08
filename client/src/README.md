# FabriX Frontend

This is the React frontend for the FabriX e-commerce platform.

## Overview

The FabriX frontend is built with React, TypeScript, and Tailwind CSS. It provides a responsive and intuitive user interface for browsing and ordering custom clothing and premium fabrics, generating logos, and managing orders.

## Structure

- `src/api/`: API client functions for communicating with the backend
- `src/components/`: Reusable UI components
  - `common/`: Shared components used across multiple pages
  - `layout/`: Layout components like Header and Footer
- `src/config/`: Configuration files and constants
- `src/contexts/`: React context providers for state management
- `src/hooks/`: Custom React hooks
- `src/pages/`: Page components for each route
- `src/styles/`: Global CSS styles
- `src/utils/`: Utility functions
- `src/types/`: TypeScript type definitions

## Key Features

1. **User Authentication**: Registration, login, and profile management
2. **Product Browsing**: Browse and filter clothing and fabric products
3. **Customization**: Customize clothing with logos and specific requirements
4. **Logo Generation**: AI-powered logo creation tool
5. **Shopping Cart**: Add items, adjust quantities, and checkout
6. **Order Management**: View and track orders
7. **FAQs and Support**: Information pages and chatbot assistance

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_AWS_REGION=us-east-1
REACT_APP_AWS_USER_POOL_ID=your_cognito_user_pool_id
REACT_APP_AWS_USER_POOL_WEB_CLIENT_ID=your_cognito_client_id
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

3. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start`: Start the development server
- `npm build`: Build the production-ready application
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Dependencies

- **React**: UI library
- **React Router**: Routing
- **AWS Amplify**: Authentication
- **Axios**: API requests
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Recharts**: Data visualization
- **Stripe.js**: Payment processing
- **Zod**: Form validation
- **Framer Motion**: Animations

## Browser Support

The application is optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)