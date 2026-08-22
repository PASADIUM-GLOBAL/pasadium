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
  marketService,
  adminService,
} from './services/core';
import { tradeService } from './domains/trade/trade.service';
import { securityService } from './domains/security/security.service';
import { mediaService } from './domains/media/media.service';

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
app.post(
  '/v1/auth/login',
  async (req, res) => {
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

      return res.status(200).json({ data: result });
    } catch (error) {
      console.error('Login failed:', error);

      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }
  },
);

app.get(
  '/v1/auth/me',
  authMiddleware,
  async (req, res) => {
    try {
      const user = await db.user.findUnique({
        where: { id: req.user?.sub },
        select: {
          id: true,
          username: true,
          email: true,
          roles: true,
        },
      });
      return res.json({ data: user });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve user' });
    }
  }
);

app.patch(
  '/v1/admin/users/:userId/role',
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
  '/v1/trade/tickers',
  authMiddleware,
  async (_req, res) => {
    try {
      const tickers = await tradeService.getTickers();

      return res.json({ data: tickers });
    } catch (error) {
      console.error('Ticker query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve market tickers',
      });
    }
  },
);

app.get(
  '/v1/trade/intelligence',
  authMiddleware,
  async (req, res) => {
    try {
      const instrument =
        typeof req.query.instrument === 'string'
          ? req.query.instrument
          : 'BTC/USD';

      const intelligence =
        await tradeService.getMarketIntelligence(instrument);

      return res.json({ data: intelligence });
    } catch (error) {
      console.error('Market intelligence query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve market intelligence',
      });
    }
  },
);

app.get(
  '/v1/trade/orderbook',
  authMiddleware,
  async (req, res) => {
    try {
      const instrument =
        typeof req.query.instrument === 'string'
          ? req.query.instrument
          : 'BTC/USD';

      const data = await tradeService.getOrderBook(instrument);

      return res.json({ data });
    } catch (error) {
      console.error('Orderbook query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve order book',
      });
    }
  },
);

app.get(
  '/v1/trade/portfolio',
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

      return res.json({ data: portfolio });
    } catch (error) {
      console.error('Portfolio query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve portfolio',
      });
    }
  },
);

app.post(
  '/v1/trade/execute',
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
      } = req.body;

      if (
        typeof asset !== 'string' ||
        (type !== 'BUY' && type !== 'SELL') ||
        typeof amount !== 'number'
      ) {
        return res.status(400).json({
          error:
            'asset, type, and amount (number) are required',
        });
      }

      const order = await tradeService.executeOrder(
        req.user.sub,
        asset,
        amount,
        type,
      );

      return res.status(201).json({ data: order });
    } catch (error: any) {
      console.error('Order execution failed:', error);

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
  '/v1/market/inventory',
  authMiddleware,
  async (req, res) => {
    try {
      const products = await marketService.getProducts();

      return res.json({ data: products });
    } catch (error) {
      console.error('Product query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve products',
      });
    }
  },
);

app.get(
  '/v1/market/logistics',
  authMiddleware,
  async (req, res) => {
    try {
      const data = await marketService.getSupplyChainStatus();
      return res.json({ data });
    } catch (error: any) {
      return res.status(500).json({ error: error.message ?? 'Logistics sync failed' });
    }
  },
);

app.post(
  '/v1/market/purchase',
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

      return res.status(201).json({ data: result });
    } catch (error: any) {
      console.error('Purchase failed:', error);

      return res.status(400).json({
        error: error.message ?? 'Purchase failed',
      });
    }
  },
);

app.post(
  '/v1/market/margin',
  authMiddleware,
  async (req, res) => {
    try {
      const { productId } = req.body;
      if (typeof productId !== 'string') {
        return res.status(400).json({ error: 'productId is required' });
      }
      const data = await marketService.calculateMargin(productId);
      return res.json({ data });
    } catch (error: any) {
      return res.status(400).json({ error: error.message ?? 'Margin calculation failed' });
    }
  },
);

/**
 * Media
 */
app.get(
  '/v1/media/distribution',
  authMiddleware,
  async (req, res) => {
    try {
      const data = await mediaService.getDistributionNetwork();
      return res.json({ data });
    } catch (error: any) {
      return res.status(500).json({ error: error.message ?? 'Distribution sync failed' });
    }
  },
);

app.post(
  '/v1/media/dispatch',
  authMiddleware,
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      const { prompt } = req.body;
      if (typeof prompt !== 'string') {
        return res.status(400).json({ error: 'prompt is required' });
      }
      const result = await mediaService.dispatchMediaJob(req.user.sub, prompt);
      return res.status(201).json({ data: result });
    } catch (error: any) {
      return res.status(400).json({ error: error.message ?? 'Dispatch failed' });
    }
  },
);

app.get(
  '/v1/media/jobs/:id',
  authMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const job = await mediaService.getJobStatus(id);
      return res.json({ data: job });
    } catch (error: any) {
      return res.status(404).json({ error: 'Job not found' });
    }
  },
);

/**
 * Security
 */
app.get(
  '/v1/security/integrity',
  authMiddleware,
  async (req, res) => {
    try {
      const integrity = await securityService.calculateUHI();
      return res.json({ data: integrity });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve integrity' });
    }
  },
);

app.get(
  '/v1/security/posture',
  authMiddleware,
  async (req, res) => {
    try {
      const posture = await securityService.getPosture();
      return res.json({ data: posture });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve posture' });
    }
  },
);

app.post(
  '/v1/security/maintenance',
  authMiddleware,
  async (req, res) => {
    try {
      const { action } = req.body;
      const result = await securityService.requestMaintenance(action);
      return res.json({ data: result });
    } catch (error: any) {
      return res.status(400).json({ error: error.message ?? 'Maintenance request failed' });
    }
  },
);

/**
 * Admin
 */
app.get(
  '/v1/admin/health',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req, res) => {
    try {
      const health = await adminService.getSystemHealth();

      return res.json({ data: health });
    } catch (error) {
      console.error('System health query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve system health',
      });
    }
  },
);

app.get(
  '/v1/admin/stats',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req, res) => {
    try {
      const stats = await adminService.getStats();

      return res.json({ data: stats });
    } catch (error) {
      console.error('Stats query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve stats',
      });
    }
  },
);

app.get(
  '/v1/admin/users',
  authMiddleware,
  roleMiddleware('SuperAdmin'),
  async (req, res) => {
    try {
      const users = await adminService.getUsers();

      return res.json({ data: users });
    } catch (error) {
      console.error('Admin user query failed:', error);

      return res.status(500).json({
        error: 'Failed to retrieve users',
      });
    }
  },
);

app.get(
  '/v1/admin/logs',
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

      return res.json({ data: logs });
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
  '/v1/users',
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

      return res.json({ data: users });
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
