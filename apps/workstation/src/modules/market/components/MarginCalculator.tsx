import React from 'react';
import { Calculator, Percent, ShieldCheck } from 'lucide-react';
import { MarginCalculation } from '@pasadium/bridge/src/contracts/market';

interface Props {
  calculation: MarginCalculation | null;
}

export const MarginCalculator = ({ calculation }: Props) => {
  if (!calculation) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <Calculator className="text-white/10 mb-4" size={32} />
        <p className="text-[10px] font-mono text-white/30 uppercase">Select product to calculate margin</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-green-400" size={18} />
        <h3 className="text-sm font-bold tracking-tight uppercase">Economic_Margin_Engine</h3>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-black border border-white/10 rounded-lg space-y-4">
          <CalculatorRow label="Sourcing_Cost" value={calculation.sourcingCost} />
          <CalculatorRow label="Import_Tariffs" value={calculation.tariffs} />
          <CalculatorRow label="Shipping_Freight" value={calculation.shipping} />
          <div className="h-[1px] bg-white/10 w-full" />
          <CalculatorRow label="Target_Profit" value={calculation.targetProfit} color="text-green-400" />
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">FINAL_LIST_PRICE</span>
            <span className="text-xl font-mono font-bold">{calculation.finalPrice}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[9px] text-white/30 uppercase font-mono tracking-widest">
            <Percent size={12} /> Auto_Pricing_Rules
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/50">SMART_MARKUP_ON</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/50">CURRENCY_HEDGE: ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg flex items-center gap-3">
        <ShieldCheck className="text-cyan-400 shrink-0" size={18} />
        <p className="text-[10px] text-cyan-400/80 font-mono leading-tight">
          List prices are synchronized with Bridge.OS exchange rates every 60 seconds.
        </p>
      </div>
    </div>
  );
};

const CalculatorRow = ({ label, value, color = "text-white/60" }: any) => (
  <div className="flex justify-between items-center text-[10px] font-mono">
    <span className="text-white/30 uppercase tracking-tighter">{label}</span>
    <span className={color}>{value}</span>
  </div>
);
