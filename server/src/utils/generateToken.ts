import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Response } from 'express';
import { Types } from 'mongoose';
import config from '../config';

/**
 * Generate JWT token and set it as a cookie
 * @param res - Express response object
 * @param userId - User ID to encode in the token
 */
export const generateToken = (res: Response, userId: Types.ObjectId) => {
  // Create token with user ID
  const token = jwt.sign(
    { id: userId.toString() },
    config.jwtSecret as string,
    { expiresIn: config.jwtExpiresIn } as SignOptions
  );

  // Set token as HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};