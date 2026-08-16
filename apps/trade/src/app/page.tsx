"use client";
import React, { useState, useEffect } from 'react';
import { AppShell, Metric, Button, Card } from "@pasadium/ui";
import { PortfolioItem } from "@pasadium/api";
import { tradeApi } from "@/lib/api-client";
import { PortfolioTable } from "@/components/trade/PortfolioTable";

// Correcting import for the tradeApi
import { tradeApi as tradeApiClient } from "@/lib/api-client";

export default function TradePage() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderAsset, setOrderAsset] = useState('BTC');
  const [orderAmount, setOrderAmount] = useState('0.1');

  const loadPortfolio = async () => {
    try {
      const data = await tradeApiClient.getPortfolio();
      setPortfolio(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const navigation = [
    { label: 'Overview', href: '/', active: true },
    { label: 'Markets', href: '/markets' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Orders', href: '/orders' },
    { label: 'Positions', href: '/positions' },
    { label: 'Activity', href: '/activity' },
  ];

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Cockpit...</div>;

  return (
    <AppShell 
      appName="Trade" 
      navigation={navigation} 
      user={{ name: 'trader_1', role: 'Trader' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>PORTFOLIO VALUE</h1>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>$124,502.12</div>
              <div style={{ color: '#22c55e', fontWeight: 'bold' }}>+4.2% Today</div>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--color-text-secondary)' }}>CURRENT HOLDINGS</h2>
            <PortfolioTable data={portfolio} />
          </section>

          <aside>
            <Card>
              <h3 style={{ marginBottom: '20px', fontSize: '1.1rem' }}>EXECUTION PANEL</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Asset</label>
                  <select 
                    value={orderAsset} 
                    onChange={(e) => setOrderAsset(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', backgroundColor: 'var(--color-bg-main)', color: 'white', border: '1px solid var(--color-border)' }}
                  >
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="SOL">Solana (SOL)</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Amount</label>
                  <input 
                    type="text" 
                    value={orderAmount} 
                    onChange={(e) => setOrderAmount(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', backgroundColor: 'var(--color-bg-main)', color: 'white', border: '1px solid var(--color-border)', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                  <Button variant="primary" onClick={() => handleOrder('BUY')} style={{ padding: '16px' }}>BUY</Button>
                  <Button variant="secondary" onClick={() => handleOrder('SELL')} style={{ padding: '16px' }}>SELL</Button>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
