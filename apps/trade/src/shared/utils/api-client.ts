export const API_CONFIG = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  authBaseUrl: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000',
};

export class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pasadium_token', token);
    }
  }

  getToken() {
    if (this.token) return this.token;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('pasadium_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pasadium_token');
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_CONFIG.apiBaseUrl}${endpoint}`;
    const headers = new Headers(options.headers);
    
    const token = this.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      this.clearToken();
      // In a real app, redirect to login
      window.location.href = '/login';
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  get<T>(endpoint: string, options?: RequestInit) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body: any, options?: RequestInit) {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: JSON.stringify(body) 
    });
  }
}

export const apiClient = new ApiClient();
