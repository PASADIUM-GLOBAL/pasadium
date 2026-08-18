import type { Request, Response, NextFunction } from 'express';
import { writeSecurityLog } from '../services/security-log';

export function auditMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startedAt = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - startedAt;

    const statusCode = res.statusCode;

    if (statusCode < 400) {
      return;
    }

    const user = (req as Request & {
      user?: {
        sub?: string;
      };
    }).user;

    const severity =
      statusCode === 401
        ? 'Medium'
        : statusCode === 403
          ? 'High'
          : 'Medium';

    await writeSecurityLog({
      event: `HTTP ${req.method} ${req.path} → ${statusCode} (${duration}ms)`,
      userId: user?.sub,
      severity,
      status:
        statusCode === 401 || statusCode === 403
          ? 'Blocked'
          : 'Failed',
      requestId: res.locals.requestId,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
}
