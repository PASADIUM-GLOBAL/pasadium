import React, { useEffect } from 'react';
import { useMedia } from '../hooks/useMedia';
import { Play, Camera, X, MessageSquare, Globe2, Loader2 } from 'lucide-react';

const ICON_MAP = {
  YOUTUBE: <Play size={16} />,
  INSTAGRAM: <Camera size={16} />,
  X: <X size={16} />,
  DISCORD: <MessageSquare size={16} />,
};

const COLOR_MAP = {
  YOUTUBE: 'text-red-500',
  INSTAGRAM: 'text-pink-500',
  X: 'text-slate-400',
  DISCORD: 'text-indigo-400',
};

export const OmnichannelMatrix = () => {
  const { network, fetchNetwork } = useMedia();

  useEffect(() => {
    fetchNetwork();
  }, [fetchNetwork]);

  if (!network) return (
    <div className="p-10 animate-pulse text-white/10 font-mono text-[9px] uppercase">
      Mapping_Distribution_Nodes...
    </div>
  );

  return (
    <div className="flex flex-col h-full select-none">
      <div className="flex items-center gap-3 mb-10">
        <Globe2 className="text-blue-500" size={20} />
        <h3 className="text-[11px] font-bold tracking-[0.4em] text-white uppercase">Global_Reach</h3>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {network.targets.map((target) => (
          <div key={target.id} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-2xl group cursor-pointer hover:border-white/10 transition-all shadow-lg">
            <div className="flex items-center gap-4">
              <div className={`${COLOR_MAP[target.platform as keyof typeof COLOR_MAP]} opacity-60 group-hover:opacity-100 transition-opacity`}>
                {ICON_MAP[target.platform as keyof typeof ICON_MAP]}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white/70 group-hover:text-white transition-colors">{target.label}</span>
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-tighter">Reach: {target.reachProjection.toLocaleString()}</span>
              </div>
            </div>
            <span className={`text-[9px] font-mono group-hover:text-cyan-400 transition-colors uppercase tracking-widest ${
              target.status === 'LOCKED' ? 'text-white/5' : 'text-white/20'
            }`}>
              {target.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto p-6 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-1 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            Total_Reach_Projection
          </div>
          <div className="text-2xl font-bold text-white tracking-tighter">
            {network.totalReach.toLocaleString()}+ 
            <span className="text-[10px] font-mono text-green-500 font-normal ml-2">IMPRESSIONS</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] pointer-events-none" />
      </div>
    </div>
  );
};
