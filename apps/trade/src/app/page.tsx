"use client";
import React, { useState } from 'react';
import { PortfolioItem } from "@pasadium/api";
import { TradeLayout } from "@/components/layout/TradeLayout";
import { PriceTicker } from "@/components/trade/PriceTicker";
import { PortfolioTable } from "@/components/trade/PortfolioTable";
import { tradeApi } from "@/lib/api-client";

export default function TradePage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    tradeApi.getPortfolio().then((data: PortfolioItem[]) => {
      setPortfolio(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading portfolio...</div>;

  return (
    <TradeLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Market Overview</h2>
          </div>
          <PriceTicker />
        </section>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Your Portfolio</h2>
          </div>
          <PortfolioTable data={portfolio} />
        </section>
      </div>
    </TradeLayout>
  );
}
