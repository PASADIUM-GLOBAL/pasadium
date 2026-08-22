import React, { useEffect } from 'react';
import { Globe, Activity, Loader2 } from 'lucide-react';
import { useMarket } from '../hooks/useMarket';

export const SupplyChainMatrix = () => {
  const { logistics, fetchLogistics } = useMarket();

  useEffect(() => {
    fetchLogistics();
  }, [fetchLogistics]);

  if (!logistics) return (
    <div className="h-full w-full flex items-center justify-center text-white/10 font-mono animate-pulse uppercase text-[9px]">
      <Loader2 className="animate-spin mr-2" size={14} /> Syncing_Logistics_Matrix...
    </div>
  );

  return (
    <div className="flex flex-col h-full select-none">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-blue-400 mb-1">
          <Globe size={16} />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Sourcing_Core</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Supply_Chain</h2>
      </header>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {logistics.nodes.map((node) => (
          <div key={node.id} className="group cursor-default">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-3">
                <Activity size={14} className={node.status === 'ACTIVE' ? 'text-green-500' : 'text-blue-400'} />
                <span className="text-[11px] font-bold text-white/80 uppercase tracking-widest group-hover:text-white transition-colors">
                  {node.label}
                </span>
              </div>
              <span className={`text-[9px] font-mono font-bold ${
                node.status === 'ACTIVE' ? 'text-green-400' : 
                node.status === 'TRANSIT' ? 'text-cyan-400' : 'text-white/20'
              }`}>
                {node.status}
              </span>
            </div>
            <div className="text-[10px] font-mono text-white/30 pl-7">{node.detail}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
         <div className="flex justify-between items-end mb-2">
            <span className="text-[9px] font-mono text-blue-400 tracking-widest uppercase font-bold">Network_Integrity</span>
            <span className="text-[10px] font-mono text-white/40">{(logistics.globalIntegrity * 100).toFixed(0)}%</span>
         </div>
         <div className="flex gap-1.5">
           {Array.from({length: 12}).map((_, i) => (
             <div 
               key={i} 
               className={`flex-1 h-1.5 rounded-full transition-all duration-700 ${
                 i < (logistics.globalIntegrity * 12) ? 'bg-blue-500/40 shadow-[0_0_8px_rgba(59,130,246,0.3)]' : 'bg-white/5'
               }`} 
             />
           ))}
         </div>
      </div>
    </div>
  );
};
