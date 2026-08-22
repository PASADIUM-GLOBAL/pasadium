import type {
  MarketData,
  MarketIntelligence,
  OrderRequest,
  OrderIntent,
  OrderPreview,
  OrderResult,
} from './contracts/trade';
import type { MarginBreakdown, LogisticsStatus } from './contracts/market';
import type { MediaJob, DistributionNetwork } from './contracts/media';
import type {
  AdminLog,
  AdminSnapshot,
  AdminStats,
  AdminVerification,
  AdminWorker,
} from './contracts/admin';

export type TokenProvider = () => string | null | undefined;

const createConductiveFetch = (baseUrl: string, getToken: TokenProvider) => {
  return async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const token = getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    };

    const response = await fetch(`${baseUrl}${path}`, { ...options, headers });
    if (!response.ok) throw new Error(`SVRN_HTTP_${response.status}`);
    const result = await response.json();
    return result.data !== undefined ? result.data : result;
  };
};

export const createBrandOSClient = (baseUrl: string, getToken: TokenProvider) => {
  const request = createConductiveFetch(baseUrl, getToken);

  return {
    auth: {
      login: (body: any) => request<any>('/v1/auth/login', { method: 'POST', body: JSON.stringify(body) }),
      me: () => request<any>('/v1/auth/me'),
    },
    trade: {
      getTickers: () => request<any[]>('/v1/trade/tickers'),
      getIntelligence: (instrument: string) => 
        request<MarketIntelligence>(`/v1/trade/intelligence?instrument=${encodeURIComponent(instrument)}`),
      getOrderBook: (instrument: string) => 
        request<MarketData>(`/v1/trade/orderbook?instrument=${encodeURIComponent(instrument)}`),
      execute: (order: OrderIntent) => request<OrderResult>('/v1/trade/execute', { method: 'POST', body: JSON.stringify(order) }),
    },
    media: {
      dispatch: (prompt: string) => 
        request<MediaJob>('/v1/media/dispatch', { method: 'POST', body: JSON.stringify({ prompt }) }),
      getJobStatus: (id: string) => request<MediaJob>(`/v1/media/jobs/${id}`),
      getDistribution: () => 
        request<DistributionNetwork>('/v1/media/distribution'),
    },
    market: {
      getInventory: () => request<any[]>('/v1/market/inventory'),
      calculateMargin: (productId: string) => 
        request<MarginBreakdown>('/v1/market/margin', { method: 'POST', body: JSON.stringify({ productId }) }),
      getLogistics: () => 
        request<LogisticsStatus>('/v1/market/logistics'),
      purchase: (id: string) => request<any>('/v1/market/purchase', { method: 'POST', body: JSON.stringify({ id }) }),
    },
    security: {
      getIntegrity: () => request<any>('/v1/security/integrity'),
      getPosture: () => request<any>('/v1/security/posture'),
      requestMaintenance: (action: string) => 
        request<any>('/v1/security/maintenance', { method: 'POST', body: JSON.stringify({ action }) }),
    },
    admin: {
      getSnapshot: () => request<AdminSnapshot>('/v1/admin/snapshot'),
      getStats: () => request<AdminStats>('/v1/admin/stats'),
      getWorkers: () => request<AdminWorker[]>('/v1/admin/workers'),
      getLogs: () => request<AdminLog[]>('/v1/admin/logs'),
      getVerification: () => request<AdminVerification | null>('/v1/admin/verification'),
    }
  };
};

export type BrandOSClient = ReturnType<typeof createBrandOSClient>;
