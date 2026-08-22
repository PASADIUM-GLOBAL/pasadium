import { useState, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';

export const useTrade = () => {
  const { bridge } = useAuth();
  const [tickers, setTickers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTickers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bridge.trade.getTickers();
      setTickers(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, [bridge]);

  const getOrderBook = async (instrument: string) => {
    return await bridge.trade.getOrderBook(instrument);
  };

  const getIntelligence = async (instrument: string) => {
    return await bridge.trade.getIntelligence(instrument);
  };

  const placeOrder = async (params: any) => {
    return await bridge.trade.execute(params);
  };

  return { tickers, loading, fetchTickers, getOrderBook, getIntelligence, placeOrder };
};
