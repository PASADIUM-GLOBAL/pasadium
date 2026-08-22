import React, { useEffect } from 'react';
import { PackageSearch, ArrowUpRight } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';
import { useMarket } from '../hooks/useMarket';

export const InventoryGrid = () => {
  const { inventory, fetchInventory, purchase } = useMarket();

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between items-center mb-10">
        <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase font-mono">Asset_Inventory</h3>
        <button className="text-[10px] font-mono text-cyan-400 hover:text-white transition-colors flex items-center gap-2 tracking-widest">
           <PackageSearch size={14}/> GLOBAL_SEARCH
        </button>
      </header>

      <div className="grid grid-cols-2 gap-6 overflow-y-auto pr-2 custom-scrollbar">
        {inventory.map((asset, i) => (
          <div key={asset.id || i} onClick={() => purchase(asset.id)} className="group p-6 rounded-3xl transition-all duration-500 cursor-pointer shadow-xl border border-transparent hover:border-cyan-500/40"
               style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderColor: BRAND_COLORS.border.subtle }}>
             <div className="flex justify-between items-start mb-6">
                <div className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-white/40 uppercase tracking-widest border" 
                     style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: BRAND_COLORS.border.subtle }}>
                  {asset.type || 'Unknown'}
                </div>
                <div className="p-2 rounded-xl text-white/20 group-hover:text-cyan-400 transition-colors">
                   <ArrowUpRight size={16} />
                </div>
             </div>
             <h4 className="text-lg font-bold text-white mb-1 tracking-tight group-hover:text-cyan-100 transition-colors">{asset.name}</h4>
             <div className="flex justify-between items-end">
                <div className="text-2xl font-mono font-bold text-white tracking-tighter">{asset.price}</div>
                <div className="text-[9px] font-mono text-white/20 uppercase pb-1 tracking-widest">{asset.description || 'Standard'}</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
