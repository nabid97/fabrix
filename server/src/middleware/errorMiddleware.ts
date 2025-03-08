import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

/**
 * Custom error handling middleware
 */
const errorMiddleware = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error: ', err);

  // Default error values
  let statusCode = 500;
  let message = 'Server Error';
  let errors: any[] = [];

  // Check if error is an instance of ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err.name === 'ValidationError') {
    // Handle Mongoose validation errors
    statusCode = 400;
    message = 'Validation Error';
    const validationErrors = (err as any).errors;
    
    // Extract validation error messages
    if (validationErrors) {
      Object.values(validationErrors).forEach((error: any) => {
        errors.push({
          field: error.path,
          message: error.message
        });
      });
    }
  } else if (err.name === 'CastError') {
    // Handle Mongoose cast errors (e.g., invalid ObjectId)
    statusCode = 400;
    message = `Invalid ${(err as any).path}: ${(err as any).value}`;
  } else if (err.name === 'MongoError' && (err as any).code === 11000) {
    // Handle MongoDB duplicate key errors
    statusCode = 400;
    message = 'Duplicate key error';
    const field = Object.keys((err as any).keyValue)[0];
    errors.push({
      field,
      message: `${field} already exists`
    });
  } else if (err.name === 'JsonWebTokenError') {
    // Handle JWT errors
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    // Handle JWT expiration
    statusCode = 401;
    message = 'Token expired';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errors.length > 0 ? errors : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorMiddleware;