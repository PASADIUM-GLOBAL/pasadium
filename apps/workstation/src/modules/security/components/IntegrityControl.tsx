import React, { useEffect, useState } from 'react';
import { ShieldCheck, Activity, Database, Lock } from 'lucide-react';
import { BrandOS } from '@pasadium/bridge';

export const IntegrityControl = ({ data: integrity }: { data: any }) => {
  if (!integrity) return <div className="p-4 text-white/20 font-mono text-[10px]">SYNC_ERROR</div>;

  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-8">
        <ShieldCheck className="text-cyan-400" size={18} />
        <h3 className="text-sm font-bold tracking-tight uppercase">System_Integrity_Monitor</h3>
      </div>

      <div className="space-y-8">
        {/* Universal Health Index */}
        <div className="text-center p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
          <span className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.2em] block mb-2">Universal_Health_Index</span>
          <div className="text-5xl font-mono font-bold text-white tracking-tighter">
            {integrity.uhi}<span className="text-xl text-cyan-500/40">%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatMini label="Kernel_State" value={integrity.posture} icon={<Lock size={12}/>} color="text-green-400" />
          <StatMini label="Mem_Integrity" value="VERIFIED" icon={<Database size={12}/>} color="text-cyan-400" />
          <StatMini label="Uptime" value="14d 6h" icon={<Activity size={12}/>} color="text-white/60" />
          <StatMini label="Active_Nodes" value={integrity.metrics.sentinels_deployed.toLocaleString()} icon={<ShieldCheck size={12}/>} color="text-white/60" />
        </div>

        <div className="mt-auto p-4 bg-white/5 rounded-lg border border-white/5">
          <h4 className="text-[9px] font-bold text-white/40 uppercase mb-3 tracking-widest">Global_Posture</h4>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono ${integrity.posture === 'LOCKED' ? 'text-green-400' : 'text-yellow-400'}`}>
              STATUS: {integrity.posture}
            </span>
            <div className="flex gap-1">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i} className={`w-4 h-1 rounded-full ${integrity.posture === 'LOCKED' ? 'bg-green-500/40' : 'bg-yellow-500/40'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatMini = ({ label, value, icon, color }: any) => (
  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
    <div className="flex items-center gap-2 text-[8px] text-white/30 uppercase font-mono mb-1">
      {icon} {label}
    </div>
    <div className={`text-xs font-bold font-mono ${color}`}>{value}</div>
  </div>
);
