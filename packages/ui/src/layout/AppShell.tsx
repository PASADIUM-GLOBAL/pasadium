import React from 'react';
import { PasadiumLogo } from '../brand/PasadiumLogo';

interface AppShellProps {
  children: React.ReactNode;
  appName: string;
  navigation: { label: string, href: string, active?: boolean }[];
  user?: { name: string, role: string };
}

export function AppShell({ children, appName, navigation, user }: AppShellProps) {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: 'var(--color-bg-main)', 
      color: 'var(--color-text-primary)',
      fontFamily: 'var(--font-sans)'
    }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--color-bg-surface)', 
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <PasadiumLogo size="small" />
        </div>
        
        <nav style={{ padding: '20px 0', flex: 1 }}>
          {navigation.map(item => (
            <a 
              key={item.href} 
              href={item.href} 
              style={{ 
                display: 'block',
                padding: '12px 24px', 
                textDecoration: 'none', 
                color: item.active ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)', 
                backgroundColor: item.active ? 'var(--color-bg-elevated)' : 'transparent',
                fontWeight: item.active ? 'bold' : 'normal',
                fontSize: '0.9rem',
                borderLeft: item.active ? '4px solid var(--color-accent-blue)' : '4px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {user && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
            <div style={{ color: 'var(--color-text-secondary)' }}>{user.role}</div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ 
          height: '64px', 
          backgroundColor: 'var(--color-bg-surface)', 
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <span style={{ fontWeight: 'bold', letterSpacing: '1px', color: 'var(--color-text-secondary)' }}>
            {appName.toUpperCase()}
          </span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>System Status: Operational</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}></div>
          </div>
        </header>
        
        <main style={{ padding: '32px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
