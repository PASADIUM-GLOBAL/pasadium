import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pasadium-super-secret-key';

export interface AuthRequest extends Request {
  user?: {
    sub: string;
    username: string;
    roles: string[];
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = {
      sub: decoded.sub,
      username: decoded.username,
      roles: decoded.roles,
    };
    next();
  } catch (err) {
    res.status(401).json({ error: 'invalid_token' });
  }
}

export function roleMiddleware(requiredRole: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles.includes(requiredRole)) {
      return res.status(403).json({ error: 'forbidden', message: 'Insufficient permissions' });
    }
    next();
  };
}
