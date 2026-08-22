import { db } from '@pasadium/db';
import { Prisma } from '@prisma/client';
import type { Asset, Portfolio } from '@prisma/client';
import type { MarketIntelligence, MarketData } from '@pasadium/bridge';

export const tradeService = {
  getTickers: async () => {
    const assets = await db.asset.findMany();
    return assets.map((asset: Asset) => ({
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
    return portfolios.map((p: any) => ({
      asset: p.asset.ticker,
      amount: p.amount,
      value: p.value,
      pnl: p.pnl,
      up: p.up,
    }));
  },

  getMarketIntelligence: async (instrument: string): Promise<MarketIntelligence> => {
    return {
      sentiment: "OPTIMISTIC",
      institutionalFlow: "Institutional Nodes (Group_A) showing high buy-side pressure.",
      technicalStructure: "Liquidity gap identified at $64,500; support holding at $63,200.",
      fundamental: "Linguistic confirmation of rate-cut cycle driving bullish divergence.",
      observation: `System detects a liquidity gap around $64,500 for ${instrument}. Institutional pressure remains elevated.`,
    };
  },

  getOrderBook: async (instrument: string): Promise<MarketData> => {
    // PHASE 2: SIMULATION_MODE (Deterministic synthetic liquidity)
    const midPrice = 64208.40;
    const generateLevels = (base: number, step: number, isBid: boolean) => 
      Array.from({ length: 15 }, (_, i) => ({
        price: (base + (isBid ? -step : step) * (i + 1)).toFixed(2),
        amount: (Math.sin(i + 1) + 1.5).toFixed(4),
      }));

    return {
      instrument,
      lastPrice: midPrice.toFixed(2),
      spread: '0.20',
      bids: generateLevels(midPrice, 0.1, true),
      asks: generateLevels(midPrice, 0.1, false).reverse(),
    };
  },

  executeOrder: async (userId: string, ticker: string, amount: number, side: 'BUY' | 'SELL') => {
    return await db.$transaction(async (tx) => {
      const asset = await tx.asset.findUnique({ where: { ticker } });
      if (!asset) throw new Error('ASSET_NOT_FOUND');

      const amountDec = new Prisma.Decimal(amount);
      const priceDec = new Prisma.Decimal(64208.40);

      const order = await tx.order.create({
        data: { 
          userId, 
          assetId: asset.id, 
          type: side, 
          amount: amountDec.toString(), 
          price: priceDec.toString(), 
          status: 'COMPLETED' 
        }
      });

      const portfolio = await tx.portfolio.findFirst({ 
        where: { userId, assetId: asset.id } 
      });
      
      const currentAmount = portfolio?.amount ? new Prisma.Decimal(portfolio.amount) : new Prisma.Decimal(0);
      const newBalance = side === 'BUY' 
        ? currentAmount.add(amountDec)
        : currentAmount.sub(amountDec);

      if (newBalance.lt(0)) throw new Error('INSUFFICIENT_LIQUIDITY');

      await tx.portfolio.upsert({
        where: { 
          userId_assetId: {
            userId,
            assetId: asset.id,
          }
        },
        update: { amount: newBalance.toString() },
        create: { userId, assetId: asset.id, amount: newBalance.toString(), value: priceDec.toString(), pnl: '0', up: true }
      });

      return order;
    });
  }
};
