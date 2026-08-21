import React from 'react';
import { Play, Camera, Radio, MessageSquare, Globe2 } from 'lucide-react';
import { BRAND_COLORS } from '@pasadium/config';

export const OmnichannelMatrix = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-10">
        <Globe2 className="text-blue-500" size={20} />
        <h3 className="text-[11px] font-bold tracking-[0.4em] text-white uppercase">Global_Reach</h3>
      </div>

      <div className="space-y-4">
        <PlatformItem icon={<Play size={16} />} name="YouTube_Main" status="READY" color="#EF4444" />
        <PlatformItem icon={<Camera size={16} />} name="IG_Corporate" status="LOCKED" color="#EC4899" />
        <PlatformItem icon={<Radio size={16} />} name="X_Sentinel" status="READY" color="#94A3B8" />
        <PlatformItem icon={<MessageSquare size={16} />} name="Discord_Auth" status="AUTO" color="#6366F1" />
      </div>

      <div className="mt-auto p-6 rounded-3xl border" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: BRAND_COLORS.border.subtle }}>
        <div className="flex justify-between items-center mb-1 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          Engagement_Target
        </div>
        <div className="text-2xl font-bold text-white tracking-tighter">
          250,000+ <span className="text-[10px] font-mono text-green-400 font-normal">IMPRESSIONS</span>
        </div>
        <button className="w-full mt-6 py-4 rounded-2xl text-[10px] font-bold text-white/50 tracking-[0.2em] transition-all uppercase" 
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: BRAND_COLORS.border.normal, border: '1px solid' }}>
          Config_Distribution
        </button>
      </div>
    </div>
  );
};

const PlatformItem = ({ icon, name, status, color }: any) => (
  <div className="flex items-center justify-between p-4 rounded-2xl group cursor-pointer transition-all shadow-lg border border-transparent hover:border-white/10" 
       style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
    <div className="flex items-center gap-4">
      <div className="opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: color }}>{icon}</div>
      <span className="text-xs font-bold text-white/70 group-hover:text-white transition-colors">{name}</span>
    </div>
    <span className="text-[9px] font-mono text-white/10 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{status}</span>
  </div>
);
