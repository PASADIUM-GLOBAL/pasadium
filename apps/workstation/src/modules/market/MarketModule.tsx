import React, { useState } from 'react';
import { SupplyChainMatrix } from './components/SupplyChainMatrix';
import { InventoryGrid } from './components/InventoryGrid';
import { MarginCalculator } from './components/MarginCalculator';
import { AuroraPulse } from '@pasadium/ui';
import { useMarket } from './hooks/useMarket';

export const MarketModule = () => {
  const { supplyChain, inventory, margin, loading, calculateProductMargin } = useMarket();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleProductClick = async (name: string) => {
    setSelectedProduct(name);
    await calculateProductMargin(name);
  };

  if (loading) return <div className="h-full w-full flex items-center justify-center text-white/20 font-mono text-xs">SYNCING_MARKET_HUB...</div>;

  return (
    <div className="h-full w-full grid grid-cols-12 gap-5">
      {/* LEFT: Sourcing & Logistics (Shadow Facade) */}
      <div className="col-span-3 flex flex-col gap-5">
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-6 relative overflow-hidden backdrop-blur-md">
          <AuroraPulse opacity={0.05} color="#1677FF" />
          <SupplyChainMatrix nodes={supplyChain} />
        </div>
      </div>

      {/* CENTER: Inventory & Services */}
      <div className="col-span-6 flex flex-col gap-5">
        <div className="flex-1 bg-black/20 border border-white/5 rounded-xl p-6 overflow-y-auto custom-scrollbar">
          <InventoryGrid 
            items={inventory} 
            onItemClick={handleProductClick} 
          />
        </div>
      </div>

      {/* RIGHT: Financial Logic (Margin Engine) */}
      <div className="col-span-3 flex flex-col gap-5">
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-6 backdrop-blur-md">
          <MarginCalculator calculation={margin} />
        </div>
      </div>
    </div>
  );
};
