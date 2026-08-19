import React from 'react';
import type { MarketData } from '@pasadium/bridge/src/contracts/trade';

interface OrderBookProps {
  marketData: MarketData | null;
}

export const OrderBook = ({ marketData }: OrderBookProps) => {
  if (!marketData) {
    return (
      <div className="p-4 text-white/20 font-mono text-[10px]">
        LOADING_DEPTH...
      </div>
    );
  }

  const data = marketData;

  return (
    <div className="flex flex-col h-full font-mono text-[10px]">
      <div className="p-3 border-b border-white/5 flex justify-between text-white/40 uppercase tracking-tighter">
        <span>Price (USD)</span>
        <span>Amount</span>
      </div>

      {/* Sells */}
      <div className="flex-1 overflow-hidden py-2">
        {data.asks.map((ask, i) => (
          <div
            key={`ask-${i}`}
            className="flex justify-between px-3 py-[2px] hover:bg-red-500/10 transition-colors group"
          >
            <span className="text-red-400 group-hover:text-red-300">
              {ask.price}
            </span>
            <span className="text-white/60">{ask.amount}</span>
          </div>
        ))}
      </div>

      {/* Current Spread */}
      <div className="bg-white/5 py-2 px-3 flex items-center justify-between">
        <span className="text-sm font-bold text-white tracking-tighter">
          {data.lastPrice}
        </span>
        <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest animate-pulse">
          Live
        </span>
      </div>

      {/* Buys */}
      <div className="flex-1 overflow-hidden py-2">
        {data.bids.map((bid, i) => (
          <div
            key={`bid-${i}`}
            className="flex justify-between px-3 py-[2px] hover:bg-green-500/10 transition-colors group"
          >
            <span className="text-green-400 group-hover:text-green-300">
              {bid.price}
            </span>
            <span className="text-white/60">{bid.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
