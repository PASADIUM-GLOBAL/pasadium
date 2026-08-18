import { useState, useEffect } from 'react';
import { BrandOS } from '@pasadium/bridge';
import { SupplyChainNode, InventoryItem, MarginCalculation } from '@pasadium/bridge/src/contracts/market';

export function useMarket() {
  const [supplyChain, setSupplyChain] = useState<SupplyChainNode[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [margin, setMargin] = useState<MarginCalculation | null>(null);
  const [loading, setLoading] = useState(true);

  async function syncMarketData() {
    setLoading(true);
    try {
      const [sc, inv] = await Promise.all([
        BrandOS.market.getSupplyChainStatus(),
        BrandOS.market.getInventory()
      ]);
      setSupplyChain(sc);
      setInventory(inv);
    } catch (e) {
      console.error("Market data sync failed", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    syncMarketData();
  }, []);

  async function calculateProductMargin(productId: string) {
    try {
      const res = await BrandOS.market.calculateMargin(productId);
      setMargin(res);
      return res;
    } catch (e) {
      console.error("Margin calculation failed", e);
      throw e;
    }
  }

  return {
    supplyChain,
    inventory,
    margin,
    loading,
    syncMarketData,
    calculateProductMargin
  };
}
