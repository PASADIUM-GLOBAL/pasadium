import React from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { InventoryItem } from '@pasadium/bridge/src/contracts/market';

interface Props {
  items: InventoryItem[];
  onItemClick?: (name: string) => void;
}

export const InventoryGrid = ({ items, onItemClick }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold tracking-tight uppercase">Corporate_Inventory</h3>
        <button className="text-[10px] font-mono text-cyan-500 flex items-center gap-1 hover:underline">
          <ExternalLink size={10} /> SHOPIFY_SYNC_DASHBOARD
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div 
            key={i} 
            onClick={() => onItemClick?.(item.name)}
            className="group p-4 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                item.type === 'DIGITAL' ? 'bg-cyan-500/20 text-cyan-400' : 
                item.type === 'SERVICE' ? 'bg-violet-500/20 text-violet-400' : 
                'bg-orange-500/20 text-orange-400'
              }`}>
                {item.type}
              </div>
              <ShoppingCart size={14} className="text-white/20 group-hover:text-cyan-400 transition-colors" />
            </div>
            <h4 className="text-xs font-bold text-white/80 group-hover:text-white mb-1 transition-colors">{item.name}</h4>
            <div className="flex justify-between items-center">
              <span className="text-lg font-mono font-bold tracking-tighter">{item.price}</span>
              <span className="text-[9px] font-mono text-white/30">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
