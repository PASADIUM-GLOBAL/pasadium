import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clapperboard, 
  ShoppingBag, 
  ShieldCheck, 
  Clock, 
  Zap,
  Bell,
  StickyNote,
  Cpu
} from 'lucide-react';
import { ModuleID, WorkstationState } from '../../hooks/useWorkstationState';
import { BrandOS } from '@pasadium/bridge';

interface Props {
  children: React.ReactNode;
  state: WorkstationState;
  onModuleChange: (id: ModuleID) => void;
}

export const WorkstationShell = ({ children, state, onModuleChange }: Props) => {
  const [uhi, setUhi] = useState<string>('00.00');
  const [posture, setPosture] = useState<string>('LOCKED');

  useEffect(() => {
    let timer: number | undefined;

    const pollHealth = async () => {
      try {
        const res = await BrandOS.security.getIntegrity();

        setUhi(res.healthIndex.toFixed(2));
        setPosture(res.posture);
      } catch (e) {
        console.error('SHELL_UHI_SYNC_FAILED', e);
      }

      timer = window.setTimeout(pollHealth, 10000);
    };

    pollHealth();

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };

  }, []);
  return (
    <div className="h-screen w-full bg-[#000000] text-[#E0E0E0] flex overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* STRATUM: SIDE DOCK (App Selector) */}
      <aside className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-10 bg-[#020202] z-20">
        {/* The Pasadium Mark */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center text-cyan-400 font-bold text-xl tracking-tighter">
            P
          </div>
        </div>

        <nav className="flex flex-col gap-8">
          <NavIcon icon={<TrendingUp size={22}/>} active={state.activeModule === 'TRADE'} onClick={() => onModuleChange('TRADE')} label="Trade" />
          <NavIcon icon={<Clapperboard size={22}/>} active={state.activeModule === 'MEDIA'} onClick={() => onModuleChange('MEDIA')} label="Media" />
          <NavIcon icon={<ShoppingBag size={22}/>} active={state.activeModule === 'MARKET'} onClick={() => onModuleChange('MARKET')} label="Market" />
          <div className="h-[1px] w-8 bg-white/5 mx-auto" />
          <NavIcon icon={<ShieldCheck size={22}/>} active={state.activeModule === 'SECURITY'} onClick={() => onModuleChange('SECURITY')} label="Security" />
          <NavIcon icon={<Cpu size={22}/>} active={state.activeModule === 'ADMIN'} onClick={() => onModuleChange('ADMIN')} label="Admin" />
        </nav>
      </aside>

      {/* STRATUM: MAIN OPERATING SURFACE */}
      <section className="flex-1 flex flex-col relative">
        
        {/* TOP STATUS BAR */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-2xl z-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-cyan-500/70 uppercase">
              PASADIUM // {state.activeModule}_ENVIRONMENT
            </span>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-mono text-white/40">
            <div className="flex items-center gap-2">
              <Cpu size={12} className={posture === 'LOCKED' ? 'text-green-500' : 'text-yellow-500'} />
              <span className="uppercase">{posture}_NOMINAL</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-yellow-500" />
              <span className="text-white/60">UHI: {uhi}%</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-8">
              <Clock size={12} />
              <span className="text-white/60">
                {new Date().toISOString().substr(11, 8)} UTC
              </span>
            </div>
          </div>
        </header>

        {/* MODULE VIEWPORT */}
        <main className="flex-1 overflow-hidden p-6 relative">
           {children}
        </main>

        {/* PERSISTENT UTILITY TASKBAR (Footer) */}
        <footer className="h-12 border-t border-white/5 bg-[#020202] flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-6">
             <UtilityButton icon={<StickyNote size={14}/>} label="QUICK_NOTES" />
             <UtilityButton icon={<Bell size={14}/>} label="NOTIFICATIONS" />
          </div>

          {/* System Integrity Visualizer */}
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Platform_Load</span>
            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500"
                animate={{ width: `${state.system.load}%` }}
                transition={{ duration: 1 }}
               />
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const NavIcon = ({ icon, active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`group relative p-3 rounded-xl transition-all duration-300 ${
      active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/30 hover:text-white/70 hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="absolute left-16 scale-0 group-hover:scale-100 transition-transform bg-white text-black text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap z-50">
      {label}
    </span>
    {active && (
      <motion.div layoutId="navGlow" className="absolute inset-0 rounded-xl border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
    )}
  </button>
);

const UtilityButton = ({ icon, label }: any) => (
  <button className="flex items-center gap-2 text-[10px] font-mono text-white/30 hover:text-cyan-400 transition-colors tracking-tighter">
    {icon}
    <span className="hidden lg:block">{label}</span>
  </button>
);
