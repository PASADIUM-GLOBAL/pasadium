import { Response } from 'express';

export interface ApiError {
  code: string;
  message: string;
  requestId?: string;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    public message: string
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: any, req: any, res: Response, next: any) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';
  const requestId = req.headers['x-request-id'];

  res.status(statusCode).json({
    error: {
      code,
      message,
      requestId,
    },
  });
}
