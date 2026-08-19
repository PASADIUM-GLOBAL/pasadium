import type {
  BrandOSRuntime,
  TrendAnalysisRequest,
  TrendAnalysisResult,
  SwapRequest,
  SwapResult,
} from './contracts';

import type {
  OrderRequest,
  OrderIntent,
  MarketData,
  MarketIntelligence,
  OrderPreview,
  OrderResult,
} from './contracts/trade';

import type {
  SecurityState,
  AuditLog,
} from './contracts/security';

import type {
  SupplyChainNode,
  InventoryItem,
  MarginCalculation,
} from './contracts/market';

import type {
  MediaProject,
  NarrativeRequest,
  NarrativeResult,
  ProductionAsset,
  ProductionStatus,
  DistributionTarget,
} from './contracts/media';

export interface BrandOSClientConfig {
  baseUrl: string;
  getToken: () => string | null;
}


export class BrandOSClient implements BrandOSRuntime {
  constructor(private readonly config: BrandOSClientConfig) {}

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = this.config.getToken();

    if (!token) {
      throw new Error('AUTHORITY_REQUIRED');
    }

    const response = await fetch(
      `${this.config.baseUrl}${path}`,
      {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));

      throw new Error(
        body.error ||
          `BRANDOS_REQUEST_FAILED_${response.status}`,
      );
    }

    return response.json() as Promise<T>;
  }

  // ─────────────────────────────────────────────
  // SECURITY
  // ─────────────────────────────────────────────

  security = {
    getPosture: () =>
      this.request<SecurityState>(
        '/v1/security/posture',
      ),

    getSystemIntegrity: () =>
      this.request<SecurityState>(
        '/v1/security/integrity',
      ),

    getAuditLogs: () =>
      this.request<AuditLog[]>(
        '/v1/security/audit',
      ),

    requestMaintenance: (action: string) =>
      this.request<{ success: boolean }>(
        '/v1/security/maintenance',
        {
          method: 'POST',
          body: JSON.stringify({ action }),
        },
      ),
  };

  // ─────────────────────────────────────────────
  // INTELLIGENCE
  // ─────────────────────────────────────────────

  intelligence: BrandOSRuntime['intelligence'] = {
    analyzeTrend: async (
      request: TrendAnalysisRequest
    ): Promise<TrendAnalysisResult> => {
      return this.request<TrendAnalysisResult>(
        '/intelligence/analyze',
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    },
  };

  // ─────────────────────────────────────────────
  // COMMERCE
  // ─────────────────────────────────────────────

  commerce: BrandOSRuntime['commerce'] = {
    initiateSwap: async (
      request: SwapRequest
    ): Promise<SwapResult> => {
      return this.request<SwapResult>(
        '/commerce/swap',
        {
          method: 'POST',
          body: JSON.stringify(request),
        }
      );
    },
  };

  // ─────────────────────────────────────────────
  // TRADE
  // ─────────────────────────────────────────────

  trade = {
    getOrderBook: (instrument: string) =>
      this.request<MarketData>(
        `/v1/trade/orderbook/${encodeURIComponent(instrument)}`,
      ),

    getMarketState: () =>
      this.request<MarketData[]>(
        '/v1/trade/tickers',
      ),

    getIntelligence: (instrument: string) =>
      this.request<MarketIntelligence>(
        `/v1/trade/intelligence/${encodeURIComponent(instrument)}`,
      ),

    previewOrder: (request: OrderRequest) =>
      this.request<OrderPreview>(
        '/v1/trade/preview',
        {
          method: 'POST',
          body: JSON.stringify(request),
        },
      ),

    executeOrder: (intent: OrderIntent) =>
      this.request<OrderResult>(
        '/v1/trade/execute',
        {
          method: 'POST',
          body: JSON.stringify(intent),
        },
      ),

    // Legacy compatibility
    execute: (params: {
      ticker: string;
      amount: number;
      side: 'BUY' | 'SELL';
    }) =>
      this.request<OrderResult>(
        '/v1/trade/execute',
        {
          method: 'POST',
          body: JSON.stringify(params),
        },
      ),
  };

  // ─────────────────────────────────────────────
  // MARKET
  // ─────────────────────────────────────────────

  market = {
    getSupplyChainStatus: () =>
      this.request<SupplyChainNode[]>(
        '/v1/market/supply-chain',
      ),

    getInventory: () =>
      this.request<InventoryItem[]>(
        '/v1/market/inventory',
      ),

    calculateMargin: (productId: string) =>
      this.request<MarginCalculation>(
        `/v1/market/margin/${encodeURIComponent(productId)}`,
      ),

    synchronizeStorefront: (
      provider: 'SHOPIFY' | 'WOOCOMMERCE',
    ) =>
      this.request<{ success: boolean }>(
        '/v1/market/storefront/synchronize',
        {
          method: 'POST',
          body: JSON.stringify({ provider }),
        },
      ),
  };

  // ─────────────────────────────────────────────
  // MEDIA
  // ─────────────────────────────────────────────

  media = {
    createProject: (request: NarrativeRequest) =>
      this.request<MediaProject>(
        '/v1/media/project',
        {
          method: 'POST',
          body: JSON.stringify(request),
        },
      ),

    generateNarrative: (projectId: string) =>
      this.request<NarrativeResult>(
        `/v1/media/project/${encodeURIComponent(projectId)}/narrative`,
        {
          method: 'POST',
        },
      ),

    getProductionStatus: async (
      projectId: string
    ): Promise<ProductionStatus> => {
      return this.request<ProductionStatus>(
        `/media/projects/${projectId}/status`
      );
    },

    getDistributionTargets: async (): Promise<DistributionTarget[]> => {
      return this.request<DistributionTarget[]>(
        '/media/distribution-targets'
      );
    },

    getAssets: (projectId: string) =>
      this.request<ProductionAsset[]>(
        `/v1/media/project/${encodeURIComponent(projectId)}/assets`,
      ),

    configureDistribution: (
      projectId: string,
      targets: DistributionTarget[],
    ) =>
      this.request<{ success: boolean }>(
        `/v1/media/project/${encodeURIComponent(projectId)}/distribution`,
        {
          method: 'POST',
          body: JSON.stringify({ targets }),
        },
      ),

    publish: (projectId: string) =>
      this.request<{ status: string; publishDate: string }>(
        `/v1/media/project/${encodeURIComponent(projectId)}/publish`,
        {
          method: 'POST',
        },
      ),

    // Legacy compatibility
    dispatch: (payload: unknown) =>
      this.request(
        '/v1/media/dispatch',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        },
      ),

    getLatestJob: () =>
      this.request('/v1/media/job'),
  };
}
