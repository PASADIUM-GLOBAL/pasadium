import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Globe, Cpu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const AssetFabricator = () => {
  const { bridge } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [job, setJob] = useState<any>(null);
  const [status, setStatus] = useState<'IDLE' | 'FABRICATING' | 'COMPLETE' | 'ERROR'>('IDLE');
  const TERMINAL_STATES = ['COMPLETED', 'FAILED', 'CANCELLED'];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (job?.id && !TERMINAL_STATES.includes(job.status)) {
      interval = setInterval(async () => {
        try {
          const currentStatus = await bridge.media.getJobStatus(job.id);
          setJob(currentStatus);
          
          if (TERMINAL_STATES.includes(currentStatus.status)) {
            setStatus(currentStatus.status === 'COMPLETED' ? 'COMPLETE' : 'ERROR');
            clearInterval(interval);
          }
        } catch (err) {
          console.error("POLLING_FAILURE:", err);
          setStatus('ERROR');
          clearInterval(interval);
        }
      }, 3000);
    }

    return () => { if (interval) clearInterval(interval); };
  }, [job?.id, job?.status, bridge]);

  const handleFabricate = async () => {
    if (!prompt) return;
    setStatus('FABRICATING');
    try {
      const result = await bridge.media.dispatch(prompt);
      setJob(result);
    } catch (err) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="bg-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
        <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase mb-6">Narrative_Synthesizer</h3>
        
        <div className="relative">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the sovereign narrative..."
            className="w-full h-32 bg-black border border-white/10 rounded-2xl p-6 text-white font-mono text-sm focus:border-cyan-500/50 outline-none transition-all placeholder:text-white/10 resize-none"
          />
          <button 
            onClick={handleFabricate}
            disabled={status === 'FABRICATING' || !prompt}
            className="absolute bottom-4 right-4 px-6 py-2 bg-white text-black rounded-xl font-bold text-xs hover:bg-cyan-400 transition-all disabled:opacity-50"
          >
            {status === 'FABRICATING' ? 'FABRICATING...' : 'FABRICATE'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="bg-black/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={16} className="text-cyan-400" />
            <h4 className="text-[11px] font-bold tracking-widest text-white/60 uppercase">Processing_Queue</h4>
          </div>
          
          {job ? (
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-white/40">JOB_ID: {job.jobId}</span>
                <span className="text-cyan-400">{job.status}</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                />
              </div>
              <div className="text-[10px] font-mono text-white/20 text-right">
                PROGRESS: {job.progress}%
              </div>
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center text-[10px] font-mono text-white/20 italic">
              NO_ACTIVE_JOB
            </div>
          )}
        </div>

        <div className="bg-black/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={16} className="text-violet-400" />
            <h4 className="text-[11px] font-bold tracking-widest text-white/60 uppercase">Distribution_Map</h4>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['YouTube', 'Instagram', 'Discord', 'X'].map(platform => (
              <div key={platform} className="p-2 bg-white/5 border border-white/5 rounded-lg text-[9px] font-mono text-white/40 flex justify-between items-center">
                <span>{platform}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
