import { db } from "@pasadium/db";

export const tradeService = {
  getTickers: async () => {
    const assets = await db.asset.findMany();
    // In a real app, prices would come from a market data feed/cache
    return assets.map(asset => ({
      asset: asset.ticker,
      price: '64,000.00', // Mocked price
      change: '+1.2%',
      up: true,
    }));
  },
  getPortfolio: async (userId: string) => {
    const portfolios = await db.portfolio.findMany({
      where: { userId },
      include: { asset: true }
    });
    return portfolios.map(p => ({
      asset: p.asset.ticker,
      amount: p.amount,
      value: p.value,
      pnl: p.pnl,
      up: p.up,
    }));
  },
};

export const marketService = {
  getProducts: async () => {
    return db.product.findMany();
  },
};

export const adminService = {
  getSystemHealth: async () => {
    return {
      cpu: '12%',
      memory: '4.2GB / 16GB',
      uptime: '14d 6h 22m',
      status: 'Healthy',
    };
  },
  getUsers: async () => {
    const users = await db.user.findMany();
    return users.map(u => ({
      id: u.id,
      username: u.username,
      role: u.roles.split(',')[0], // Simplified
    }));
  },
};
