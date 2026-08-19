import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRealtime } from '../../../context/RealtimeContext';
import { BRAND_COLORS } from '@pasadium/config';

export const AssetFabricator = () => {
  const { user } = useAuth();
  const { subscribe } = useRealtime();
  const [currentJob, setCurrentJob] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribe('MEDIA_JOB_PROGRESS', (data: any) => {
      if (data.actor.userId === user.id) {
        setCurrentJob(data.payload);
      }
    });

    return () => unsubscribe();
  }, [user, subscribe]);

  const stages = [
    { label: "Script_Synthesizer", id: 0 },
    { label: "Voice_Clone_Generation", id: 1 },
    { label: "Visual_Remix_Engine", id: 2 },
    { label: "Motion_Graphic_Overlay", id: 3 }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase">Production_Forge</h3>
        {currentJob?.status === 'PROCESSING' && (
          <span className="text-[9px] font-mono text-cyan-400 animate-pulse uppercase tracking-widest">
            {currentJob.currentTask}...
          </span>
        )}
      </div>

      <div className="space-y-10 flex-1">
        {stages.map((s) => {
          const isComplete = currentJob?.status === 'COMPLETED' || currentJob?.stage > s.id;
          const isCurrent = currentJob?.stage === s.id && currentJob?.status !== 'COMPLETED';

          return (
            <PipelineStep 
              key={s.id}
              label={s.label}
              status={isComplete ? 'SYNCED' : isCurrent ? 'PROCESSING' : 'QUEUED'}
              progress={isComplete ? 100 : isCurrent ? currentJob.progress : 0}
              color={isComplete ? BRAND_COLORS.status.success : isCurrent ? BRAND_COLORS.accent.cyan : BRAND_COLORS.border.subtle}
            />
          );
        })}
      </div>

      <div className="mt-8 aspect-video bg-black/60 rounded-[32px] border flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer shadow-2xl"
           style={{ borderColor: BRAND_COLORS.border.subtle }}>
         <div className="absolute top-4 left-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]" />
            <span className="text-[9px] font-mono text-red-500 tracking-widest uppercase">Live_Render_Buffer</span>
         </div>
         <span className="text-[11px] font-bold tracking-[0.2em] text-white/30 group-hover:text-cyan-400 transition-colors">INITIALIZE_PREVIEW</span>
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

const PipelineStep = ({ label, status, progress, color }: any) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[10px] font-mono px-1">
      <span className="text-white/60 tracking-[0.2em] uppercase">{label}</span>
      <span className="font-bold" style={{ color: progress > 0 ? color : 'rgba(255,255,255,0.1)' }}>
        {status}
      </span>
    </div>
    <div className="h-1.5 rounded-full overflow-hidden border" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: BRAND_COLORS.border.subtle }}>
      <div 
        className="h-full transition-all duration-1000 ease-out" 
        style={{ 
          width: `${progress}%`, 
          backgroundColor: color,
          boxShadow: progress > 0 && progress < 100 ? `0 0 15px ${color}` : 'none'
        }} 
      />
    </div>
  </div>
);
