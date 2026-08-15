import express from 'express';
import cors from 'cors';
import { authMiddleware, roleMiddleware } from './middleware/auth';
import { requestIdMiddleware } from './middleware/request-id';
import { errorHandler } from './middleware/errors';
import { tradeService, marketService, adminService } from './services/core';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(requestIdMiddleware);
app.use(express.json());

/**
 * Health Check Endpoints
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/ready', async (req, res) => {
  try {
    // In a real app, check DB connection here
    res.json({ status: 'ready' });
  } catch (err) {
    res.status(503).json({ status: 'not ready' });
  }
});

/**
 * Trade Endpoints
 */
app.get('/api/trade/tickers', authMiddleware, async (req, res) => {
  const tickers = await tradeService.getTickers();
  res.json(tickers);
});

app.get('/api/trade/portfolio', authMiddleware, async (req, res) => {
  const portfolio = await tradeService.getPortfolio((req as any).user.sub);
  res.json(portfolio);
});

app.post('/api/trade/order', authMiddleware, async (req, res) => {
  const { asset, type, amount, price } = req.body;
  try {
    const order = await tradeService.placeOrder(
      (req as any).user.sub,
      asset,
      type,
      amount,
      price
    );
    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Market Endpoints
 */
app.get('/api/market/products', authMiddleware, async (req, res) => {
  const products = await marketService.getProducts();
  res.json(products);
});

app.post('/api/market/purchase', authMiddleware, async (req, res) => {
  const { productId } = req.body;
  try {
    const result = await marketService.purchaseProduct((req as any).user.sub, productId);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Admin Endpoints
 */
app.get('/api/admin/health', authMiddleware, roleMiddleware('SuperAdmin'), async (req, res) => {
  const health = await adminService.getSystemHealth();
  res.json(health);
});

app.get('/api/admin/users', authMiddleware, roleMiddleware('SuperAdmin'), async (req, res) => {
  const users = await adminService.getUsers();
  res.json(users);
});

app.get('/api/admin/logs', authMiddleware, roleMiddleware('SuperAdmin'), async (req, res) => {
  res.json([
    { timestamp: '2026-08-14 12:01', event: 'Failed login attempt', user: 'unknown', severity: 'Medium', status: 'Blocked' },
    { timestamp: '2026-08-14 11:45', event: 'User role updated', user: 'root_admin', severity: 'Low', status: 'Allowed' },
  ]);
});

// Centralized Error Handler (Must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`PASADIUM Core API running at http://localhost:${port}`);
});
