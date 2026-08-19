import React from 'react';
import { motion } from 'framer-motion';
import { OrderBook } from './components/OrderBook';
import { FundamentalAnalysis } from './components/FundamentalAnalysis';
import { ExecutionTerminal } from './components/ExecutionTerminal';

export const TradeModule = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="h-full w-full grid grid-cols-12 gap-6 p-2"
    >
      {/* 1. DATA STRATUM: Order Book */}
      <div className="col-span-3 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
        <OrderBook />
      </div>

      {/* 2. INTELLIGENCE STRATUM: Analysis */}
      <div className="col-span-6 flex flex-col gap-6">
        <div className="flex-1 bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[40px] p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] pointer-events-none" />
          <FundamentalAnalysis />
        </div>
        
        {/* Market Depth Visualizer Facade */}
        <div className="h-56 bg-black/40 border border-white/5 backdrop-blur-md rounded-[32px] p-6">
          <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">Market_Depth_Sync</span>
             <span className="text-[9px] font-mono text-white/20">SOURCE: BRIDGE.OS_v2</span>
          </div>
          <div className="w-full h-full flex items-end gap-1 opacity-40">
             {Array.from({length: 40}).map((_, i) => (
               <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm" style={{ height: `${Math.random() * 80 + 10}%` }} />
             ))}
          </div>
        </div>
      </div>

      {/* 3. AUTHORITY STRATUM: Execution */}
      <div className="col-span-3">
        <ExecutionTerminal />
      </div>
    </motion.div>
  );
};
