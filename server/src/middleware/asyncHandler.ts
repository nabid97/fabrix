import { Request, Response, NextFunction } from 'express';

/**
 * Async handler to catch any errors in async express routes
 * Eliminates the need for try/catch blocks in controller functions
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};