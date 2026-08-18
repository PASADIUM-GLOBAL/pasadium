import React from 'react';
import { motion } from 'framer-motion';
import { Radar, ScanSearch } from 'lucide-react';
import { useSecurity } from '../hooks/useSecurity';

export const SentinelMap = () => {
  const { integrity } = useSecurity();

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Radar className="text-violet-400" size={18} />
          <h3 className="text-sm font-bold tracking-tight uppercase">Sentinel_Cell_Network</h3>
        </div>
        <span className="text-[9px] font-mono text-violet-400/50 flex items-center gap-1">
          <ScanSearch size={10} /> SCANNING_ACTIVE
        </span>
      </div>

      {/* The Visual Facade of SECVERSE Defense */}
      <div className="flex-1 bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #6B35FF 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>
        
        {/* Animated Sentinel Cells */}
        <div className="relative w-64 h-64">
           {Array.from({length: 12}).map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-2 h-2 bg-cyan-400 rounded-full"
               initial={{ 
                 x: Math.random() * 200 - 100, 
                 y: Math.random() * 200 - 100,
                 opacity: 0.2 
               }}
               animate={{ 
                 opacity: [0.2, 0.8, 0.2],
                 scale: [1, 1.5, 1],
                 filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
               }}
               transition={{ 
                 duration: 2 + Math.random() * 2, 
                 repeat: Infinity,
                 delay: Math.random() * 2
               }}
               style={{ 
                 boxShadow: '0 0 10px #00D9FF',
                 left: '50%',
                 top: '50%'
               }}
             />
           ))}
           <div className="absolute inset-0 border border-violet-500/20 rounded-full animate-ping" />
           <div className="absolute inset-4 border border-cyan-500/10 rounded-full animate-pulse" />
        </div>

        <div className="absolute bottom-4 left-4">
           <div className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">
             Threat_Detection_Sensitivity: <span className="text-cyan-400">High</span>
           </div>
        </div>
      </div>
    </div>
  );
};
