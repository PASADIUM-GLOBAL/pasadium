import { useState, useEffect } from 'react';
import { BrandOS } from '@pasadium/bridge';
import { MarketData, MarketIntelligence, OrderRequest, OrderPreview, OrderIntent, OrderResult } from '@pasadium/bridge/src/contracts/trade';

export function useOrderBook(instrument: string) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await BrandOS.trade.getOrderBook(instrument);
        setData(res);
      } catch (e) {
        console.error("OrderBook sync failed", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [instrument]);

  return { data, loading };
}

export function useMarketIntelligence(instrument: string) {
  const [intel, setIntel] = useState<MarketIntelligence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await BrandOS.trade.getIntelligence(instrument);
        setIntel(res);
      } catch (e) {
        console.error("Intel sync failed", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [instrument]);

  return { intel, loading };
}

export function useOrderExecution() {
  const [status, setStatus] = useState<'IDLE' | 'PREVIEWING' | 'EXECUTING' | 'FILLED' | 'ERROR'>('IDLE');
  const [preview, setPreview] = useState<OrderPreview | null>(null);
  const [result, setResult] = useState<OrderResult | null>(null);

  async function previewOrder(request: OrderRequest) {
    setStatus('PREVIEWING');
    try {
      const res = await BrandOS.trade.previewOrder(request);
      setPreview(res);
      setStatus('IDLE');
      return res;
    } catch (e) {
      setStatus('ERROR');
      throw e;
    }
  }

  async function executeOrder(intent: OrderIntent) {
    setStatus('EXECUTING');
    try {
      const res = await BrandOS.trade.executeOrder(intent);
      setResult(res);
      setStatus('FILLED');
      return res;
    } catch (e) {
      setStatus('ERROR');
      throw e;
    }
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setStatus('IDLE');
  }

  return {
    status,
    preview,
    result,
    previewOrder,
    executeOrder,
    reset
  };
}
