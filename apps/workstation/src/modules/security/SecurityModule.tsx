import React, { useEffect, useState } from 'react';
import { BrandOS } from '@pasadium/bridge';
import { IntegrityControl } from './components/IntegrityControl';
import { SentinelMap } from './components/SentinelMap';
import { MaintenanceLogs } from './components/MaintenanceLogs';
import { AuroraPulse } from '@pasadium/ui';

export const SecurityModule = () => {
  const [uhiData, setUhiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: number | undefined;

    const syncSecurity = async () => {
      try {
        const result = await BrandOS.security.getSystemIntegrity();
        setUhiData(result);
      } catch (e) {
        console.error('SECURITY_SYNC_FAILED', e);
      } finally {
        setLoading(false);
      }

      timer = window.setTimeout(syncSecurity, 5000);
    };

    syncSecurity();

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  if (loading) {
    return <div className="h-full w-full flex items-center justify-center font-mono text-xs text-white/20 animate-pulse">SYNCHRONIZING_SECVERSE_STATE...</div>;
  }

  const auroraColor = uhiData?.posture === 'BREACH' ? '#FF2C2C' : 
                     uhiData?.posture === 'ADAPTIVE' ? '#FACC15' : '#00D9FF';
  const auroraIntensity = uhiData?.posture === 'LOCKED' ? 0.4 : 1.2;

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
          <IntegrityControl data={uhiData} />
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
          <MaintenanceLogs events={uhiData?.recent_events || []} />
        </div>
      </div>
    </div>
  );
};
