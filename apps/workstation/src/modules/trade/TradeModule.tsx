'use client';

import React, { useEffect, useState } from 'react';
import { BrandOS } from '@pasadium/bridge';
import { OrderBook } from './components/OrderBook';
import { FundamentalAnalysis } from './components/FundamentalAnalysis';
import { ExecutionTerminal } from './components/ExecutionTerminal';

export const TradeModule = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadMarketData = async () => {
      try {
        const response = await BrandOS.trade.getMarketState();
        if (mounted) {
          setMarketData(response);
        }
      } catch (error) {
        console.error('Failed to load market data:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMarketData();
    const interval = setInterval(loadMarketData, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center font-mono text-xs text-white/30">
        INITIALIZING_MARKET_STATE...
      </div>
    );
  }

  return (
    <div className="h-full w-full grid grid-cols-12 gap-5">
      <div className="col-span-8 flex flex-col gap-5">
        <OrderBook marketData={marketData} />
        <ExecutionTerminal />
      </div>
      <div className="col-span-4">
        <FundamentalAnalysis />
      </div>
    </div>
  );
};
