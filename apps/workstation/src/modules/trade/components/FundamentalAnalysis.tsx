import React from 'react';
import { BrainCircuit, Activity } from 'lucide-react';
import { useMarketIntelligence } from '../hooks/useTrade';

export const FundamentalAnalysis = () => {
  const { intel, loading } = useMarketIntelligence('BTC-USD');

  if (loading || !intel) return <div className="p-4 text-white/20 font-mono text-[10px]">ANALYZING_SHADOW_PLANE...</div>;

  return (
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <BrainCircuit className="text-cyan-400" size={18} />
        <h3 className="text-sm font-bold tracking-tight uppercase">Market_Intelligence</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <AnalysisMetric label="Sentiment_Score" value={intel.sentiment} trend="+2.4%" color="text-green-400" />
          <AnalysisMetric label="Social_Volume" value="High" trend="Expanding" color="text-cyan-400" />
          <AnalysisMetric label="Institutional_Flow" value={intel.institutionalFlow} trend="Strong" color="text-green-400" />
        </div>
        
        <div className="p-4 bg-white/5 border border-white/5 rounded-lg flex flex-col gap-2">
           <div className="flex items-center gap-2 text-[9px] text-cyan-500 font-bold">
             <Activity size={10} /> SENTINEL_OBSERVATION
           </div>
           <p className="text-[11px] text-white/60 leading-relaxed italic">
             {intel.observation}
           </p>
        </div>
      </div>
    </div>
  );
};

const AnalysisMetric = ({ label, value, trend, color }: any) => (
  <div className="border-l-2 border-white/10 pl-4">
    <span className="text-[9px] text-white/30 uppercase block mb-1">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold tracking-tighter">{value}</span>
      <span className={`text-[10px] font-mono ${color}`}>{trend}</span>
    </div>
  </div>
);
