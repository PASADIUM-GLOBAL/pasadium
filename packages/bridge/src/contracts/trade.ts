export type OrderSide = 'BUY' | 'SELL';

export interface OrderRequest {
  instrument: string;
  side: OrderSide;
  orderType: 'LIMIT' | 'MARKET';
  quantity: string;
  limitPrice?: string;
}

export interface OrderIntent {
  request: OrderRequest;
  humanConfirmation: {
    statement: string;
    confirmed: boolean;
  };
}

export interface OrderPreview {
  accepted: boolean;
  estimatedTotal: string;
  fees: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  warnings: string[];
}

export interface OrderResult {
  orderId: string;
  status: 'ACCEPTED' | 'REJECTED' | 'PENDING' | 'FILLED' | 'CANCELLED';
  timestamp: string;
}

export interface MarketData {
  instrument: string;
  asks: { price: string; amount: string }[];
  bids: { price: string; amount: string }[];
  spread: string;
  lastPrice: string;
}

export interface MarketIntelligence {
  sentiment: string;
  institutionalFlow: string;
  technicalStructure: string;
  fundamental: string;
  observation: string;
}

export interface TradeCapability {
  getOrderBook(instrument: string): Promise<MarketData>;
  getIntelligence(instrument: string): Promise<MarketIntelligence>;
  previewOrder(request: OrderRequest): Promise<OrderPreview>;
  executeOrder(intent: OrderIntent): Promise<OrderResult>;
}
