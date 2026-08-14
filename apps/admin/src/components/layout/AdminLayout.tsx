"use client";
import React from 'react';
import { Container } from "@shared/ui";
import { brand } from "@shared/config";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--color-bg-primary)', 
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            {brand.name} <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>ADMIN</span>
          </h2>
        </div>
        
        <nav style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <AdminNavLink href="/" label="Dashboard" active />
          <AdminNavLink href="/security" label="Security" />
          <AdminNavLink href="/monitoring" label="Monitoring" />
          <AdminNavLink href="/access" label="Access Control" />
        </nav>
        
        <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Session: root_admin
          </div>
          <a href="/logout" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Sign Out</a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <header style={{ 
          height: '64px', 
          backgroundColor: 'var(--color-bg-primary)', 
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          justifyContent: 'space-between'
        }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Platform Management Console</div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>System Status: <span style={{ color: 'green' }}>Healthy</span></span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>RA</div>
          </div>
        </header>
        
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminNavLink({ href, label, active = false }: { href: string, label: string, active?: boolean }) {
  return (
    <a 
      href={href} 
      style={{ 
        padding: '12px 24px', 
        textDecoration: 'none', 
        color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)', 
        backgroundColor: active ? 'var(--color-bg-secondary)' : 'transparent',
        fontWeight: active ? 'bold' : 'normal',
        fontSize: '0.9rem',
        transition: 'all 0.2s'
      }}
    >
      {label}
    </a>
  );
}
