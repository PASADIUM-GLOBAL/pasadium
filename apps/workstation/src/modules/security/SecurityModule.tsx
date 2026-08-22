import React from 'react';
import { useSecurity } from './hooks/useSecurity';
import { IntegrityControl } from './components/IntegrityControl';
import { SentinelMap } from './components/SentinelMap';
import { MaintenanceLogs } from './components/MaintenanceLogs';
import { AuroraPulse } from '@pasadium/ui';

export const SecurityModule = () => {
  const { integrity, fetchIntegrity } = useSecurity();

  // We use the integrity state from the hook for the visual aurora
  const auroraColor = integrity?.posture === 'BREACH' ? '#FF2C2C' : 
                     integrity?.posture === 'ADAPTIVE' ? '#FACC15' : '#00D9FF';
  const auroraIntensity = integrity?.posture === 'LOCKED' ? 0.4 : 1.2;

  return (
    <div className="h-full w-full grid grid-cols-12 gap-5 relative">
      <AuroraPulse 
        intensity={auroraIntensity} 
        color={auroraColor} 
      />
      
      {/* LEFT: System Health & UHI */}
      <div className="col-span-4 flex flex-col gap-5">
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-6 relative overflow-hidden backdrop-blur-md">
          <AuroraPulse opacity={0.1} color={auroraColor} />
          <IntegrityControl />
        </div>
      </div>

      {/* CENTER: Sentinel Visualizer (The SECVERSE Facade) */}
      <div className="col-span-5 flex flex-col gap-5">
        <div className="flex-1 bg-black/20 border border-white/5 rounded-xl p-6 relative overflow-hidden">
          <SentinelMap />
        </div>
      </div>

      {/* RIGHT: Audit & Ledger History (SVRN-WAL) */}
      <div className="col-span-3 flex flex-col gap-5">
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-6 backdrop-blur-md overflow-hidden flex flex-col">
          <MaintenanceLogs />
        </div>
      </div>
    </div>
  );
};
