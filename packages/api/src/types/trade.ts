export interface TradeTicker {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
}

export interface PortfolioItem {
  asset: string;
  amount: string;
  value: string;
  pnl: string;
  up: boolean;
}

export interface TradeOrderRequest {
  symbol: string;
  amount: string;
  side: 'buy' | 'sell';
}

export interface TradeOrderResponse {
  orderId: string;
  status: 'filled' | 'pending' | 'rejected';
  timestamp: string;
}
