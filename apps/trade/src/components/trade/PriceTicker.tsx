"use client";
import React, { useEffect, useState } from 'react';
import { TradeTicker } from "@pasadium/api";
import { mockTradeApi } from "@/lib/mock-api";

export function PriceTicker() {
  const [tickers, setTickers] = useState<TradeTicker[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickers = async () => {
    try {
      const data = await mockTradeApi.getTicker();
      setTickers(data);
    } catch (e) {
      console.error("Failed to fetch tickers", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickers();
    const interval = setInterval(fetchTickers, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="ticker-loading">Loading Market Data...</div>;

  return (
    <div className="price-ticker-container">
      {tickers.map((ticker) => (
        <div key={ticker.symbol} className="ticker-item">
          <span className="symbol">{ticker.symbol}</span>
          <span className="price">${ticker.price}</span>
          <span className={`change ${ticker.up ? 'up' : 'down'}`}>
            {ticker.change}
          </span>
        </div>
      ))}
    </div>
  );
}
