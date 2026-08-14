import type { Metadata } from "next";
import "./globals.css";
import { brandConfig } from "config";
import { Container } from "ui";

export const metadata: Metadata = {
  title: {
    template: `%s | ${brandConfig.name}`,
    default: brandConfig.name,
  },
  description: brandConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Container>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
              <a href="/" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{brandConfig.name}</a>
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="/about">About</a>
                <a href="/platform">Platform</a>
                <a href="/security">Security</a>
                <a href="/documentation">Documentation</a>
                <a href="/contact">Contact</a>
              </div>
              <a href="/login" className="button button-primary">Sign In</a>
            </nav>
          </Container>
        </header>
        
        {children}
        
        <footer className="site-footer">
          <Container>
            <div style={{ padding: '40px 0', borderTop: '1px solid var(--color-border)', marginTop: '80px' }}>
              <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
