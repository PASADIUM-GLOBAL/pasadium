import React from 'react';
import { RawSecverseLogs } from './components/RawSecverseLogs';
import { WorkerOrchestrator } from './components/WorkerOrchestrator';
import { SovereignVerification } from './components/SovereignVerification';
import { AuroraPulse } from '@pasadium/ui';

export const AdminMatrix = () => {
  return (
    <div className="h-full w-full grid grid-cols-12 gap-5 relative">
      {/* Sovereign Visual: Darker, tighter pulse */}
      <AuroraPulse opacity={0.15} color="#C52CFF" intensity={2} />

      {/* LEFT: Raw Secverse Stream */}
      <div className="col-span-4 flex flex-col gap-5">
        <div className="flex-1 bg-black/60 border border-magenta-500/20 rounded-xl p-6 backdrop-blur-xl">
          <RawSecverseLogs />
        </div>
      </div>

      {/* CENTER: Worker Node Status (MediaVerse/BridgeOS) */}
      <div className="col-span-5 flex flex-col gap-5">
        <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-6">
          <WorkerOrchestrator />
        </div>
        <div className="h-48 bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
           <h4 className="text-[10px] font-mono text-cyan-500 uppercase mb-4">Kernel_Authority_Context</h4>
           <div className="text-[10px] font-mono text-white/40 space-y-1">
             <div>SVRN_ID: 0xPA_SOVEREIGN_MAIN</div>
             <div>AUTH_LEVEL: LEVEL_10_ROOT</div>
             <div>ENCRYPTION: ED25519_ACTIVE</div>
           </div>
        </div>
      </div>

      {/* RIGHT: Sovereign Verification (Market Overrides) */}
      <div className="col-span-3 flex flex-col gap-5">
        <div className="flex-1 bg-black/60 border border-yellow-500/20 rounded-xl p-6 backdrop-blur-xl">
          <SovereignVerification />
        </div>
      </div>
    </div>
  );
};
