import React from 'react';
import { Container } from "@shared/ui";

interface TradeLayoutProps {
  children: React.ReactNode;
}

export function TradeLayout({ children }: TradeLayoutProps) {
  return (
    <div className="trade-console">
      <aside className="trade-sidebar">
        <div className="sidebar-brand">PASADIUM TRADE</div>
        <nav className="sidebar-nav">
          <a href="/" className="active">Dashboard</a>
          <a href="/markets">Markets</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/analytics">Analytics</a>
          <a href="/settings">Settings</a>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar"></div>
            <span>Trader ID: 0x...</span>
          </div>
        </div>
      </aside>
      <main className="trade-main">
        <header className="trade-header">
          <div className="header-title">Trade Console</div>
          <div className="header-actions">
            <button className="button button-secondary">Notifications</button>
            <button className="button button-primary">Deposit</button>
          </div>
        </header>
        <div className="trade-content">
          {children}
        </div>
      </main>
    </div>
  );
}
