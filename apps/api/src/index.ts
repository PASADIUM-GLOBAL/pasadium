import express from 'express';
import cors from 'cors';
import { authMiddleware, roleMiddleware } from './middleware/auth';
import { tradeService, marketService, adminService } from './services/core';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

/**
 * Trade Endpoints
 */
app.get('/api/trade/tickers', authMiddleware, async (req, res) => {
  const tickers = await tradeService.getTickers();
  res.json(tickers);
});

app.get('/api/trade/portfolio', authMiddleware, async (req, res) => {
  // In real app, use req.user.sub
  const portfolio = await tradeService.getPortfolio('user-123');
  res.json(portfolio);
});

/**
 * Market Endpoints
 */
app.get('/api/market/products', authMiddleware, async (req, res) => {
  const products = await marketService.getProducts();
  res.json(products);
});

/**
 * Admin Endpoints
 */
app.get('/api/admin/logs', authMiddleware, roleMiddleware('SuperAdmin'), async (req, res) => {
  res.json([
    { timestamp: '2026-08-14 12:01', event: 'Failed login attempt', user: 'unknown', severity: 'Medium', status: 'Blocked' },
    { timestamp: '2026-08-14 11:45', event: 'User role updated', user: 'root_admin', severity: 'Low', status: 'Allowed' },
  ]);
});

app.get('/api/admin/health', authMiddleware, roleMiddleware('SuperAdmin'), async (req, res) => {
  const health = await adminService.getSystemHealth();
  res.json(health);
});

app.get('/api/admin/users', authMiddleware, roleMiddleware('SuperAdmin'), async (req, res) => {
  const users = await adminService.getUsers();
  res.json(users);
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.listen(port, () => {
  console.log(`PASADIUM Core API running at http://localhost:${port}`);
});
