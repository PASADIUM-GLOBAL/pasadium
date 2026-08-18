import React from 'react';
import { Cpu, Activity } from 'lucide-react';

export const WorkerOrchestrator = () => {
  return (
    <div className="flex flex-col h-full font-mono">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Cpu className="text-white" size={18} />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/90">Engine_Runtimes</h3>
        </div>
        <Activity size={14} className="text-green-500 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <WorkerCard engine="MEDIAVERSE_RENDERER" status="BUSY" jobs={12} load="84%" />
        <WorkerCard engine="SECVERSE_ANOMALY_DETECTOR" status="IDLE" jobs={0} load="4%" />
        <WorkerCard engine="BRIDGE_OS_ORDER_ROUTER" status="NOMINAL" jobs={4} load="22%" />
        <WorkerCard engine="MEMORY_OS_VECTOR_SYNC" status="NOMINAL" jobs={1} load="14%" />
      </div>
    </div>
  );
};

const WorkerCard = ({ engine, status, jobs, load }: any) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-lg flex items-center justify-between">
    <div>
      <div className="text-[10px] font-bold text-white/80 mb-1">{engine}</div>
      <div className="text-[9px] text-white/30 uppercase tracking-tighter">Jobs_In_Queue: {jobs}</div>
    </div>
    <div className="text-right">
       <div className={`text-[10px] font-bold ${status === 'BUSY' ? 'text-yellow-500' : 'text-green-500'}`}>{status}</div>
       <div className="text-[9px] font-mono text-white/20">LOAD: {load}</div>
    </div>
  </div>
);
