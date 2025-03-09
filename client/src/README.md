# FabriX Client

React frontend for the FabriX e-commerce platform, focused on custom fabrics and clothing.

## Features

- Responsive design with Tailwind CSS
- Context API for state management
- React Router for navigation
- Form validation
- Authentication with AWS Amplify
- Payment integration with Stripe
- Chatbot functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on the `.env.example` template and fill in your environment variables.

### Running the Client

#### Development mode:

```bash
npm start
```

This will start the development server at http://localhost:3000.

#### Production build:

```bash
npm run build
```

## Project Structure

- `src/api/`: API service functions
- `src/components/`: Reusable UI components
- `src/config/`: Configuration files
- `src/contexts/`: React Context providers
- `src/hooks/`: Custom React hooks
- `src/pages/`: Page components
- `src/styles/`: CSS and style files
- `src/types/`: TypeScript type definitions
- `src/utils/`: Utility functions

## Key Pages

- Homepage: `/`
- Clothing products: `/clothing`
- Fabric products: `/fabrics`
- Product details: `/clothing/:productSlug` or `/fabrics/:fabricSlug`
- Logo generator: `/logo-generator`
- Cart: `/cart`
- Checkout: `/checkout`
- Order confirmation: `/order-confirmation/:orderId`
- Contact: `/contact`
- FAQ: `/faq`
- Login/Register: `/login`, `/register`

## Authentication

Authentication is handled via AWS Amplify Cognito integration. The `AuthContext` provides authentication state and methods throughout the app.

## State Management

The app uses React Context API for state management:

- `AuthContext`: User authentication
- `CartContext`: Shopping cart state
- `ChatbotContext`: Chatbot functionality

## Testing

Run tests with:

```bash
npm test
```

## Styling

The project uses Tailwind CSS for styling, with a custom theme defined in `tailwind.config.js`.

## License

ISC