import { TradeTicker, PortfolioItem, TradeOrderResponse } from "@pasadium/api";

class MockTradeApi {
  async getTicker(): Promise<TradeTicker[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      { symbol: 'PAS', price: (1.20 + Math.random() * 0.1).toFixed(2), change: '+2.4%', up: true },
      { symbol: 'BTC', price: (64000 + Math.random() * 500).toFixed(0), change: '-0.8%', up: false },
      { symbol: 'ETH', price: (3400 + Math.random() * 100).toFixed(2), change: '+1.2%', up: true },
      { symbol: 'SOL', price: (140 + Math.random() * 10).toFixed(2), change: '+5.6%', up: true },
    ];
  }

  async getPortfolio(): Promise<PortfolioItem[]> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return [
      { asset: 'PAS', amount: '10,000', value: '$12,400', pnl: '+15%', up: true },
      { asset: 'BTC', amount: '0.5', value: '$32,105', pnl: '-2%', up: false },
      { asset: 'ETH', amount: '4.2', value: '$14,490', pnl: '+8%', up: true },
      { asset: 'USDC', amount: '5,000', value: '$5,000', pnl: '0%', up: true },
    ];
  }

  async placeOrder(symbol: string, amount: string, side: 'buy' | 'sell'): Promise<TradeOrderResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      orderId: `ord_${Math.random().toString(36).substr(2, 9)}`,
      status: 'filled',
      timestamp: new Date().toISOString(),
    };
  }
}

export const mockTradeApi = new MockTradeApi();
