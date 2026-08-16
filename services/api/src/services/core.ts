import { db, Prisma } from "@pasadium/db";
import { Asset, Portfolio, User, MediaContent } from "@prisma/client";

export const tradeService = {
  getTickers: async () => {
    const assets = await db.asset.findMany();
    return assets.map((asset) => ({
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
    return portfolios.map((p) => ({
      asset: p.asset.ticker,
      amount: p.amount,
      value: p.value,
      pnl: p.pnl,
      up: p.up,
    }));
  },

  placeOrder: async (userId: string, assetTicker: string, type: 'BUY' | 'SELL', amount: string, price: string) => {
    return db.$transaction(async (tx) => {
      const asset = await tx.asset.findUnique({ where: { ticker: assetTicker } });
      if (!asset) throw new Error('Asset not found');

      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) throw new Error('Invalid amount');

      if (type === 'SELL') {
        const portfolio = await tx.portfolio.findFirst({
          where: { userId, assetId: asset.id }
        });
        
        if (!portfolio) throw new Error('Insufficient position: No assets owned');
        
        const ownedAmount = parseFloat(portfolio.amount);
        if (isNaN(ownedAmount) || ownedAmount < numericAmount) {
          throw new Error(`Insufficient position: Owned ${portfolio.amount}, requested ${amount}`);
        }
      }

      const order = await tx.order.create({
        data: {
          userId,
          assetId: asset.id,
          type,
          amount,
          price,
          status: 'COMPLETED',
        },
      });

      const portfolio = await tx.portfolio.findFirst({
        where: { userId, assetId: asset.id }
      });

      if (portfolio) {
        const currentAmount = parseFloat(portfolio.amount) || 0;
        const newAmount = type === 'BUY' 
          ? (currentAmount + numericAmount).toString()
          : (currentAmount - numericAmount).toString();
        
        await tx.portfolio.update({
          where: { id: portfolio.id },
          data: { amount: newAmount }
        });
      } else if (type === 'BUY') {
        await tx.portfolio.create({
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
    });
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

export const mediaService = {
  createContent: async (userId: string, data: any) => {
    return db.mediaContent.create({
      data: {
        title: data.title,
        type: data.type,
        category: data.category,
        tags: data.tags?.join(',') || '',
        url: data.url,
        authorId: userId,
        status: 'DRAFT',
      },
    });
  },
  updateStatus: async (contentId: string, userId: string, status: string) => {
    const content = await db.mediaContent.findUnique({ where: { id: contentId } });
    if (!content) throw new Error('Content not found');
    
    // Object-level authorization
    if (content.authorId !== userId) {
      throw new Error('Unauthorized: You do not own this content');
    }

    return db.mediaContent.update({
      where: { id: contentId },
      data: { status },
    });
  },
  getFeed: async () => {
    return db.mediaContent.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
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
    return users.map((u) => ({
      id: u.id,
      username: u.username,
      role: u.roles.split(',')[0],
    }));
  },
};
