import React from 'react';
import { Check, X, ExternalLink } from 'lucide-react';

export const SovereignVerification = () => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-6">Verification_Required</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-yellow-500/60 uppercase">Order_ID: #B_8824</span>
            <span className="text-xs font-bold text-white">$14,200.00</span>
          </div>
          <p className="text-[10px] text-white/50 font-mono italic leading-tight">
            Asset: "Nvidia_H100_Nodes" <br />
            Source: Alibaba_Global_Procurement
          </p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-green-500/20 text-green-400 border border-green-500/20 rounded text-[9px] font-bold flex items-center justify-center gap-1 hover:bg-green-500/40">
              <Check size={12} /> VERIFY_SVRN
            </button>
            <button className="p-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded hover:bg-red-500/40">
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
