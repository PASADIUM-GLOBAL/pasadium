import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { writeSecurityLog } from '../services/security-log';
import { AuthenticatedRequest } from '../types';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return secret;
}

async function auditAuthFailure(
  req: Request,
  res: Response,
  event: string,
  severity: 'Medium' | 'High',
) {
  await writeSecurityLog({
    event,
    severity,
    status: 'Blocked',
    requestId: res.locals.requestId,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    await auditAuthFailure(
      req,
      res,
      'Authentication failed: missing bearer token',
      'Medium',
    );

    return res.status(401).json({
      error: 'Authentication required',
    });
  }

  const token = authorization.slice('Bearer '.length).trim();

  if (!token) {
    await auditAuthFailure(
      req,
      res,
      'Authentication failed: empty bearer token',
      'Medium',
    );

    return res.status(401).json({
      error: 'Authentication required',
    });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (
      typeof decoded !== 'object' ||
      decoded === null ||
      typeof decoded.sub !== 'string' ||
      typeof decoded.username !== 'string' ||
      typeof decoded.roles !== 'string'
    ) {
      await auditAuthFailure(
        req,
        res,
        'Authentication failed: invalid token claims',
        'High',
      );

      return res.status(401).json({
        error: 'Invalid token',
      });
    }

    req.user = {
      sub: decoded.sub,
      username: decoded.username,
      roles: decoded.roles,
    };

    return next();
  } catch {
    await auditAuthFailure(
      req,
      res,
      'Authentication failed: invalid or expired token',
      'High',
    );

    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
}

export function roleMiddleware(requiredRole: string) {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      await writeSecurityLog({
        event: `Authorization failed: authentication required for ${requiredRole}`,
        severity: 'Medium',
        status: 'Blocked',
        requestId: res.locals.requestId,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      return res.status(401).json({
        error: 'Authentication required',
      });
    }

    const roles = req.user.roles
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean);

    if (!roles.includes(requiredRole)) {
      await writeSecurityLog({
        event: `Authorization denied: required ${requiredRole}`,
        userId: req.user.sub,
        severity: 'High',
        status: 'Blocked',
        requestId: res.locals.requestId,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      return res.status(403).json({
        error: 'Forbidden',
      });
    }

    await writeSecurityLog({
      event: `Authorization allowed: required ${requiredRole}`,
      userId: req.user.sub,
      severity: 'Low',
      status: 'Allowed',
      requestId: res.locals.requestId,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });

    return next();
  };
}
