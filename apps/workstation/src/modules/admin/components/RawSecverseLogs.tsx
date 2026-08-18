import React from 'react';
import { Terminal, ShieldAlert } from 'lucide-react';

export const RawSecverseLogs = () => {
  return (
    <div className="flex flex-col h-full font-mono">
      <div className="flex items-center gap-2 mb-6 border-b border-magenta-500/20 pb-4">
        <ShieldAlert className="text-magenta-500" size={18} />
        <h3 className="text-xs font-bold text-magenta-500 uppercase tracking-widest">SECVERSE_RAW_INGEST</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 text-[10px]">
        <LogLine time="14:44:02" node="NODE_ALPHA" msg="INGRESS_BLOCK: IP_192.168.1.44 (Reason: Brute_Force)" color="text-red-400" />
        <LogLine time="14:43:55" node="KERNEL" msg="POLICIES_SYCHRONIZED: 14 Rules Active" color="text-cyan-400" />
        <LogLine time="14:42:12" node="BRIDGE.OS" msg="ENCLAVE_HANDSHAKE: Successful" color="text-green-400" />
        <LogLine time="14:40:01" node="AUTH" msg="JWT_ROTATION_TRIGGERED: All Nodes" color="text-white/40" />
      </div>
    </div>
  );
};

const LogLine = ({ time, node, msg, color }: any) => (
  <div className="flex gap-3 hover:bg-white/5 p-1 rounded transition-colors">
    <span className="text-white/20">[{time}]</span>
    <span className="text-magenta-500/60 font-bold">[{node}]</span>
    <span className={color}>{msg}</span>
  </div>
);
