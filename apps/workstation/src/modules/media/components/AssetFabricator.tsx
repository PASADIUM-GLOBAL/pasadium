
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { BrandOS } from '@pasadium/bridge';
import type { ProductionAsset } from '@pasadium/bridge';

export interface MediaJob {
  id: string;
  status: ProductionAsset['status'];
  progress: number;
  type?: ProductionAsset['type'];
  projectId?: string;
}

export const AssetFabricator = () => {
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: number | undefined;

    const syncJob = async () => {
      try {
        const res = await BrandOS.media.getLatestJob();
        setJob(res);
      } catch (e) {
        console.error('MEDIA_JOB_SYNC_FAILED', e);
      } finally {
        setLoading(false);
      }

      timer = window.setTimeout(syncJob, 2000);
    };

    syncJob();

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const stages = [
    { label: "Script_Synthesizer", id: 0 },
    { label: "Voice_Clone_Generation", id: 1 },
    { label: "Visual_Remix_Engine", id: 2 },
    { label: "Motion_Graphic_Overlay", id: 3 }
  ];

  if (loading) return <div className="p-4 text-white/20 font-mono text-[10px] animate-pulse">SYNCHRONIZING_FABRICATOR...</div>;
  if (!job) return <div className="p-4 text-white/20 font-mono text-[10px]">NO_ACTIVE_JOBS</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-8">
        <Layers className="text-violet-400" size={18} />
        <h3 className="text-sm font-bold tracking-tight uppercase">Asset_Fabricator</h3>
      </div>

      <div className="space-y-6">
        {stages.map((s) => {
          const isComplete = job.stage > s.id || job.status === 'COMPLETED';
          const isProcessing = job.stage === s.id && job.status === 'PROCESSING';
          
          return (
            <PipelineStep 
              key={s.id}
              label={s.label}
              status={isComplete ? 'COMPLETE' : isProcessing ? 'PROCESSING' : 'QUEUED'}
              progress={isComplete ? 100 : isProcessing ? job.progress : 0}
            />
          );
        })}
      </div>

      {/* Live Preview Facade */}
      <div className="mt-auto h-48 bg-black border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <span className="text-[10px] font-mono text-white/40 z-20 group-hover:text-cyan-400 transition-colors cursor-pointer">
          CLICK_TO_PREVIEW_DRAFT_v0.4
        </span>
        <div className="absolute top-3 left-3 z-20 flex gap-1">
           <div className="w-1 h-1 bg-red-500 animate-pulse rounded-full" />
           <span className="text-[8px] font-mono text-red-500">LIVE_RENDER</span>
        </div>
      </div>
    </div>
  );
};

const PipelineStep = ({ label, status, progress }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-[10px] font-mono">
      <span className="text-white/60 tracking-wider uppercase">{label}</span>
      <span className={status === 'COMPLETE' ? 'text-green-400' : status === 'PROCESSING' ? 'text-cyan-400' : 'text-white/20'}>
        {status}
      </span>
    </div>
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className={`h-full ${status === 'COMPLETE' ? 'bg-green-500' : 'bg-cyan-500 shadow-[0_0_10px_#00D9FF]'}`}
      />
    </div>
  </div>
);
