import { Request } from 'express';
import mongoose from 'mongoose';
import { IUser } from '../models/User';

/**
 * Extended Express Request with authenticated user
 */
export interface AuthRequest extends Request {
  user?: IUser & { _id: mongoose.Types.ObjectId };
}