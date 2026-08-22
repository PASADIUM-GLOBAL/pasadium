import { useState, useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import type { MarginBreakdown, LogisticsStatus } from '@pasadium/bridge';

export const useMarket = () => {
  const { bridge } = useAuth();
  const [inventory, setInventory] = useState<any[]>([]);
  const [marginData, setMarginData] = useState<MarginBreakdown | null>(null);
  const [logistics, setLogistics] = useState<LogisticsStatus | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bridge.market.getInventory();
      setInventory(data);
    } finally {
      setLoading(false);
    }
  }, [bridge]);

  const fetchMargin = async (productId: string) => {
    try {
      const data = await bridge.market.calculateMargin(productId);
      setMarginData(data);
    } catch (err) {
      console.error("MARGIN_CALC_FAILURE:", err);
    }
  };

  const fetchLogistics = async () => {
    try {
      const data = await bridge.market.getLogistics();
      setLogistics(data);
    } catch (err) {
      console.error("LOGISTICS_SYNC_FAILURE:", err);
    }
  };

  const purchase = async (id: string) => {
    try {
      await bridge.market.purchase(id);
      await fetchInventory(); // Auto-refresh truth
    } catch (err) {
      console.error("Purchase failed:", err);
      throw err;
    }
  };

  return { inventory, marginData, logistics, loading, fetchInventory, purchase, fetchMargin, fetchLogistics };
};
