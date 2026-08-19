import React from 'react';
import { Calculator, ShoppingCart, Gavel, ShieldCheck } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

export const MarginCalculator = () => {
  return (
    <div className="bg-[#0A0C12]/80 border backdrop-blur-3xl rounded-[40px] p-8 h-full flex flex-col shadow-2xl relative overflow-hidden" 
         style={{ borderColor: BRAND_COLORS.border.subtle }}>
      <div className="absolute top-0 left-0 w-full h-1 opacity-50" 
           style={{ backgroundColor: `linear-gradient(to right, transparent, ${BRAND_COLORS.status.success}, transparent)` }} />
      
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1" style={{ color: BRAND_COLORS.status.success }}>
          <Calculator size={18} />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Economic_Logic</span>
        </div}
        <h3 className="text-xl font-bold tracking-tight text-white uppercase">Margin_Engine</h3>
      </header>

      <div className="space-y-6 flex-1">
        <div className="p-6 rounded-3xl space-y-5 shadow-inner border" 
             style={{ backgroundColor: 'black', borderColor: BRAND_COLORS.border.normal }}>
          <PricingRow label="Sourcing_Cost" value="$142.20" />
          <PricingRow label="Import_Tariffs" value="$12.50" />
          <PricingRow label="Bridge_OS_Fee" value="$4.00" />
          <div className="h-[1px] w-full" style={{ backgroundColor: BRAND_COLORS.border.subtle }} />
          <PricingRow label="Target_Margin" value="35%" color={BRAND_COLORS.status.success} />
          
          <div className="pt-4 flex justify-between items-center">
             <div className="space-y-1">
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Recommended_List</span>
                <div className="text-3xl font-mono font-bold text-white tracking-tighter">$238.54</div>
             </div>
             <button className="p-4 rounded-2xl transition-all shadow-lg" 
                     style={{ backgroundColor: BRAND_COLORS.text.primary, color: BRAND_COLORS.text.inverse }}>
                <ShoppingCart size={20} />
             </button>
          </div>
        </div>

        <div className="space-y-4 px-2">
           <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
             <Gavel size={12} /> Sovereignty_Overrides
           </div>
           <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl text-[10px] font-mono text-white/60 border" 
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: BRAND_COLORS.border.subtle }}>
                DYNAMIC_MARKUP: ON
              </span>
              <span className="px-3 py-1.5 rounded-xl text-[10px] font-mono text-white/60 border" 
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: BRAND_COLORS.border.subtle }}>
                FX_HEDGE: ACTIVE
              </span>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t flex items-start gap-3" style={{ borderColor: BRAND_COLORS.border.subtle }}>
         <ShieldCheck className="text-cyan-500 shrink-0" size={16} />
         <p className="text-[10px] text-white/30 font-light leading-relaxed">
           Financial algorithms are being processed by <span className="text-white/60">AELORA_DECISION_ENGINE</span>. Prices updated every 60s.
         </p>
      </div>
    </div>
  );
};

const PricingRow = ({ label, value, color = "rgba(255,255,255,0.6)" }: any) => (
  <div className="flex justify-between items-center font-mono">
    <span className="text-[10px] text-white/20 uppercase tracking-tighter">{label}</span>
    <span className="text-xs font-bold" style={{ color }}>{value}</span>
  </div>
);
