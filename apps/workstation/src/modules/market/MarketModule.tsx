import React from 'react';
import { motion } from 'framer-motion';
import { SupplyChainMatrix } from './components/SupplyChainMatrix';
import { InventoryGrid } from './components/InventoryGrid';
import { MarginCalculator } from './components/MarginCalculator';
import { BRAND_COLORS } from '@pasadium/config';

export const MarketModule = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="h-full w-full grid grid-cols-12 gap-8 p-2"
    >
      {/* 1. LOGISTICS STRATUM: Sourcing Bridge */}
      <div className="col-span-3 rounded-[40px] p-8 shadow-2xl relative overflow-hidden border" 
           style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: BRAND_COLORS.border.subtle }}>
        <div className="absolute top-0 right-0 w-32 h-32 blur-[80px] pointer-events-none opacity-20" 
             style={{ backgroundColor: BRAND_COLORS.accent.blue }} />
        <SupplyChainMatrix />
      </div>

      {/* 2. ASSET STRATUM: Inventory & Services */}
      <div className="col-span-6 rounded-[40px] p-8 overflow-hidden flex flex-col border" 
           style={{ backgroundColor: 'rgba(255,255,255,0.01)', borderColor: BRAND_COLORS.border.subtle }}>
        <InventoryGrid />
      </div>

      {/* 3. ECONOMIC STRATUM: Margin Engine */}
      <div className="col-span-3">
        <MarginCalculator />
      </div>
    </motion.div>
  );
};
