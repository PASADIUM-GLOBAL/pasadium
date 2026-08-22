import React, { useEffect } from 'react';
import { ShieldCheck, Activity, Database, Lock } from 'lucide-react';
import { useSecurity } from '../hooks/useSecurity';

export const IntegrityControl = () => {
  const { integrity, fetchIntegrity } = useSecurity();

  useEffect(() => {
    fetchIntegrity();
    const interval = setInterval(fetchIntegrity, 10000);
    return () => clearInterval(interval);
  }, [fetchIntegrity]);

  if (!integrity) return <div className="p-10 animate-pulse text-white/10 uppercase font-mono">Syncing_UHI...</div>;

  return (
    <div className="relative z-10 flex flex-col h-full">
      <header className="mb-8">
        <span className="text-[10px] font-bold tracking-[0.4em] text-cyan-400 uppercase">Integrity_Monitor</span>
      </header>

      <div className="space-y-8">
        <div className="text-center p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
          <div className="text-5xl font-mono font-bold text-white tracking-tighter">
            {integrity.uhi}<span className="text-xl text-cyan-500/40">%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatMini label="Kernel_State" value={integrity.posture} color="text-green-400" />
          <StatMini label="Mem_Integrity" value={integrity.metrics.memoryIntegrity} color="text-cyan-400" />
          <StatMini label="Uptime" value={integrity.metrics.uptime} color="text-white/60" />
          <StatMini label="Threats" value={integrity.metrics.standardAnomalies} color="text-red-400" />
        </div>
      </div>
    </div>
  );
};

const StatMini = ({ label, value, color }: any) => (
  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
    <div className="flex items-center gap-2 text-[8px] text-white/30 uppercase font-mono mb-1">
      {label}
    </div>
    <div className={`text-xs font-bold font-mono ${color}`}>{value}</div>
  </div>
);
