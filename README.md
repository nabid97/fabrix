# FabriX - E-Commerce Platform for Fabric and Clothing

FabriX is a modern e-commerce platform specializing in fabrics and customizable clothing for businesses. This application provides a comprehensive solution for ordering fabrics, designing custom clothing with logo integration, and managing the entire ordering process.

## Features

- **Fabric Catalog**: Browse and order high-quality fabrics with detailed specifications
- **Custom Clothing**: Order customized clothing with logo placement options
- **Logo Generator**: AI-powered logo creation using Stability AI
- **AI Assistant**: Intelligent chatbot using Gemini AI for customer support
- **Secure Authentication**: User registration and login via AWS Cognito
- **Secure Payments**: Integrated with Stripe for payment processing
- **ERP Integration**: Order management via Odoo Sales API
- **Responsive Design**: Optimized for all devices with a modern UI

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- Stripe.js for payments
- AWS Amplify for authentication

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- AWS SDK for S3, Cognito
- Stripe API
- Stability AI API
- Gemini AI API
- Odoo API integration

### Infrastructure
- AWS EKS for container orchestration
- Docker for containerization
- AWS S3 for static content and uploads
- AWS CloudFront for content delivery
- AWS Cognito for authentication
- MongoDB Atlas for database
- Terraform for Infrastructure as Code
- Helm for Kubernetes deployments
- GitHub Actions for CI/CD
- Grafana and Prometheus for monitoring

## Project Structure

```
fabrix/
├── client/                      # Frontend React application
├── server/                      # Backend Node.js application
├── infrastructure/              # Infrastructure as Code
│   ├── terraform/               # Terraform IaC for AWS resources
│   └── kubernetes/              # Kubernetes configurations
│       └── helm/                # Helm charts
├── .github/
│   └── workflows/               # GitHub Actions CI/CD workflows
└── docs/                        # Documentation
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Docker and Docker Compose
- AWS CLI
- Terraform >= 1.0.0
- kubectl
- Helm

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fabrix.git
   cd fabrix
   ```

2. Set up environment variables:
   ```bash
   # Copy example environment files
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   
   # Edit the environment files with your values
   ```

3. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

4. Start development servers:
   ```bash
   # Start frontend development server
   cd client
   npm start
   
   # Start backend development server
   cd ../server
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Docker Development

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Deployment

### Deploying Infrastructure with Terraform

1. Initialize Terraform:
   ```bash
   cd infrastructure/terraform
   terraform init
   ```

2. Plan the deployment:
   ```bash
   terraform plan -out=tfplan
   ```

3. Apply the changes:
   ```bash
   terraform apply tfplan
   ```

### CI/CD Pipeline

The project uses GitHub Actions for CI/CD. The workflow includes:

1. Linting and testing for frontend and backend
2. Security scanning
3. Building and pushing Docker images to ECR
4. Deploying frontend to S3/CloudFront
5. Deploying backend to EKS using Helm

## API Documentation

API documentation is available at `/api/docs` endpoint when running the application.

## Monitoring and Logging

- Grafana dashboards are available at `https://grafana.yourdomain.com`
- Prometheus metrics are collected and stored for analysis
- Logs are centralized in AWS CloudWatch

## Security Features

- JWT-based authentication with AWS Cognito
- HTTPS encryption
- Input validation and sanitization
- Rate limiting
- OWASP security best practices
- Regular dependency updates
- DevSecOps integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
