import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';

export const MaintenanceLogs = ({ events }: { events: any[] }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <History className="text-white/40" size={16} />
        <h3 className="text-xs font-bold tracking-tight uppercase opacity-60">SVRN_WAL_LOGS</h3>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
        {events && events.length > 0 ? (
          events.map((event, i) => (
            <div key={event.id || i} className={`border-l-2 pl-4 py-1 ${
              event.status === 'Blocked' ? 'border-red-500' : 'border-cyan-500'
            }`}>
              <div className="flex justify-between items-start mb-1">
                <span className="text-[9px] font-mono text-white/20">{event.time}</span>
                <CheckCircle2 size={10} className={event.status === 'Blocked' ? 'text-red-500/50' : 'text-green-500/50'} />
              </div>
              <div className="text-[10px] font-mono text-white/70 uppercase tracking-tighter">
                {event.type}
              </div>
              <span className={`text-[8px] font-bold uppercase tracking-widest ${
                event.status === 'Blocked' ? 'text-red-400' : 'text-cyan-400'
              }`}>{event.status}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-[10px] font-mono text-white/20 uppercase">No_Events_Recorded</div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 text-center">
        <button className="text-[9px] font-mono text-white/30 hover:text-white uppercase tracking-widest transition-colors">
          Download_Full_Audit_Report
        </button>
      </div>
    </div>
  );
};
