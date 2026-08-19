import React from 'react';
import { BRAND_COLORS } from '@pasadium/config';

export const ModuleBento = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Trade Cockpit - Large Feature */}
      <div className="col-span-2 h-[400px] bg-white/5 border border-white/5 rounded-[40px] p-10 relative overflow-hidden group hover:border-cyan-500/30 transition-all cursor-pointer">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all" />
        <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">Trade_Cockpit</h3>
        <p className="text-white/40 max-w-sm font-light leading-relaxed">
          High-density execution terminal for MT5, FX, and Crypto liquidity. 
          Linguistically authorized, Shadow-Plane enforced.
        </p>
        <div className="absolute bottom-10 left-10 text-cyan-400 font-mono text-xs tracking-widest uppercase">
          Enter_Environment →
        </div>
      </div>

      {/* Security Facade - Medium Feature */}
      <div className="col-span-1 h-[400px] bg-[#0A0C12] border border-white/5 rounded-[40px] p-10 flex flex-col justify-between hover:border-violet-500/30 transition-all cursor-pointer">
        <div>
          <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">Security_Facade</h3>
          <p className="text-sm text-white/30 font-light">Real-time UHI monitoring and sentinel cell synchronization.</p>
        </div>
        <div className="w-full h-32 bg-white/5 rounded-2xl border border-white/5 animate-pulse flex items-center justify-center">
           <span className="text-[10px] font-mono text-white/10 tracking-widest">ANALYZING_VECTORS...</span>
        </div>
      </div>

      {/* Media Studio - Medium Feature */}
      <div className="col-span-1 h-[400px] bg-white/5 border border-white/5 rounded-[40px] p-10 relative overflow-hidden group hover:border-magenta-500/30 transition-all cursor-pointer">
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-magenta-500/10 blur-[60px] group-hover:bg-magenta-500/20 transition-all" />
        <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">Media_Forge</h3>
        <p className="text-sm text-white/30 font-light">Neural-driven content fabrication and omnichannel distribution.</p>
        <div className="absolute bottom-10 left-10 text-magenta-400 font-mono text-xs tracking-widest uppercase">
          Initialize_Render →
        </div>
      </div>

      {/* Market Hub - Large Feature */}
      <div className="col-span-2 h-[400px] bg-white/5 border border-white/5 rounded-[40px] p-10 relative overflow-hidden group hover:border-blue-500/30 transition-all cursor-pointer">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all" />
        <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">Market_Hub</h3>
        <p className="text-white/40 max-w-sm font-light leading-relaxed">
          Commercial intelligence surface for global sourcing and margin optimization.
        </p>
        <div className="absolute bottom-10 left-10 text-blue-400 font-mono text-xs tracking-widest uppercase">
          Open_Inventory →
        </div>
      </div>
    </div>
  );
};
