import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { db } from '@pasadium/db';
import { login } from './services/auth';
import { authMiddleware, roleMiddleware } from './middleware/auth';
import { requestIdMiddleware } from './middleware/request-id';
import { auditMiddleware } from './middleware/audit';
import { auditPrivilegedMutation } from './services/security-log';
import { updateUserRole } from './services/admin';
import {
  tradeService,
  marketService,
  adminService,
  mediaService,
} from './services/core';

interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    username: string;
    roles: string;
  };
}

// Validation Schemas
const OrderSchema = z.object({
  asset: z.string().min(1),
  type: z.enum(['BUY', 'SELL']),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  price: z.string().regex(/^\d+(\.\d+)?$/),
});

const PublishSchema = z.object({
  title: z.string().min(1).max(255),
  type: z.enum(['article', 'video', 'podcast', 'report']),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  url: z.string().url().optional(),
});

const StatusSchema = z.object({
  status: z.enum(['DRAFT', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED']),
});

const app = express();
const port = Number(process.env.PORT ?? 4000);

// Production CORS Allowlist
const ALLOWED_ORIGINS = [
  'https://pasadium.tech',
  'https://www.pasadium.tech',
  'https://admin.pasadium.tech',
  'https://trade.pasadium.tech',
  'https://media.pasadium.tech',
  'https://market.pasadium.tech',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Rate Limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  message: { error: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per window
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestIdMiddleware);
app.use(auditMiddleware);
app.use(cors(corsOptions));
app.use(express.json());
app.use(apiLimiter);

/**
 * Health
 */
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'pasadium-api',
  });
});

app.get('/ready', async (_req, res) => {
  try {
    await db.$queryRaw`SELECT 1`;

    res.json({
      status: 'ready',
      database: 'connected',
    });
  } catch (error) {
    console.error('Database readiness check failed:', error);

    res.status(503).json({
      status: 'not_ready',
      database: 'disconnected',
    });
  }
});

/**
 * Authentication
 */
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        error: 'username and password are required',
      });
    }

    const result = await login(username, password);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Login failed:', error);

    return res.status(401).json({
      error: 'Invalid credentials',
    });
  }
});
app.patch(
  '/api/admin/users/:userId/role',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req: AuthenticatedRequest, res) => {
    const targetUserId = req.params.userId;
    const requestedRole = req.body?.role;

    try {
      if (typeof requestedRole !== 'string') {
        await auditPrivilegedMutation({
          req,
          res,
          action: 'UPDATE_USER_ROLE',
          resource: 'User',
          resourceId: targetUserId,
          outcome: 'Blocked',
          severity: 'High',
          after: {
            requestedRole,
          },
        });

        return res.status(400).json({
          error: 'role is required',
        });
      }

      const beforeUser = await db.user.findUnique({
        where: { id: targetUserId },
        select: {
          id: true,
          username: true,
          roles: true,
        },
      });

      if (!beforeUser) {
        await auditPrivilegedMutation({
          req,
          res,
          action: 'UPDATE_USER_ROLE',
          resource: 'User',
          resourceId: targetUserId,
          outcome: 'Blocked',
          severity: 'High',
          after: {
            requestedRole,
          },
        });

        return res.status(404).json({
          error: 'User not found',
        });
      }

      if (!['Trader', 'SuperAdmin'].includes(requestedRole)) {
        await auditPrivilegedMutation({
          req,
          res,
          action: 'UPDATE_USER_ROLE',
          resource: 'User',
          resourceId: targetUserId,
          outcome: 'Blocked',
          severity: 'High',
          before: {
            roles: beforeUser.roles,
          },
          after: {
            requestedRole,
          },
        });

        return res.status(400).json({
          error: 'Invalid role',
        });
      }

      if (
        targetUserId === req.user?.sub &&
        requestedRole !== 'SuperAdmin'
      ) {
        await auditPrivilegedMutation({
          req,
          res,
          action: 'UPDATE_USER_ROLE',
          resource: 'User',
          resourceId: targetUserId,
          outcome: 'Blocked',
          severity: 'Critical',
          before: {
            roles: beforeUser.roles,
          },
          after: {
            requestedRole,
          },
        });

        return res.status(403).json({
          error: 'SuperAdmin cannot remove its own privilege',
        });
      }

      const updatedUser = await updateUserRole(
        targetUserId,
        requestedRole,
      );

      await auditPrivilegedMutation({
        req,
        res,
        action: 'UPDATE_USER_ROLE',
        resource: 'User',
        resourceId: targetUserId,
        outcome: 'Allowed',
        severity: 'High',
        before: {
          roles: beforeUser.roles,
        },
        after: {
          roles: updatedUser.roles,
        },
      });

      return res.json(updatedUser);
    } catch (error) {
      console.error('Privileged user-role mutation failed:', error);

      await auditPrivilegedMutation({
        req,
        res,
        action: 'UPDATE_USER_ROLE',
        resource: 'User',
        resourceId: targetUserId,
        outcome: 'Failed',
        severity: 'Critical',
        after: {
          requestedRole,
        },
      });

      return res.status(500).json({
        error: 'Failed to update user role',
      });
    }
  },
);

/**
 * Trade
 */
app.get(
  '/api/trade/tickers',
  authMiddleware,
  async (_req, res) => {
    try {
      const tickers = await tradeService.getTickers();

      return res.json(tickers);
    } catch (error) {
      console.error('Ticker query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve market tickers',
      });
    }
  },
);

app.get(
  '/api/trade/portfolio',
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
        });
      }

      const portfolio = await tradeService.getPortfolio(
        req.user.sub,
      );

      return res.json(portfolio);
    } catch (error) {
      console.error('Portfolio query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve portfolio',
      });
    }
  },
);

app.post(
  '/api/trade/order',
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
        });
      }

      const validatedData = OrderSchema.parse(req.body);

      const order = await tradeService.placeOrder(
        req.user.sub,
        validatedData.asset,
        validatedData.type,
        validatedData.amount,
        validatedData.price,
      );

      return res.status(201).json(order);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.issues });
      }
      console.error('Order creation failed:', error);

      return res.status(400).json({
        error: error.message ?? 'Order failed',
      });
    }
  },
);

/**
 * Marketplace
 */
app.get(
  '/api/market/products',
  authMiddleware,
  async (req, res) => {
    try {
      const products = await marketService.getProducts();

      return res.json(products);
    } catch (error) {
      console.error('Product query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve products',
      });
    }
  },
);

app.post(
  '/api/market/purchase',
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
        });
      }

      const { productId } = req.body;

      if (typeof productId !== 'string') {
        return res.status(400).json({
          error: 'productId is required',
        });
      }

      const result = await marketService.purchaseProduct(
        req.user.sub,
        productId,
      );

      return res.status(201).json(result);
    } catch (error: any) {
      console.error('Purchase failed:', error);

      return res.status(400).json({
        error: error.message ?? 'Purchase failed',
      });
    }
  },
);

/**
 * Admin
 */
app.get(
  '/api/admin/health',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req, res) => {
    try {
      const health = await adminService.getSystemHealth();

      return res.json(health);
    } catch (error) {
      console.error('System health query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve system health',
      });
    }
  },
);

app.get(
  '/api/admin/users',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req, res) => {
    try {
      const users = await adminService.getUsers();

      return res.json(users);
    } catch (error) {
      console.error('Admin user query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve users',
      });
    }
  },
);

app.get(
  '/api/admin/logs',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req, res) => {
    try {
      const logs = await db.securityLog.findMany({
        orderBy: {
          timestamp: 'desc',
        },
        take: 100,
      });

      return res.json(logs);
    } catch (error) {
      console.error('Security log query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve security logs',
      });
    }
  },
);

/**
 * Media
 */
app.get(
  '/api/media/feed',
  authMiddleware,
  async (_req, res) => {
    try {
      const feed = await mediaService.getFeed();

      return res.json(feed);
    } catch (error) {
      console.error('Media feed query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve media feed',
      });
    }
  },
);

app.post(
  '/api/media/publish',
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
        });
      }

      const validatedData = PublishSchema.parse(req.body);

      const content = await mediaService.createContent(
        req.user.sub,
        validatedData,
      );

      return res.status(201).json(content);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.issues });
      }
      console.error('Media publication failed:', error);

      return res.status(400).json({
        error: error.message ?? 'Publication failed',
      });
    }
  },
);

app.patch(
  '/api/media/content/:id/status',
  authMiddleware,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const validatedData = StatusSchema.parse(req.body);

      const content = await mediaService.updateStatus(
        id, 
        req.user?.sub || '', 
        validatedData.status
      );

      return res.json(content);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Invalid input', details: error.issues });
      }
      console.error('Media status update failed:', error);

      return res.status(400).json({
        error: error.message ?? 'Update failed',
      });
    }
  },
);

/**
 * General authenticated users
 */

app.get(
  '/api/users',
  authMiddleware,
  async (_req, res) => {
    try {
      const users = await db.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          roles: true,
          createdAt: true,
        },
      });

      return res.json(users);
    } catch (error) {
      console.error('User query failed:', error);

      return res.status(500).json({
        error: 'Database query failed',
      });
    }
  },
);

/**
 * Production Error Handler
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  console.error(`[ERROR] ${req.method} ${req.url}:`, err);

  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: isProduction 
        ? 'An unexpected error occurred. Please contact support.' 
        : err.message,
      requestId: res.locals.requestId,
    }
  });
});

const server = app.listen(port, () => {
  console.log(
    `PASADIUM Core API running at http://localhost:${port}`,
  );
});

process.on('SIGINT', async () => {
  await db.$disconnect();
  server.close();
});

process.on('SIGTERM', async () => {
  await db.$disconnect();
  server.close();
});
