import React from 'react';
import { Truck, Ship, Package, AlertCircle } from 'lucide-react';
import { SupplyChainNode } from '@pasadium/bridge/src/contracts/market';

interface Props {
  nodes: SupplyChainNode[];
}

export const SupplyChainMatrix = ({ nodes }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-8">
        <Truck className="text-blue-400" size={18} />
        <h3 className="text-sm font-bold tracking-tight uppercase">Supply_Chain_Matrix</h3>
      </div>

      <div className="space-y-6">
        {nodes.map((node, i) => (
          <LogisticsNode 
            key={i}
            label={node.label} 
            status={node.status} 
            detail={node.detail} 
            icon={node.label.includes('Bridge') ? <Package size={14}/> : <Ship size={14}/>} 
          />
        ))}
        <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
           <div className="flex items-center gap-2 text-[9px] text-yellow-500 font-bold mb-2">
             <AlertCircle size={10} /> RFQ_PENDING_APPROVAL
           </div>
           <p className="text-[10px] text-white/50 leading-relaxed font-mono">
             Batch_Order for 'Nvidia_H100_Nodes' awaits sovereign verification in ADMIN_MATRIX.
           </p>
        </div>
      </div>

      <div className="mt-auto border-t border-white/5 pt-4">
        <span className="text-[9px] font-mono text-white/20 block mb-2 uppercase">Network_Integrity</span>
        <div className="flex gap-1">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-blue-500/40 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LogisticsNode = ({ label, status, detail, icon }: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center text-[10px] font-mono">
      <div className="flex items-center gap-2 text-white/60">
        {icon}
        <span className="uppercase tracking-wider">{label}</span>
      </div>
      <span className={status === 'ACTIVE' ? 'text-green-400' : 'text-blue-400'}>{status}</span>
    </div>
    <span className="text-[9px] text-white/20 pl-6">{detail}</span>
  </div>
);
