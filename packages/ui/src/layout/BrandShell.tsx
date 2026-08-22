import React, { useState } from 'react';
import { Atmosphere } from './Atmosphere';
import { Shield, Clock, Cpu, LayoutGrid, Zap, Settings, LogOut, Activity, Globe } from 'lucide-react';
import { BRAND_COLORS, ConnectionStatus } from '@pasadium/config';
import { CommandPalette, CommandItem } from '../interaction/CommandPalette';
import { useCommandPalette } from '../hooks/useCommandPalette';
import { SystemStatus } from '../components/SystemStatus';
// Removed context imports
import { AnimatePresence } from 'framer-motion';

export type ModuleId = 'home' | 'trade' | 'media' | 'market' | 'security' | 'system';

export const BrandShell = ({ children, initialModule = 'home', user, status = 'disconnected', latency = 0 }: { children?: React.ReactNode, initialModule?: ModuleId, user?: any, status?: string, latency?: number }) => {
  const [currentModule, setCurrentModule] = useState<ModuleId>(initialModule);
  const { isOpen, setIsOpen, toggle } = useCommandPalette((id) => {
    if (id.startsWith('nav:')) {
      setCurrentModule(id.split(':')[1] as ModuleId);
    }
  });

  const commands: CommandItem[] = [
    { id: 'nav:home', label: 'Home', description: 'Return to main operating surface', icon: <LayoutGrid size={18}/>, action: () => setCurrentModule('home'), category: 'Navigation' },
    { id: 'nav:trade', label: 'Trade Cockpit', description: 'Institutional execution terminal', icon: <Zap size={18}/>, action: () => setCurrentModule('trade'), category: 'Navigation' },
    { id: 'nav:media', label: 'Media Forge', description: 'Neural content fabrication', icon: <Activity size={18}/>, action: () => setCurrentModule('media'), category: 'Navigation' },
    { id: 'nav:market', label: 'Market Hub', description: 'Commercial intelligence surface', icon: <Globe size={18}/>, action: () => setCurrentModule('market'), category: 'Navigation' },
    { id: 'nav:security', label: 'Security Facade', description: 'Sentinel cell synchronization', icon: <Shield size={18}/>, action: () => setCurrentModule('security'), category: 'Navigation' },
    { id: 'nav:system', label: 'System Health', description: 'Core kernel diagnostics', icon: <Cpu size={18}/>, action: () => setCurrentModule('system'), category: 'Navigation' },
  ];

  return (
    <div className="h-screen w-full flex overflow-hidden font-sans text-slate-200">
      <Atmosphere />

      {/* STRATUM: GLASS SIDEBAR */}
      <aside className="w-24 border-r flex flex-col items-center py-10 gap-12 z-30" 
        style={{ 
          borderColor: BRAND_COLORS.border.subtle, 
          backgroundColor: BRAND_COLORS.background.glass,
          backdropFilter: 'blur(24px)'
        }}>
        <div className="w-14 h-14 relative group cursor-pointer">
          <div className="absolute inset-0 rounded-full blur-xl transition-all group-hover:opacity-60" 
               style={{ backgroundColor: BRAND_COLORS.accent.cyan }} />
          <img src="/pasadium-logo.png" alt="Logo" className="relative z-10 w-full h-full object-contain" />
        </div>

        <nav className="flex flex-col gap-10">
          <SidebarIcon icon={<LayoutGrid size={22} />} active={currentModule === 'home'} label="Home" onClick={() => setCurrentModule('home')} />
          <SidebarIcon icon={<Zap size={22} />} active={currentModule === 'trade'} label="Trade" onClick={() => setCurrentModule('trade')} />
          <SidebarIcon icon={<Activity size={22} />} active={currentModule === 'media'} label="Media" onClick={() => setCurrentModule('media')} />
          <SidebarIcon icon={<Globe size={22} />} active={currentModule === 'market'} label="Market" onClick={() => setCurrentModule('market')} />
          <SidebarIcon icon={<Shield size={22} />} active={currentModule === 'security'} label="Security" onClick={() => setCurrentModule('security')} />
        </nav>

        <div className="mt-auto flex flex-col gap-10">
          <SidebarIcon icon={<Settings size={22} />} label="Settings" onClick={() => {}} />
          <SidebarIcon icon={<LogOut size={22} />} label="Exit" onClick={() => {}} />
        </div>
      </aside>

      {/* MAIN OPERATING SURFACE */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR */}
        <header className="h-16 border-b flex items-center justify-between px-10 z-20" 
          style={{ 
            borderColor: BRAND_COLORS.border.subtle, 
            backgroundColor: BRAND_COLORS.background.glass,
            backdropFilter: 'blur(12px)'
          }}>
          <div className="flex items-center gap-6">
            <h1 className="text-[11px] font-bold tracking-[0.4em] uppercase font-mono" 
                style={{ color: BRAND_COLORS.accent.cyan }}>
              PASADIUM // {currentModule.toUpperCase()}
            </h1>
            <div className="flex items-center gap-3">
              <SystemStatus />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/5 text-[9px] font-mono tracking-widest uppercase">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  status === 'connected' ? 'bg-green-500' : 
                  status === 'reconnecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                }`} />
                {status}_SYNC
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-mono text-white/40">
             <div className="flex items-center gap-2"><Clock size={12}/> {new Date().toLocaleTimeString('en-GB', { timeZone: 'UTC' })} UTC</div>
             {user?.roles.includes('SuperAdmin') && (
               <div className="px-2 py-1 bg-magenta-500/20 text-magenta-400 border border-magenta-500/40 rounded text-[8px] font-bold">
                 SOVEREIGN_MODE
               </div>
             )}
             <button className="px-5 py-2 rounded-lg font-bold transition-all hover:bg-cyan-400 hover:text-black" 
                     style={{ backgroundColor: BRAND_COLORS.text.primary, color: BRAND_COLORS.text.inverse }}>
               SIGN_OUT
             </button>
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <main className="flex-1 p-10 overflow-y-auto relative z-10 custom-scrollbar">
          {children}
        </main>
      </div>

      <AnimatePresence>
        {isOpen && (
          <CommandPalette 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
            items={commands} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarIcon = ({ icon, active, label, onClick }: { icon: React.ReactNode, active?: boolean, label: string, onClick: () => void }) => (
  <div onClick={onClick} className={`p-3 rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-1 group relative ${
    active ? 'text-cyan-400' : 'text-white/20 hover:text-white/60'
  }`}
  style={{ 
    backgroundColor: active ? BRAND_COLORS.background.elevated : 'transparent',
    boxShadow: active ? `inset 0 0 10px ${BRAND_COLORS.border.subtle}` : 'none'
  }}>
    {icon}
    <span className="text-[8px] font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity absolute left-20 bg-black/80 px-2 py-1 rounded border border-white/10 whitespace-nowrap">
      {label}
    </span>
  </div>
);
