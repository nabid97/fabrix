import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler';
import User from '../models/User';
import { ApiError } from '../utils/ApiError';
import { AuthRequest } from '../types/express';
import config from '../config';
import mongoose from 'mongoose';
import { IUser } from '../models/User';

// Protect routes
export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // Get token from cookies
  token = req.cookies.jwt;

  if (!token) {
    // Check if token is in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized, no token');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };

    // Get user from the token
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      throw new ApiError(401, 'Not authorized, user not found');
    }

    // Add user to request
    req.user = user as unknown as IUser & { _id: mongoose.Types.ObjectId };
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw new ApiError(401, 'Not authorized, token failed');
  }
});

// Admin middleware
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    throw new ApiError(403, 'Not authorized as an admin');
  }
};