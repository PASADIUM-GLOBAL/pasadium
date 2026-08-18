export interface BrandOSClientConfig {
  baseUrl: string;
  getToken: () => string | null;
}

export class BrandOSClient {
  constructor(private config: BrandOSClientConfig) {}

  private async request<T>(
    path: string,
    options: RequestInit = {}
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
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(
        body.error || `BRANDOS_REQUEST_FAILED_${response.status}`
      );
    }

    return response.json();
  }

  async getTradeTickers() {
    return this.request('/v1/trade/tickers');
  }

  async getOrderBook(instrument: string) {
    return this.request(`/v1/trade/orderbook/${instrument}`);
  }

  async getSecurityIntegrity() {
    return this.request('/v1/security/integrity');
  }

  async dispatchMedia(payload: unknown) {
    return this.request('/v1/media/dispatch', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async executeOrder(params: { ticker: string; amount: number; side: 'BUY' | 'SELL' }) {
    return this.request('/v1/trade/execute', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  async getLatestJob() {
    return this.request('/v1/media/job');
  }
}
