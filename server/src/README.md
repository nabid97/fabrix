# FabriX Server

Backend API for the FabriX e-commerce platform, built with Node.js, Express, and MongoDB.

## Features

- RESTful API design
- Authentication with JWT
- MongoDB integration with Mongoose ODM
- File uploads to AWS S3
- Payment processing with Stripe
- AI integrations (Google's Gemini, Stability AI)
- Email notifications

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on the `.env.example` template and fill in your environment variables.

3. Seed the database (optional):

```bash
npm run seed
```

### Running the Server

#### Development mode with hot-reload:

```bash
npm run dev
```

#### Production mode:

```bash
npm run build
npm start
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/clothing` - Get clothing products
- `GET /api/products/fabric` - Get fabric products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products/clothing` - Create new clothing product (Admin)
- `POST /api/products/fabric` - Create new fabric product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users

- `POST /api/users` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/address/:addressId` - Delete user address
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `GET /api/orders/number/:orderNumber` - Get order by order number
- `PUT /api/orders/:id/cancel` - Cancel order

### Payments

- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/webhook` - Handle Stripe webhook events

### Logo

- `POST /api/logo/generate` - Generate logo using AI
- `POST /api/logo/upload` - Upload custom logo
- `GET /api/logo/:id` - Get logo by ID

### Chat

- `POST /api/chat/gemini` - Generate chat response using Gemini
- `GET /api/chat/faq` - Get quick FAQ response

## Architecture

The server follows a structured architecture:

- `controllers/`: Request handlers for each route
- `models/`: Mongoose schemas and models
- `routes/`: API route definitions
- `middleware/`: Custom middleware functions
- `services/`: External service integrations
- `utils/`: Utility functions
- `config/`: Configuration settings

## Testing

Run tests with:

```bash
npm test
```

## License

ISC