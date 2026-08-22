import React from 'react';
import type { AdminWorker } from '@pasadium/bridge';

interface WorkerOrchestratorProps {
  workers: AdminWorker[];
}

export const WorkerOrchestrator = ({
  workers,
}: WorkerOrchestratorProps) => {
  return (
    <div className="space-y-3">
      {workers.map((worker) => (
        <div
          key={worker.id}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase text-white/80">
                {worker.name}
              </div>

              <div className="text-[9px] font-mono text-white/20">
                {worker.id}
              </div>
            </div>

            <span className="text-[9px] font-mono text-cyan-400">
              {worker.status}
            </span>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-[9px] font-mono">
              <span className="text-white/20">ENGINE_LOAD</span>
              <span className="text-white/50">
                {worker.load.toFixed(0)}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-cyan-500/40 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, worker.load)
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
