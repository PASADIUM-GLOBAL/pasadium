export interface TrendAnalysisRequest {
  topic: string;
  depth: 'SURFACE' | 'DEEP' | 'CORE';
}

export interface TrendAnalysisResult {
  trend: string;
  confidence: number;
  insights: string[];
}

export interface SwapRequest {
  fromAsset: string;
  toAsset: string;
  amount: string;
}

export interface SwapResult {
  txId: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  receivedAmount: string;
}

import { TradeCapability } from './trade';
import { MediaCapability } from './media';
import { MarketCapability } from './market';
import { SecurityCapability } from './security';
export * from './admin';
export * from './market';
export * from './media';
export * from './security';
export * from './trade';

export type {
  SecurityPosture,
  SecurityState,
  AuditLog,
  SecurityCapability,
} from './security';

export interface BrandOSRuntime {
  security: SecurityCapability;
  intelligence: {
    analyzeTrend(request: TrendAnalysisRequest): Promise<TrendAnalysisResult>;
  };
  commerce: {
    initiateSwap(request: SwapRequest): Promise<SwapResult>;
  };
  trade: TradeCapability;
  media: MediaCapability;
  market: MarketCapability;
}

