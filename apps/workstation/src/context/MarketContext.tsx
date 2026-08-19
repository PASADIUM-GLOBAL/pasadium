import React, { createContext, useContext, useState, useEffect } from 'react';

export interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

export interface OrderBookSnapshot {
  symbol: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  timestamp: number;
}

interface MarketState {
  symbol: string;
  price: number;
  change: number;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  connectionState: 'connected' | 'connecting' | 'degraded' | 'disconnected';
}

const MarketContext = createContext<MarketState | undefined>(undefined);

export const MarketDataProvider: React.FC<{ symbol: string, children: React.ReactNode }> = ({ symbol, children }) => {
  const [state, setState] = useState<MarketState>({
    symbol,
    price: 64208.40,
    change: 1.82,
    bids: [],
    asks: [],
    connectionState: 'connecting',
  });

  useEffect(() => {
    // Simulate websocket connection
    const timer = setTimeout(() => {
      setState(prev => ({
        ...prev,
        connectionState: 'connected',
        bids: Array.from({ length: 20 }, (_, i) => ({
          price: 64208.40 - (i * 0.5),
          quantity: Math.random() * 2,
          total: Math.random() * 10,
        })),
        asks: Array.from({ length: 20 }, (_, i) => ({
          price: 64208.40 + (i * 0.5),
          quantity: Math.random() * 2,
          total: Math.random() * 10,
        })),
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [symbol]);

  return <MarketContext.Provider value={state}>{children}</MarketContext.Provider>;
};

export const useMarketData = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarketData must be used within MarketDataProvider');
  return context;
};
