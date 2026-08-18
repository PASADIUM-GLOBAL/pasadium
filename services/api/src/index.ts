import 'dotenv/config';
import express from 'express';
import cors from 'cors';
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
} from './services/core';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const ALLOWED_ROLES = [
  'Trader',
  'SuperAdmin',
] as const;

app.use(requestIdMiddleware);
app.use(auditMiddleware);
app.use(cors());
app.use(express.json());

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
app.post('/api/auth/login', async (req, res) => {
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
  async (req, res) => {
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
  async (req, res) => {
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
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
        });
      }

      const {
        asset,
        type,
        amount,
        price,
      } = req.body;

      if (
        typeof asset !== 'string' ||
        (type !== 'BUY' && type !== 'SELL') ||
        typeof amount !== 'string' ||
        typeof price !== 'string'
      ) {
        return res.status(400).json({
          error:
            'asset, type, amount and price are required',
        });
      }

      const order = await tradeService.placeOrder(
        req.user.sub,
        asset,
        type,
        amount,
        price,
      );

      return res.status(201).json(order);
    } catch (error: any) {
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
  async (req, res) => {
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
 * Server
 */
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
