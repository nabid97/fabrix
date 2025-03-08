provider "aws" {
  region = var.aws_region
}

# Variables
variable "aws_region" {
  description = "AWS region to deploy to"
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  default     = "dev"
}

variable "project_name" {
  description = "Project name"
  default     = "fabrix"
}

locals {
  prefix = "${var.project_name}-${var.environment}"
  common_tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# S3 bucket for frontend static content
resource "aws_s3_bucket" "frontend" {
  bucket = "${local.prefix}-frontend"
  tags   = local.common_tags
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.frontend.arn}/*"
      }
    ]
  })
  depends_on = [aws_s3_bucket_public_access_block.frontend]
}

# S3 bucket for user uploads (logos, etc.)
resource "aws_s3_bucket" "uploads" {
  bucket = "${local.prefix}-uploads"
  tags   = local.common_tags
}

resource "aws_s3_bucket_public_access_block" "uploads" {
  bucket = aws_s3_bucket.uploads.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 bucket for logs
resource "aws_s3_bucket" "logs" {
  bucket = "${local.prefix}-logs"
  tags   = local.common_tags
}

# CloudFront distribution for the frontend
resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.frontend.website_endpoint
    origin_id   = "S3-${aws_s3_bucket.frontend.bucket}"
    
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = aws_s3_bucket.logs.bucket_domain_name
    prefix          = "cloudfront/"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior for index.html
  ordered_cache_behavior {
    path_pattern     = "index.html"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  # Cache behavior for service-worker.js
  ordered_cache_behavior {
    path_pattern     = "service-worker.js"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.frontend.bucket}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  # Handle React Router
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = local.common_tags
}

# VPC configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-vpc"
  })
}

# Subnets
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-public-a"
  })
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-public-b"
  })
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.aws_region}a"

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-private-a"
  })
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${var.aws_region}b"

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-private-b"
  })
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-igw"
  })
}

# Route Table for Public Subnets
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-public-rt"
  })
}

# Route Table Associations for Public Subnets
resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# NAT Gateway for Private Subnets
resource "aws_eip" "nat" {
  domain = "vpc"
  tags = merge(local.common_tags, {
    Name = "${local.prefix}-nat-eip"
  })
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_a.id

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-nat"
  })
}

# Route Table for Private Subnets
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = merge(local.common_tags, {
    Name = "${local.prefix}-private-rt"
  })
}

# Route Table Associations for Private Subnets
resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private.id
}

# EKS Cluster
module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 19.0"
  cluster_name    = "${local.prefix}-cluster"
  cluster_version = "1.28"

  vpc_id                   = aws_vpc.main.id
  subnet_ids               = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  control_plane_subnet_ids = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  cluster_endpoint_public_access = true

  eks_managed_node_group_defaults = {
    disk_size      = 50
    instance_types = ["t3.medium"]
    
    # Use the latest Amazon Linux 2 AMI
    ami_type = "AL2_x86_64"
    
    # Configure the node groups to use the provided IAM role
    iam_role_additional_policies = {
      AmazonECR-FullAccess = "arn:aws:iam::aws:policy/AmazonECR-FullAccess"
    }
  }

  eks_managed_node_groups = {
    app = {
      min_size     = 2
      max_size     = 5
      desired_size = 2

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"

      labels = {
        Environment = var.environment
        Application = "fabrix"
      }

      tags = local.common_tags
    }
  }

  tags = local.common_tags
}

# MongoDB Atlas (through MongoDB Atlas provider)
# Note: In a real infrastructure, you would use the MongoDB Atlas provider
# For this example, we'll use a placeholder comment

# terraform {
#   required_providers {
#     mongodbatlas = {
#       source = "mongodb/mongodbatlas"
#       version = "~> 1.0"
#     }
#   }
# }

# provider "mongodbatlas" {
#   public_key = var.mongodb_atlas_public_key
#   private_key = var.mongodb_atlas_private_key
# }

# resource "mongodbatlas_cluster" "fabrix_db" {
#   project_id                  = var.mongodb_atlas_project_id
#   name                        = "${local.prefix}-cluster"
#   cloud_backup                = true
#   auto_scaling_disk_gb_enabled = true
#   mongo_db_major_version      = "6.0"
#   
#   provider_name               = "AWS"
#   provider_region_name        = var.aws_region
#   provider_instance_size_name = "M10"
#   
#   tags {
#     key   = "Environment"
#     value = var.environment
#   }
# }

# AWS Cognito for authentication
resource "aws_cognito_user_pool" "main" {
  name = "${local.prefix}-user-pool"
  
  # Email verification and recovery
  auto_verify_attributes = ["email"]
  
  # Password policy
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
  
  # User attributes
  schema {
    name                     = "name"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      min_length = 1
      max_length = 256
    }
  }
  
  schema {
    name                     = "email"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      min_length = 5
      max_length = 256
    }
  }
  
  # MFA configuration
  mfa_configuration = "OPTIONAL"
  
  # Email configuration
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }
  
  # Username requirements
  username_attributes = ["email"]
  
  # Verification messages
  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Your FabriX verification code"
    email_message        = "Your verification code is {####}. This code will expire in 24 hours."
  }
  
  # Account recovery settings
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
  
  tags = local.common_tags
}

resource "aws_cognito_user_pool_client" "web" {
  name                = "${local.prefix}-web-client"
  user_pool_id        = aws_cognito_user_pool.main.id
  
  # Don't generate a client secret for web apps
  generate_secret     = false
  
  # Token validity
  refresh_token_validity = 30
  access_token_validity  = 1
  id_token_validity      = 1
  
  token_validity_units {
    refresh_token = "days"
    access_token  = "hours"
    id_token      = "hours"
  }
  
  # Auth flows
  explicit_auth_flows = [
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_PASSWORD_AUTH"
  ]
  
  # Prevent user existence errors
  prevent_user_existence_errors = "ENABLED"
  
  # Allowed OAuth flows
  allowed_oauth_flows = ["implicit", "code"]
  
  # Callback and logout URLs
  callback_urls = [
    "http://localhost:3000/",
    "https://${aws_cloudfront_distribution.frontend.domain_name}/"
  ]
  
  logout_urls = [
    "http://localhost:3000/",
    "https://${aws_cloudfront_distribution.frontend.domain_name}/"
  ]
  
  # OAuth scopes
  allowed_oauth_scopes = [
    "email",
    "openid",
    "profile"
  ]
  
  # Supported identity providers
  supported_identity_providers = ["COGNITO"]
}

# AWS Secrets Manager for API keys
resource "aws_secretsmanager_secret" "api_keys" {
  name = "${local.prefix}-api-keys"
  description = "API keys for external services"
  
  tags = local.common_tags
}

resource "aws_secretsmanager_secret_version" "api_keys" {
  secret_id = aws_secretsmanager_secret.api_keys.id
  
  # In a real environment, you would use variables or external sources
  # for these sensitive values, not hardcode them in the Terraform code
  secret_string = jsonencode({
    STRIPE_SECRET_KEY = "sk_test_placeholder",
    STRIPE_PUBLISHABLE_KEY = "pk_test_placeholder",
    STABILITY_AI_API_KEY = "stability-ai-placeholder",
    GEMINI_API_KEY = "gemini-api-placeholder",
    ODOO_API_KEY = "odoo-api-placeholder"
  })
}

# Monitoring and Logging with Grafana and Prometheus
resource "aws_security_group" "monitoring" {
  name        = "${local.prefix}-monitoring-sg"
  description = "Security group for monitoring services"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
    description = "Prometheus"
  }
  
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
    description = "Grafana"
  }
  
  ingress {
    from_port   = 9093
    to_port     = 9093
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
    description = "Alertmanager"
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }
  
  tags = merge(local.common_tags, {
    Name = "${local.prefix}-monitoring-sg"
  })
}

# Outputs
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "eks_cluster_endpoint" {
  description = "Endpoint for EKS cluster"
  value       = module.eks.cluster_endpoint
}

output "eks_cluster_name" {
  description = "Name of the EKS cluster"
  value       = module.eks.cluster_name
}

output "cognito_user_pool_id" {
  description = "ID of the Cognito User Pool"
  value       = aws_cognito_user_pool.main.id
}

output "cognito_user_pool_client_id" {
  description = "ID of the Cognito User Pool Client"
  value       = aws_cognito_user_pool_client.web.id
}

output "cloudfront_distribution_domain" {
  description = "Domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.frontend.domain_name
}

output "frontend_bucket_name" {
  description = "Name of the S3 bucket for the frontend"
  value       = aws_s3_bucket.frontend.bucket
}

output "uploads_bucket_name" {
  description = "Name of the S3 bucket for uploads"
  value       = aws_s3_bucket.uploads.bucket
}

output "logs_bucket_name" {
  description = "Name of the S3 bucket for logs"
  value       = aws_s3_bucket.logs.bucket
}