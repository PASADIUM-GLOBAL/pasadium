import React, { useEffect } from 'react';
import { Calculator, ShieldCheck, Loader2 } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';

export const MarginCalculator = () => {
  const { marginData, fetchMargin } = useMarket();

  useEffect(() => {
    fetchMargin('h100-node');
  }, [fetchMargin]);

  if (!marginData) return (
    <div className="h-full w-full flex items-center justify-center text-white/10 font-mono animate-pulse uppercase text-[9px]">
      <Loader2 className="animate-spin mr-2" size={14} /> Syncing_Economic_Logic...
    </div>
  );

  return (
    <div className="bg-[#0A0C12]/80 border border-white/5 backdrop-blur-3xl rounded-[40px] p-8 h-full flex flex-col shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
      
      <header className="mb-8">
        <div className="flex items-center gap-2 text-green-400 mb-1">
          <Calculator size={18} />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Economic_Logic</span>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white uppercase">Margin_Engine</h3>
      </header>

      <div className="space-y-6 flex-1">
        <div className="p-6 bg-black border border-white/10 rounded-3xl space-y-5 shadow-inner">
          <PricingRow label="Sourcing_Cost" value={`$${marginData.sourcingCost.toLocaleString()}`} />
          <PricingRow label="Import_Tariffs" value={`$${marginData.importTariffs.toLocaleString()}`} />
          <PricingRow label="Bridge_OS_Fee" value={`$${marginData.platformFee.toLocaleString()}`} />
          <div className="h-[1px] bg-white/5 w-full" />
          <PricingRow label="Target_Margin" value={`${marginData.markupPercentage}%`} color="text-green-400" />
          
          <div className="pt-4 flex flex-col gap-1">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Recommended_List_Price</span>
            <div className="text-3xl font-mono font-bold text-white tracking-tighter">
              ${marginData.finalListPrice.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4 px-2">
           <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
             Sovereignty_Overrides
           </div>
           <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1.5 border rounded-xl text-[10px] font-mono transition-colors ${
                marginData.isDynamicMarkup ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-white/5 text-white/60 border-white/10'
              }`}>
                DYNAMIC_MARKUP: {marginData.isDynamicMarkup ? 'ON' : 'OFF'}
              </span>
              <span className={`px-3 py-1.5 border rounded-xl text-[10px] font-mono transition-colors ${
                marginData.isHedged ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-white/5 text-white/60 border-white/10'
              }`}>
                FX_HEDGE: {marginData.isHedged ? 'ACTIVE' : 'IDLE'}
              </span>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5 flex items-start gap-3 opacity-40">
         <ShieldCheck className="text-cyan-500 shrink-0" size={16} />
         <p className="text-[9px] text-white font-light leading-tight uppercase font-mono">
           SIMULATION_MODE • ECONOMIC_POLICY_ENGINE
         </p>
      </div>
    </div>
  );
};

const PricingRow = ({ label, value, color = "text-white/60" }: any) => (
  <div className="flex justify-between items-center font-mono">
    <span className="text-[10px] text-white/20 uppercase tracking-tighter">{label}</span>
    <span className={`text-xs font-bold ${color}`}>{value}</span>
  </div>
);
