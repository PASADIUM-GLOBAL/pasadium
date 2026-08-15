"use client";
import React, { useState } from 'react';
import { PortfolioItem } from "@pasadium/api";
import { TradeLayout } from "@/components/layout/TradeLayout";
import { PriceTicker } from "@/components/trade/PriceTicker";
import { PortfolioTable } from "@/components/trade/PortfolioTable";
import { tradeApi } from "@/lib/api-client";
import { Button, Card } from "@shared/ui";

export default function TradePage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderAsset, setOrderAsset] = useState('BTC');
  const [orderAmount, setOrderAmount] = useState('0.1');

  const loadPortfolio = async () => {
    try {
      const data = await tradeApi.getPortfolio();
      setPortfolio(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadPortfolio();
  }, []);

  const handleOrder = async (type: 'BUY' | 'SELL') => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/trade/order`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pasadium_token')}`
        },
        body: JSON.stringify({
          asset: orderAsset,
          type,
          amount: orderAmount,
          price: '64000'
        })
      });
      await loadPortfolio();
      alert(`Order ${type} placed successfully!`);
    } catch (e) {
      alert('Order failed');
    }
  };

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

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Your Portfolio</h2>
            </div>
            <PortfolioTable data={portfolio} />
          </div>

          <Card>
            <h3 style={{ marginBottom: '16px' }}>Quick Order</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label>Asset</label>
              <select 
                value={orderAsset} 
                onChange={(e) => setOrderAsset(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
              
              <label>Amount</label>
              <input 
                type="text" 
                value={orderAmount} 
                onChange={(e) => setOrderAmount(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid var(--color-border)' }}
              />

              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <Button variant="primary" onClick={() => handleOrder('BUY')} style={{ flex: 1 }}>Buy</Button>
                <Button variant="secondary" onClick={() => handleOrder('SELL')} style={{ flex: 1 }}>Sell</Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </TradeLayout>
  );
}
