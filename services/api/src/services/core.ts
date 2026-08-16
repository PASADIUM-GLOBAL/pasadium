import { db } from '@pasadium/db';

async function logRejectedOrder(
  userId: string,
  event: string,
) {
  console.log('AUDIT: attempting persistence', {
    userId,
    event,
  });

  try {
    const result = await db.securityLog.create({
      data: {
        event,
        userId,
        severity: 'Medium',
        status: 'Blocked',
      },
    });

    console.log('AUDIT: persistence successful', {
      id: result.id,
    });

    return result;
  } catch (error) {
    console.error('AUDIT: persistence FAILED', error);
    throw error;
  }
}

function parseNumber(value: string, field: string): number {
  const normalized = value.replace(/,/g, '').trim();
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid ${field}`);
  }

  return parsed;
}

function formatNumber(value: number): string {
  return value.toFixed(8).replace(/\.?0+$/, '');
}

export const tradeService = {
  getTickers: async () => {
    const assets = await db.asset.findMany({
      orderBy: {
        ticker: 'asc',
      },
    });

    return assets.map((asset: any) => ({
      asset: asset.ticker,
      price: '64,000.00',
      change: '+1.2%',
      up: true,
    }));
  },

  getPortfolio: async (userId: string) => {
    const portfolios = await db.portfolio.findMany({
      where: { userId },
      include: { asset: true },
      orderBy: {
        asset: {
          ticker: 'asc',
        },
      },
    });

    return portfolios.map((portfolio: any) => ({
      id: portfolio.id,
      asset: portfolio.asset.ticker,
      amount: portfolio.amount,
      value: portfolio.value,
      pnl: portfolio.pnl,
      up: portfolio.up,
    }));
  },

  placeOrder: async (
  userId: string,
  assetTicker: string,
  type: 'BUY' | 'SELL',
  amount: string,
  price: string,
) => {
  console.log("### LIVE CORE PLACEORDER v2 ###");
  
  const { Decimal } = await import('decimal.js');

  if (type !== 'BUY' && type !== 'SELL') {
    throw new Error('Invalid order type');
  }

  let quantity: InstanceType<typeof Decimal>;
  let executionPrice: InstanceType<typeof Decimal>;

  try {
    quantity = new Decimal(amount.replace(/,/g, '').trim());
    executionPrice = new Decimal(price.replace(/,/g, '').trim());
  } catch {
    throw new Error('Amount and price must be valid numbers');
  }

  if (!quantity.isFinite() || quantity.lte(0)) {
    throw new Error('Amount must be greater than zero');
  }

  if (!executionPrice.isFinite() || executionPrice.lte(0)) {
    throw new Error('Price must be greater than zero');
  }

  const asset = await db.asset.findUnique({
    where: { ticker: assetTicker },
  });

  if (!asset) {
    throw new Error('Asset not found');
  }

  try {
    console.log('AUDIT: entering transaction');
    
    const result = await db.$transaction(async (tx: typeof db) => {
      const portfolio = await tx.portfolio.findFirst({
        where: {
          userId,
          assetId: asset.id,
         },
      });
    
      const currentAmount = new Decimal(
        (portfolio?.amount ?? '0').replace(/,/g, ''),
      );

      let newAmount: InstanceType<typeof Decimal>;

      if (type === 'BUY') {
        newAmount = currentAmount.plus(quantity);
      } else {
        if (currentAmount.lt(quantity)) {
            
          throw new Error('Insufficient asset balance');
        }

        newAmount = currentAmount.minus(quantity);
      }

      const order = await tx.order.create({
        data: {
          userId,
          assetId: asset.id,
          type,
          amount: quantity.toFixed(),
          price: executionPrice.toFixed(),
          status: 'COMPLETED',
        },
      });

      const positionValue = newAmount.mul(executionPrice);
  
      if (portfolio) {
        await tx.portfolio.update({
          where: {
            id: portfolio.id,
          },
          data: {
            amount: newAmount.toFixed(),
            value: positionValue.toFixed(),
            pnl: portfolio.pnl,
            up: portfolio.up,
          },
        });
      } else {
        if (type === 'SELL') {
          throw new Error('Cannot sell an asset without a portfolio position');
        }

        await tx.portfolio.create({
          data: {
            userId,
            assetId: asset.id,
            amount: newAmount.toFixed(),
            value: positionValue.toFixed(),
            pnl: '0',
            up: true,
          },
        });
      }

      await tx.securityLog.create({
        data: {
          event: `${type} order executed: ${assetTicker}`,
          userId,
          severity: 'Low',
          status: 'Allowed',
        },
      });

      return order;
    });
    console.log('AUDIT: transaction returned successfully');

    return result;
  } catch (error) {
    console.log('AUDIT: OUTER CATCH REACHED');
    console.log('AUDIT: caught error:', error);
    
    if (
      error instanceof Error &&
      (
        error.message === 'Insufficient asset balance' ||
        error.message ===
          'Cannot sell an asset without a portfolio position'
      )
    ) {
      console.log('=== AUDIT BRANCH ENTERED ===');

      await logRejectedOrder(
        userId,
        `Rejected ${type}: ${assetTicker} order - ${error.message}`,
      );
      console.log('=== AUDIT BRANCH COMPLETED ===');
    }

    throw error;
  }
},
       
};
export const marketService = {
  getProducts: async () => {
    return db.product.findMany({
      orderBy: {
        price: 'asc',
      },
    });
  },

  purchaseProduct: async (
    userId: string,
    productId: string,
  ) => {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      success: true,
      orderId: crypto.randomUUID(),
      userId,
      product: product.name,
      amount: product.price,
    };
  },
};

export const adminService = {
  getSystemHealth: async () => {
    await db.$queryRaw`SELECT 1`;

    return {
      status: 'Healthy',
      database: 'connected',
    };
  },

  getUsers: async () => {
    const users = await db.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return users;
  },
};
