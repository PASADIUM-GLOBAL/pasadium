import React from 'react';
import { Globe, Activity, Ship, Truck } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

export const SupplyChainMatrix = () => {
  return (
    <div className="flex flex-col h-full">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1" style={{ color: BRAND_COLORS.accent.blue }}>
          <Globe size={16} />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Sourcing_Core</span>
        </div}
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Supply_Chain</h2>
      </header>

      <div className="space-y-8 flex-1">
        <LogisticsNode label="Wholesale_Bridge" status="ACTIVE" detail="Alibaba_Cloud_API" icon={<Activity size={14} style={{ color: BRAND_COLORS.status.success }} />} />
        <LogisticsNode label="Consumer_Bridge" status="ACTIVE" detail="AliExpress_v4" icon={<Activity size={14} style={{ color: BRAND_COLORS.status.success }} />} />
        <div className="h-[1px] w-full" style={{ backgroundColor: BRAND_COLORS.border.subtle }} />
        <LogisticsNode label="Freight_Transit" status="IN_ROUTE" detail="Vessel: MARSK_ALPHA" icon={<Ship size={14} style={{ color: BRAND_COLORS.accent.blue }} />} />
        <LogisticsNode label="Last_Mile" status="PENDING" detail="Hub: Singapore_04" icon={<Truck size={14} style={{ color: BRAND_COLORS.border.normal }} />} />
      </div>

      <div className="mt-auto p-4 rounded-2xl border" 
           style={{ backgroundColor: 'rgba(0, 123, 255, 0.05)', borderColor: 'rgba(0, 123, 255, 0.1)' }}>
         <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase block mb-2 font-bold">Network_Integrity</span>
         <div className="flex gap-1.5">
           {Array.from({length: 12}).map((_, i) => (
             <div key={i} className="flex-1 h-1.5 rounded-full animate-pulse" 
                  style={{ backgroundColor: 'rgba(0, 123, 255, 0.2)', animationDelay: `${i * 0.1}s` }} />
           ))}
         </div>
      </div>
    </div>
  );
};

const LogisticsNode = ({ label, status, detail, icon }: any) => (
  <div className="group cursor-default">
    <div className="flex justify-between items-center mb-1">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-[9px] font-mono font-bold ${status === 'ACTIVE' || status === 'IN_ROUTE' ? 'text-cyan-400' : 'text-white/20'}`}>{status}</span>
    </div>
    <div className="text-[10px] font-mono text-white/30 pl-7">{detail}</div>
  </div>
);
