import { Product, OrderResponse } from "@pasadium/api";

class MockMarketApi {
  private products: Product[] = [
    { id: 'p1', name: 'Quantum Analytics Suite', description: 'High-performance data analysis tool for digital assets.', price: '499.00', category: 'Software', image: 'analytics.png', provider: 'PASADIUM Core' },
    { id: 'p2', name: 'Sovereign Identity Vault', description: 'Secure, decentralized identity management for enterprises.', price: '1200.00', category: 'Security', image: 'vault.png', provider: 'SecVerse' },
    { id: 'p3', name: 'Media Engine License', description: 'Professional content distribution and publishing license.', price: '250.00', category: 'Media', image: 'media.png', provider: 'MediaVerse' },
    { id: 'p4', name: 'Market Intelligence Feed', description: 'Real-time data stream for global market movements.', price: '99.00', category: 'Data', image: 'feed.png', provider: 'TradeVerse' },
  ];

  async getProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.products;
  }

  async getProduct(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.products.find(p => p.id === id) || null;
  }

  async placeOrder(order: any): Promise<OrderResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      orderId: `mkt_${Math.random().toString(36).substr(2, 9)}`,
      status: 'confirmed',
      total: 'calculated_value',
      timestamp: new Date().toISOString(),
    };
  }
}

export const mockMarketApi = new MockMarketApi();
