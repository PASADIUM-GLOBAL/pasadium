import { db } from "@pasadium/db";
import Decimal from "decimal.js";
import type { Asset, Portfolio, User } from "@prisma/client";
import type { MarginBreakdown, LogisticsStatus } from "@pasadium/bridge";

export const marketService = {
  getProducts: async () => {
    return db.product.findMany();
  },
  purchaseProduct: async (userId: string, productId: string) => {
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error('Product not found');
    
    return {
      success: true,
      orderId: crypto.randomUUID(),
      product: product.name,
      amount: product.price,
    };
  },
  calculateMargin: async (productId: string): Promise<MarginBreakdown> => {
    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error('PRODUCT_NOT_FOUND');

    // PHASE 2: Economic Logic Simulation
    const sourcingCost = new Decimal(product.price * 0.6); 
    const tariffRate = new Decimal(0.08); 
    const platformFee = new Decimal(150.00);
    const marginRate = new Decimal(0.35);

    const tariffs = sourcingCost.mul(tariffRate);
    const subtotal = sourcingCost.add(tariffs).add(platformFee);
    const marginAmount = subtotal.mul(marginRate);
    const finalPrice = subtotal.add(marginAmount);

    return {
      sourcingCost: sourcingCost.toNumber(),
      importTariffs: tariffs.toNumber(),
      platformFee: platformFee.toNumber(),
      calculatedMargin: marginAmount.toNumber(),
      finalListPrice: Number(finalPrice.toFixed(2)),
      markupPercentage: 35,
      isHedged: true,
      isDynamicMarkup: true
    };
  },
  getSupplyChainStatus: async (): Promise<LogisticsStatus> => {
    return {
      globalIntegrity: 0.98,
      nodes: [
        { 
          id: 'node-01', 
          label: 'Wholesale_Bridge', 
          status: 'ACTIVE', 
          detail: 'Alibaba_Cloud_API_v4.2', 
          integrity: 1.0 
        },
        { 
          id: 'node-02', 
          label: 'Consumer_Bridge', 
          status: 'ACTIVE', 
          detail: 'AliExpress_Drop_Service', 
          integrity: 0.99 
        },
        { 
          id: 'node-03', 
          label: 'Freight_Transit', 
          status: 'TRANSIT', 
          detail: 'Vessel: MARSK_ALPHA_NODE', 
          integrity: 0.95 
        },
        { 
          id: 'node-04', 
          label: 'Last_Mile_Hub', 
          status: 'PENDING', 
          detail: 'Regional_Dist_Center_S1', 
          integrity: 1.0 
        }
      ]
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
    return users.map((u: User) => ({
      id: u.id,
      username: u.username,
      role: u.roles.split(',')[0],
    }));
  },
  getStats: async () => {
    const userCount = await db.user.count();
    const orderCount = await db.order.count();
    const productCount = await db.product.count();
    return {
      totalUsers: userCount,
      totalOrders: orderCount,
      totalProducts: productCount,
      systemLoad: 'Nominal'
    };
  },
};
