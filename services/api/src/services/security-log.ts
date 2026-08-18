import { db } from '@pasadium/db';
import type { Request, Response } from 'express';

const SENSITIVE_FIELDS = new Set([
  'password',
  'passwordHash',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'cookie',
  'secret',
  'apiKey',
  'privateKey',
]);

function sanitizeAuditData(
  data?: Record<string, unknown>,
): Record<string, unknown> | undefined {
  if (!data) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      SENSITIVE_FIELDS.has(key)
        ? '[REDACTED]'
        : value,
    ]),
  );
}

export type SecuritySeverity =
  | 'Low'
  | 'Medium'
  | 'High'
  | 'Critical';

export type SecurityStatus =
  | 'Allowed'
  | 'Blocked'
  | 'Failed';

interface SecurityEvent {
  event: string;
  userId?: string;
  severity: SecuritySeverity;
  status: SecurityStatus;
  requestId?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function writeSecurityLog({
  event,
  userId,
  severity,
  status,
  requestId,
  ipAddress,
  userAgent,
}: SecurityEvent) {
  try {
    return await db.securityLog.create({
      data: {
        event,
        userId,
        severity,
        status,
        requestId,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error('Security log write failed:', error);
    return null;
  }
}

export async function auditPrivilegedMutation({
  req,
  res,
  action,
  resource,
  resourceId,
  outcome,
  severity = 'High',
  before,
  after,
}: {
  req: Request;
  res: Response;
  action: string;
  resource: string;
  resourceId?: string;
  outcome: 'Allowed' | 'Failed' | 'Blocked';
  severity?: 'Medium' | 'High' | 'Critical';
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
}) {
  const event = [
    `Privileged mutation: ${action}`,
    `resource=${resource}`,
    resourceId ? `resourceId=${resourceId}` : undefined,
    `outcome=${outcome}`,
    before ? `before=${JSON.stringify(before)}` : undefined,
    after ? `after=${JSON.stringify(after)}` : undefined,
  ]
    .filter(Boolean)
    .join(' | ');

  return writeSecurityLog({
    event,
    userId: req.user?.sub,
    severity,
    status: outcome,
    requestId: res.locals.requestId,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });
}
