import React from 'react';
import { useSecurity } from '../hooks/useSecurity';

export const MaintenanceLogs = () => {
  const { integrity } = useSecurity();

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase mb-8">Maintenance_Audits</h3>
      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
        {integrity?.recentLogs && integrity.recentLogs.length > 0 ? (
          integrity.recentLogs.map((log: any) => (
            <div key={log.id} className="border-l border-white/10 pl-4 py-1 hover:border-cyan-500 transition-colors">
              <div className="flex justify-between text-[9px] font-mono text-white/20">
                <span>{log.time}</span>
                <span className="text-cyan-400/50">{log.status}</span>
              </div>
              <div className="text-[10px] font-mono text-white/70 uppercase truncate">{log.type}</div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-[10px] font-mono text-white/20 uppercase">No_Events_Recorded</div>
        )}
      </div>
    </div>
  );
};
