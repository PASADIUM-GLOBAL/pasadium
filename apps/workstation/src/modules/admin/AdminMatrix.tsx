import React from 'react';
import { AuroraPulse } from '@pasadium/ui';
import { useAdmin } from './hooks/useAdmin';
import { RawSecverseLogs } from './components/RawSecverseLogs';
import { WorkerOrchestrator } from './components/WorkerOrchestrator';
import { SovereignVerification } from './components/SovereignVerification';

export const AdminMatrix = () => {
  const {
    stats,
    workers,
    logs,
    verification,
    loading,
    error,
    refresh,
  } = useAdmin();

  if (loading && !stats) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="animate-pulse font-mono text-[10px] text-white/20">
          SYNCHRONIZING_ROOT_AUTHORITY...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <span className="font-mono text-[10px] text-red-400">
          ADMIN_SYNC_FAILURE
        </span>

        <button
          onClick={() => void refresh()}
          className="text-[9px] font-mono text-cyan-400"
        >
          RETRY_CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-12 gap-6 relative">
      <AuroraPulse opacity={0.15} color="#C52CFF" intensity={2} />

      <section className="col-span-7">
        <WorkerOrchestrator workers={workers} />
      </section>

      <section className="col-span-5">
        <SovereignVerification
          verification={verification}
        />
      </section>

      <section className="col-span-12">
        <RawSecverseLogs logs={logs} />
      </section>
    </div>
  );
};
