import { BrandOSClient, BrandOSClientConfig } from './client';

let client: BrandOSClient | null = null;

export const initializeBrandOS = (
  config: BrandOSClientConfig
) => {
  client = new BrandOSClient(config);
};

const requireClient = () => {
  if (!client) {
    throw new Error('BRANDOS_NOT_INITIALIZED');
  }
  return client;
};

export const BrandOS = {
  trade: {
    getMarketState: () =>
      requireClient().getTradeTickers(),
    getOrderBook: (instrument: string) =>
      requireClient().getOrderBook(instrument),
    execute: (params: { ticker: string; amount: number; side: 'BUY' | 'SELL' }) =>
      requireClient().executeOrder(params),
  },

  security: {
    getIntegrity: () =>
      requireClient().getSecurityIntegrity(),
  },

  media: {
    dispatch: (payload: unknown) =>
      requireClient().dispatchMedia(payload),
    getLatestJob: () =>
      requireClient().getLatestJob(),
  },
};
