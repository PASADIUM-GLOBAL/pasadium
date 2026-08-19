import React, { useEffect, useState } from 'react';
import { useRealtime } from '../../../context/RealtimeContext';
import { BRAND_COLORS, OrderBookLevel } from '@pasadium/config';

export const OrderBook = () => {
  const { subscribe, status } = useRealtime();
  const [bids, setBids] = useState<OrderBookLevel[]>([]);
  const [asks, setAsks] = useState<OrderBookLevel[]>([]);

  useEffect(() => {
    const unsubscribe = subscribe('TICKER_UPDATE', (data: { bids: OrderBookLevel[], asks: OrderBookLevel[] }) => {
      setBids(data.bids);
      setAsks(data.asks);
    });

    return () => unsubscribe();
  }, [subscribe]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b flex justify-between items-center bg-white/[0.01]" 
           style={{ borderColor: BRAND_COLORS.border.subtle }}>
        <h3 className="text-[11px] font-bold tracking-[0.3em] text-white/70 uppercase">Order_Flow</h3>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${status === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[9px] font-mono">
            {status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden p-4 space-y-0.5">
        <div className="text-[10px] font-mono text-white/20 flex justify-between px-2 mb-2 uppercase tracking-tighter">
          <span>Price_USD</span>
          <span>Size</span>
        </div>
        
        {/* SELL SIDE (ASKS) */}
        <div className="space-y-0.5 mb-4">
          {asks.slice(0, 15).reverse().map((ask, i) => (
            <div key={i} className="flex justify-between px-2 py-1 hover:bg-red-500/5 rounded transition-colors cursor-pointer group">
              <span className="text-red-400/80 group-hover:text-red-400 font-mono">{ask.price.toFixed(2)}</span>
              <span className="text-white/40 group-hover:text-white/70 font-mono">{ask.quantity.toFixed(4)}</span>
            </div>
          ))}
        </div>

        {/* MID MARKET SPREAD */}
        <div className="py-4 my-2 border-y bg-white/[0.01] flex flex-col items-center justify-center" 
             style={{ borderColor: BRAND_COLORS.border.subtle }}>
           <span className="text-2xl font-mono font-bold text-white tracking-tighter">
             {asks[0]?.price.toFixed(2) || '---'}
           </span>
           <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] mt-1 uppercase">Mid_Market_Index</span>
        </div>

        {/* BUY SIDE (BIDS) */}
        <div className="space-y-0.5">
          {bids.slice(0, 15).map((bid, i) => (
            <div key={i} className="flex justify-between px-2 py-1 hover:bg-green-500/5 rounded transition-colors cursor-pointer group">
              <span className="text-green-400/80 group-hover:text-green-400 font-mono">{bid.price.toFixed(2)}</span>
              <span className="text-white/40 group-hover:text-white/70 font-mono">{bid.quantity.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
