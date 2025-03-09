# FabriX - Custom Clothing and Fabric E-Commerce Platform

FabriX is a comprehensive e-commerce platform specializing in custom clothing and premium fabrics for businesses. The application features a modern, responsive UI with features for product browsing, customization, logo generation, and ordering.

## 🌟 Features

- **Product Catalog**: Browse and filter clothing items and fabrics
- **User Authentication**: Secure login/registration with JWT and AWS Amplify
- **Shopping Cart**: Persistent cart with local storage
- **Customization Options**: Detailed product customization for clothing and fabrics
- **Logo Generator**: AI-powered logo generation for custom branding
- **Chatbot Support**: AI assistant for customer inquiries
- **Order Management**: Complete order processing with status tracking
- **Payment Processing**: Secure checkout with Stripe integration
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS

## 🚀 Technology Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Context API for state management
- AWS Amplify for authentication
- Lucide React for icons
- Axios for API requests
- Stripe.js for payments

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT for authentication
- Stripe API for payment processing
- Google Gemini for AI chatbot
- Stability AI for logo generation
- AWS S3 for file storage
- Nodemailer for email notifications

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB
- AWS account with S3 bucket
- Stripe account for payments
- Google AI API key (for Gemini)
- Stability AI API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fabrix.git
   cd fabrix
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment variables**
   - Copy `.env.example` to `.env` in the server directory
   - Update with your configuration
   ```bash
   cp server/.env.example server/.env
   ```

4. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

5. **Start development servers**
   ```bash
   cd ..
   npm run dev
   ```

## 🌐 Usage

After starting the development servers:
- Frontend runs on: http://localhost:3000
- Backend API runs on: http://localhost:5000

### Default Users

- Admin User:
  - Email: admin@fabrix.com
  - Password: password123

- Customer:
  - Email: john@example.com
  - Password: password123

## 📁 Project Structure

```
fabrix/
├── client/                      # Frontend React application
│   ├── public/                  # Static files
│   └── src/
│       ├── api/                 # API integration
│       ├── components/          # Reusable components
│       ├── contexts/            # React contexts
│       ├── hooks/               # Custom React hooks
│       ├── pages/               # Page components
│       ├── styles/              # CSS and styling
│       ├── types/               # TypeScript definitions
│       └── utils/               # Utility functions
│
├── server/                      # Backend Node.js application
│   ├── src/
│       ├── config/              # Configuration
│       ├── controllers/         # Request handlers
│       ├── data/                # Sample data for seeding
│       ├── middleware/          # Express middleware
│       ├── models/              # MongoDB schemas
│       ├── routes/              # API routes
│       ├── services/            # Business logic
│       └── utils/               # Helper functions
│
└── infrastructure/              # Deployment & infrastructure
    ├── docker/                  # Docker configuration
    ├── kubernetes/              # Kubernetes manifests
    └── terraform/               # Terraform IaC
```

## 📄 API Documentation

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `GET /api/products/clothing` - Get clothing products
- `GET /api/products/fabric` - Get fabric products

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/pay` - Update order to paid

### Logo Generation
- `POST /api/logo/generate` - Generate logo
- `POST /api/logo/upload` - Upload custom logo

### Chatbot
- `POST /api/chat/gemini` - Get AI chat response
- `GET /api/chat/faq` - Get quick FAQ response

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## 🚢 Deployment

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Kubernetes
```bash
# Deploy to Kubernetes
kubectl apply -f infrastructure/kubernetes/manifests/
```

## 🔄 CI/CD

This project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci-cd.yaml`.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- Project Link: [https://github.com/nabid97/fabrix](https://github.com/nabid97/fabrix)