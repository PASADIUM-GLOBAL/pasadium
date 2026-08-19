import {
  BrandOSClient,
  type BrandOSClientConfig,
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
  config: BrandOSClientConfig,
): BrandOSClient => {
  client = new BrandOSClient(config);
  return client;
};

export const createSovereignClient = (
  token: string,
  baseUrl = '',
): BrandOSClient => {
  return new BrandOSClient({
    baseUrl,
    getToken: () => token,
  });
};

const requireClient = (): BrandOSClient => {
  if (!client) {
    throw new Error('BRANDOS_NOT_INITIALIZED');
  }

  return client;
};

export const BrandOS = {
  get security() {
    return requireClient().security;
  },

  get intelligence() {
    return requireClient().intelligence;
  },

  get commerce() {
    return requireClient().commerce;
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
};

export { BrandOSClient };
export type { BrandOSClientConfig };
export * from './contracts';
