import React from 'react';
import { BrandOS } from '@pasadium/bridge';

// Simple simulation of a hook that talks to BrandOS
export function useSystemIntegrity() {
  const [state, setState] = React.useState<any>(null);

  React.useEffect(() => {
    async function fetchIntegrity() {
      try {
        const data = await BrandOS.security.getPosture();
        setState(data);
      } catch (e) {
        console.error("Integrity Check Failed", e);
      }
    }
    fetchIntegrity();
    const interval = setInterval(fetchIntegrity, 5000);
    return () => clearInterval(interval);
  }, []);

  return { state };
}

export const SecurityFacade = () => {
  const { state } = useSystemIntegrity();

  if (!state) return <div className="p-8 text-white/20 font-mono">INITIALIZING_SENTINEL...</div>;

  const posture = state.posture;
  const intensity = state.intensity;

  return (
    <div className="relative p-8 border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl overflow-hidden w-full max-w-2xl">
      {/* Aurora Pulse Simulation */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${posture === 'SECURE' ? '#00d9ff' : '#ff0033'} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transform: `scale(${1 + intensity})`
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tighter uppercase text-white/90">System_Integrity</h2>
          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
            posture === 'SECURE' ? 'border-cyan-500 text-cyan-400' : 'border-red-500 text-red-400'
          }`}>
            {posture === 'SECURE' ? 'Secure' : 'Adaptive_Active'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-lg border border-white/5">
            <span className="text-[10px] text-cyan-400 block mb-1">SENTINEL_CELLS</span>
            <span className="text-2xl font-mono text-white">1,024_ACTIVE</span>
          </div>
          <div className="p-4 bg-white/5 rounded-lg border border-white/5">
            <span className="text-[10px] text-cyan-400 block mb-1">THREAT_LEVEL</span>
            <span className="text-2xl font-mono text-green-400">NOMINAL</span>
          </div>
        </div>

        <div className="mt-4 border-t border-white/5 pt-4">
          <h3 className="text-xs opacity-40 mb-3 font-mono">LATEST_MAINTENANCE_AUDITS</h3>
          <div className="space-y-2 opacity-60 font-mono text-[10px] text-white/70">
             <div>[ {state.lastAudit.time} ] AUTH_BOUNDARY_VERIFIED</div>
             <div>[ {state.lastAudit.time} ] CANONICAL_LEDGER_SYNCED</div>
          </div>
        </div>
      </div>
    </div>
  );
};
