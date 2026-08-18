"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WorkstationShell } from '../components/layout/WorkstationShell';
import { TradeModule } from '../modules/trade/TradeModule';
import { MediaModule } from '../modules/media/MediaModule';
import { MarketModule } from '../modules/market/MarketModule';
import { SecurityModule } from '../modules/security/SecurityModule';
import { AdminMatrix } from '../modules/admin/AdminMatrix';
import { useWorkstationState, ModuleID } from '../hooks/useWorkstationState';
import { useAuthority } from '../hooks/useAuthority';
import { LoginFacade } from '../modules/auth/LoginFacade';
import { BrandOSRuntime } from '../components/BrandOSRuntime';

export default function WorkstationPage() {
  const { state, setState } = useWorkstationState();
  const { isAuthenticated } = useAuthority();
  const [activeModule, setActiveModule] = useState<ModuleID>(state.activeModule || 'TRADE');

  const handleModuleChange = (id: ModuleID) => {
    setActiveModule(id);
    setState(prev => ({ ...prev, activeModule: id }));
  };

  if (!isAuthenticated) {
    return <LoginFacade />;
  }

  return (
    <BrandOSRuntime>
      <WorkstationShell 
        state={state as any} 
        onModuleChange={handleModuleChange}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            {activeModule === 'TRADE' && <TradeModule />}
            {activeModule === 'MEDIA' && <MediaModule />}
            {activeModule === 'MARKET' && <MarketModule />}
            {activeModule === 'SECURITY' && <SecurityModule />}
            {activeModule === 'ADMIN' && <AdminMatrix />}
          </motion.div>
        </AnimatePresence>
      </WorkstationShell>
    </BrandOSRuntime>
  );
}
