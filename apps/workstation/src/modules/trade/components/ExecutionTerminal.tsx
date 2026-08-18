import { createSovereignClient } from '@pasadium/bridge';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthority } from '../../../hooks/useAuthority';

export const ExecutionTerminal = () => {
  const { token } = useAuthority();
  const [confirmText, setConfirmText] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'EXECUTING' | 'SUCCESS'>('IDLE');

  const handleDispatch = async () => {
    if (!token) return;
    setStatus('EXECUTING');
    
    try {
      const bridge = createSovereignClient(token);
      await bridge.trade.execute({
        ticker: 'BTC/USD',
        amount: 0.1,
        side: 'BUY'
      });
      setStatus('SUCCESS');
      setTimeout(() => { setStatus('IDLE'); setConfirmText(''); }, 2000);
    } catch (err: any) {
      alert(`BRIDGE_OS_REJECTION: ${err.message || 'Insufficient Assets'}`);
      setStatus('IDLE');
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white/5 border border-white/10 rounded-xl">
      <h3 className="text-sm font-bold uppercase mb-6 tracking-tight">Execution_Terminal</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-white/40">Asset:</span>
          <span className="text-white">BTC/USD</span>
        </div}
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-white/40">Amount:</span>
          <span className="text-white">0.1000</span>
        </div}
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-white/40">Slippage:</span>
          <span className="text-white">0.05%</span>
        </div}
      </div>

      <div className="space-y-2 mb-6">
        <label className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Linguistic_Confirmation</label>
        <input 
          type="text" 
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
          placeholder="TYPE 'EXECUTE ORDER' TO CONFIRM"
          className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-cyan-500/50 outline-none transition-all font-mono"
        />
      </div>

      <motion.button
        onClick={handleDispatch}
        disabled={confirmText !== "EXECUTE ORDER" || status !== 'IDLE'}
        className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest transition-all duration-500 ${
          status === 'SUCCESS' ? 'bg-green-500 text-black' :
          confirmText === "EXECUTE ORDER" ? 'bg-cyan-500 text-black shadow-lg' : 'bg-white/5 opacity-20 text-white'
        }`}
      >
        {status === 'EXECUTING' ? 'ROUTING_TO_BRIDGE_OS...' : 
         status === 'SUCCESS' ? 'ORDER_FILLED_LEDGER_SYNCED' : 'DISPATCH_ORDER'}
      </motion.button>
    </div>
  );
};
