import React, { useState } from 'react';
import { useTrade } from '../hooks/useTrade';
import { BRAND_COLORS } from '@pasadium/config';

export const ExecutionTerminal = () => {
  const { placeOrder } = useTrade();
  const [amount, setAmount] = useState('0.1');
  const [ticker] = useState('BTC/USD');
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [status, setStatus] = useState<'IDLE' | 'EXECUTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [confirmText, setConfirmText] = useState('');

  const estimatedValue = (parseFloat(amount) || 0) * 64208.40;

  const handleDispatch = async () => {
    if (confirmText !== "EXECUTE ORDER") return;
    setStatus('EXECUTING');
    try {
      await placeOrder({ ticker, amount: Number(amount), side });
      setStatus('SUCCESS');
      setTimeout(() => setStatus('IDLE'), 3000);
    } catch (err) {
      setStatus('ERROR');
      setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  return (
    <div className="bg-[#0A0C12]/80 border border-white/5 backdrop-blur-3xl rounded-[40px] p-8 h-full flex flex-col shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-50" />
      
      <h3 className="text-[11px] font-bold tracking-[0.4em] text-white/40 uppercase mb-8">Authority_Portal</h3>

      <div className="space-y-6 flex-1">
        <div className="grid grid-cols-2 p-1.5 bg-black/40 rounded-2xl border border-white/5">
           <button 
             onClick={() => setSide('BUY')}
             className={`py-4 rounded-xl font-bold text-xs tracking-widest transition-all ${side === 'BUY' ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'text-white/40 hover:text-white'}`}
           >
             BUY
           </button>
           <button 
             onClick={() => setSide('SELL')}
             className={`py-4 rounded-xl font-bold text-xs tracking-widest transition-all ${side === 'SELL' ? 'bg-red-500 text-black shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'text-white/40 hover:text-white'}`}
           >
             SELL
           </button>
        </div>

        <div className="space-y-4">
          <TradeInput label="Entry_Price" value="64208.40" readOnly unit="USD" />
          <TradeInput 
            label="Order_Quantity" 
            value={amount} 
            unit="BTC" 
            onChange={(val) => setAmount(val)} 
          />
        </div>

        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
           <div className="flex justify-between text-[10px] font-mono text-white/30">
             <span className="uppercase">ESTIMATED_VALUE</span>
             <span className="text-white/60">${estimatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
           </div>
           <div className="flex justify-between text-[10px] font-mono text-white/30">
             <span className="uppercase">MARGIN_REQUIRED</span>
             <span className="text-white/60">${(estimatedValue * 0.02).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
           </div>
           <div className="pt-2 border-t border-white/5 flex justify-between items-center">
              <span className="text-[10px] font-mono text-white/30">RISK_STATUS</span>
              <span className={`text-[10px] font-bold font-mono ${status === 'ERROR' ? 'text-red-400' : 'text-green-400'}`}>
                {status === 'EXECUTING' ? '● PROCESSING' : status === 'SUCCESS' ? '● FILLED' : '● WITHIN_LIMITS'}
              </span>
           </div>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <p className="text-[9px] font-mono text-white/20 text-center uppercase tracking-widest italic">
          Manual_Intent_Authorization_Required
        </p>
        <input 
          type="text" 
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={`TYPE 'EXECUTE ORDER'`} 
          className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-center font-mono text-xs tracking-[0.2em] focus:border-cyan-500/50 outline-none transition-all placeholder:text-white/10"
        />
        <button 
          disabled={confirmText !== "EXECUTE ORDER" || status === 'EXECUTING'}
          onClick={handleDispatch}
          className={`w-full py-5 rounded-2xl font-bold text-sm tracking-[0.2em] uppercase transition-all active:scale-[0.98] ${confirmText === "EXECUTE ORDER" && status !== 'EXECUTING' ? 'bg-white text-black hover:bg-cyan-400 shadow-xl' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
        >
          {status === 'EXECUTING' ? 'DISPATCHING...' : 'Dispatch_Intent'}
        </button>
      </div>
    </div>
  );
};

const TradeInput = ({ label, value, unit, readOnly, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] ml-2">{label}</label>
    <div className="relative">
      <input 
        type="text" 
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-xl font-bold tracking-tighter focus:border-cyan-500/50 outline-none ${readOnly ? 'opacity-60' : ''}`} 
      />
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/20">{unit}</span>
    </div>
  </div>
);
