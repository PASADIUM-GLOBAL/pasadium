import {
  createBrandOSClient,
  type BrandOSClient,
  type TokenProvider,
} from './client';

let client: BrandOSClient | null = null;

export type {
  MediaProject,
  NarrativeRequest,
  NarrativeResult,
  StoryboardScene,
  ProductionAsset,
  DistributionTarget,
} from './contracts/media';

export type {
  MarketData,
  MarketIntelligence,
  OrderRequest,
  OrderIntent,
  OrderPreview,
  OrderResult,
} from './contracts/trade';

export type {
  SecurityState,
  AuditLog,
} from './contracts/security';

export const initializeBrandOS = (
  config: { baseUrl: string; getToken: TokenProvider },
): BrandOSClient => {
  client = createBrandOSClient(config.baseUrl, config.getToken);
  return client;
};

const requireClient = (): BrandOSClient => {
  if (!client) {
    throw new Error('BRANDOS_NOT_INITIALIZED');
  }

  return client;
};

export const BrandOS = {
  get auth() {
    return requireClient().auth;
  },
  get security() {
    return requireClient().security;
  },
  get intelligence() {
    // Mapping legacy intelligence to the new auth/domain structure if needed
    // For now, we keep the property for compatibility
    return {
      analyzeTrend: async (request: any) => {
        throw new Error('Intelligence domain consolidated into Trade/Security');
      }
    };
  },
  get commerce() {
    // Mapping legacy commerce to market/trade
    return {
      initiateSwap: async (request: any) => {
        throw new Error('Commerce consolidated into Trade');
      }
    };
  },
  get trade() {
    return requireClient().trade;
  },
  get market() {
    return requireClient().market;
  },
  get media() {
    return requireClient().media;
  },
  get admin() {
    return requireClient().admin;
  },
};

export { createBrandOSClient, BrandOSClient };
export type { TokenProvider };
export * from './contracts/admin';
export * from './contracts/market';
export * from './contracts/media';
export * from './contracts/security';
export * from './contracts/trade';
