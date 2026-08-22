import React from 'react';
import type { AdminLog } from '@pasadium/bridge';

interface RawSecverseLogsProps {
  logs: AdminLog[];
}

export const RawSecverseLogs = ({
  logs,
}: RawSecverseLogsProps) => {
  if (logs.length === 0) {
    return (
      <div className="p-6 text-[9px] font-mono text-white/20 uppercase">
        No_Security_Events
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto font-mono">
      {logs.map((log) => (
        <div
          key={log.id}
          className="border-b border-white/5 px-4 py-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-white/30">
              {log.timestamp}
            </span>

            <span className="text-[9px] text-cyan-400">
              {log.level}
            </span>
          </div>

          <div className="mt-1 text-[10px] text-white/40">
            [{log.source}] {log.message}
          </div>
        </div>
      ))}
    </div>
  );
};
