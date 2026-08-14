import React from 'react';
import { Container } from "@shared/ui";

interface MarketLayoutProps {
  children: React.ReactNode;
}

export function MarketLayout({ children }: MarketLayoutProps) {
  return (
    <div className="market-console">
      <header className="market-header">
        <Container>
          <div className="header-brand">PASADIUM MARKET</div>
          <div className="header-nav">
            <a href="/category/software">Software</a>
            <a href="/category/security">Security</a>
            <a href="/category/media">Media</a>
            <div className="cart-status">
              <span>Cart (0)</span>
            </div>
          </div>
        </Container>
      </header>
      <main className="market-main">
        {children}
      </main>
      <footer className="market-footer">
        <Container>
          <p>© {new Date().getFullYear()} PASADIUM MARKETPLACE</p>
        </Container>
      </footer>
    </div>
  );
}
