import { db } from "@pasadium/db";

type AssetSummary = {
  ticker: string;
};

type PortfolioSummary = {
  asset: AssetSummary;
  amount: string;
  value: string;
  pnl: string;
  up: boolean;
};

type UserSummary = {
  id: string;
  username: string;
  roles: string;
};

export const tradeService = {
  getTickers: async () => {
    const assets = await db.asset.findMany();
    return assets.map((asset: AssetSummary) => ({
      asset: asset.ticker,
      price: '64,000.00',
      change: '+1.2%',
      up: true,
    }));
  },

  getPortfolio: async (userId: string) => {
    const portfolios = await db.portfolio.findMany({
      where: { userId },
      include: { asset: true }
    });
    return portfolios.map((p: PortfolioSummary) => ({
      asset: p.asset.ticker,
      amount: p.amount,
      value: p.value,
      pnl: p.pnl,
      up: p.up,
    }));
  },

  placeOrder: async (userId: string, assetTicker: string, type: 'BUY' | 'SELL', amount: string, price: string) => {
    const asset = await db.asset.findUnique({ where: { ticker: assetTicker } });
    if (!asset) throw new Error('Asset not found');

    const order = await db.order.create({
      data: {
        userId,
        assetId: asset.id,
        type,
        amount,
        price,
        status: 'COMPLETED',
      },
    });

    const portfolio = await db.portfolio.findFirst({
      where: { userId, assetId: asset.id }
    });

    if (portfolio) {
      await db.portfolio.update({
        where: { id: portfolio.id },
        data: { amount: 'Updated' }
      });
    } else if (type === 'BUY') {
      await db.portfolio.create({
        data: {
          userId,
          assetId: asset.id,
          amount,
          value: price,
          pnl: '0',
          up: true,
        },
      });
    }

    return order;
  },
};

export const marketService = {
  getProducts: async () => {
    return db.product.findMany();
  },
  purchaseProduct: async (userId: string, productId: string) => {
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    
    return {
      success: true,
      orderId: Math.random().toString(36).substring(7),
      product: product.name,
      amount: product.price,
    };
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
    return users.map((u: UserSummary) => ({
      id: u.id,
      username: u.username,
      role: u.roles.split(',')[0],
    }));
  },
};
