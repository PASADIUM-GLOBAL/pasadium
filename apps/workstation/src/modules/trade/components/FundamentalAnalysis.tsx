import React, { useEffect, useState } from 'react';
import { BrainCircuit, Info, Target } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';
import { useTrade } from '../hooks/useTrade';

export const FundamentalAnalysis = () => {
  const { getIntelligence } = useTrade();
  const [intel, setIntel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const data = await getIntelligence('BTC/USD');
        setIntel(data);
      } catch (e) {
        console.error("Intel fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchIntel();
  }, [getIntelligence]);

  if (loading) return <div className="h-full w-full flex items-center justify-center text-white/20 font-mono text-xs">SYNCING_INTELLIGENCE...</div>;

  return (
    <div className="relative z-10 flex flex-col h-full">
      <header className="flex justify-between items-start mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <BrainCircuit size={18} />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Intelligence_Core</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Market_Synthesis</h2>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-white/40">
          <Info size={16} />
        </button>
      </header>

      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-8">
          <MetricBlock label="Global_Sentiment" value={intel?.sentiment || '---'} status={intel?.confidence || '0%'} sub={intel?.observation || 'Analyzing...'} />
          <MetricBlock label="Capital_Concentration" value={intel?.institutionalFlow || '---'} status="BULL" sub="Whale_Cluster_Detected" />
        </div>

        <div className="bg-black/20 rounded-[32px] border border-white/5 p-6 flex flex-col justify-between">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-violet-400 font-mono text-[10px] tracking-widest uppercase">
               <Target size={12}/> Executive_Summary
             </div>
             <p className="text-sm text-white/50 font-light leading-relaxed">
               {intel?.observation || "No intelligence available for current instrument."}
             </p>
          </div>
          <div className="pt-6 border-t border-white/5 flex justify-between items-center">
             <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Confidence_Level</span>
             <span className="text-xs font-bold text-green-400 font-mono">HIGH_PROBABILITY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricBlock = ({ label, value, status, sub }: any) => (
  <div className="space-y-1 group cursor-default">
    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] group-hover:text-cyan-500/50 transition-colors">{label}</span>
    <div className="flex items-baseline gap-3">
      <span className="text-2xl font-bold text-white tracking-tighter uppercase">{value}</span>
      <span className="text-sm font-bold text-cyan-400 font-mono">{status}</span>
    </div>
    <div className="text-[10px] text-white/30 font-light tracking-wide">{sub}</div>
  </div>
);
