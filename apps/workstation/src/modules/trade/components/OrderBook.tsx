import React, { useEffect, useState } from 'react';
import { useOrderBook } from '../hooks/useTrade';
import { MarketData } from '@pasadium/bridge/src/contracts/trade';

export const OrderBook = () => {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const pollOrderBook = async () => {
      try {
        // We use the hook's logic but since we are in a component, 
        // we'll use BrandOS directly for the loop to avoid hook complexity
        const { BrandOS } = await import('@pasadium/bridge');
        const res = await BrandOS.trade.getOrderBook('BTC-USD');
        setData(res.data);
      } catch (e) {
        console.error("OrderBook sync failed", e);
      } finally {
        setLoading(false);
      }
      timer = window.setTimeout(pollOrderBook, 1000);
    };

    pollOrderBook();
    return () => window.clearTimeout(timer);
  }, []);

  if (loading || !data) return <div className="p-4 text-white/20 font-mono text-[10px]">LOADING_DEPTH...</div>;

  return (
    <div className="flex flex-col h-full font-mono text-[10px]">
      <div className="p-3 border-b border-white/5 flex justify-between text-white/40 uppercase tracking-tighter">
        <span>Price (USD)</span>
        <span>Amount</span>
      </div>
      
      {/* Sells */}
      <div className="flex-1 overflow-hidden py-2">
        {data.asks.map((ask, i) => (
          <div key={`ask-${i}`} className="flex justify-between px-3 py-[2px] hover:bg-red-500/10 transition-colors group">
            <span className="text-red-400 group-hover:text-red-300">{ask.price}</span>
            <span className="text-white/60">{ask.amount}</span>
          </div>
        ))}
      </div>

      {/* Current Spread */}
      <div className="bg-white/5 py-2 px-3 flex items-center justify-between">
        <span className="text-sm font-bold text-white tracking-tighter">{data.lastPrice}</span>
        <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest animate-pulse">Live</span>
      </div>

      {/* Buys */}
      <div className="flex-1 overflow-hidden py-2">
        {data.bids.map((bid, i) => (
          <div key={`bid-${i}`} className="flex justify-between px-3 py-[2px] hover:bg-green-500/10 transition-colors group">
            <span className="text-green-400 group-hover:text-green-300">{bid.price}</span>
            <span className="text-white/60">{bid.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
