"use client";
import React, { useEffect, useState } from 'react';
import { Card } from "@shared/ui";
import { PortfolioItem } from "@pasadium/api";
import { mockTradeApi } from "@/lib/mock-api";

export function PortfolioTable({ data }: { data: PortfolioItem[] }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Card>Loading Portfolio...</Card>;

  return (
    <Card className="portfolio-card">
      <h3 style={{ marginBottom: '20px' }}>Your Holdings</h3>
      <table className="trade-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Amount</th>
            <th>Value</th>
            <th>PnL (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.asset}>
              <td className="asset-name">{item.asset}</td>
              <td>{item.amount}</td>
              <td>{item.value}</td>
              <td className={`pnl ${item.up ? 'up' : 'down'}`}>{item.pnl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
