"use client";
import React, { useEffect, useState } from 'react';
import { AppShell, Metric, StatusIndicator } from "@pasadium/ui";
import { mockAdminApi, SystemHealth, SecurityLog } from "@/lib/mock-api";

export default function AdminDashboard() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [logs, setLogs] = useState<SecurityLog[]>([]);

  useEffect(() => {
    Promise.all([
      mockAdminApi.getSystemHealth(),
      mockAdminApi.getSecurityLogs()
    ]).then(([healthData, logsData]) => {
      setHealth(healthData);
      setLogs(logsData.slice(0, 5));
    });
  }, []);

  const navigation = [
    { label: 'Overview', href: '/', active: true },
    { label: 'Security', href: '/security' },
    { label: 'Access', href: '/access' },
    { label: 'Operations', href: '/operations' },
    { label: 'Activity', href: '/activity' },
    { label: 'Infrastructure', href: '/infrastructure' },
    { label: 'Audit', href: '/audit' },
    { label: 'Settings', href: '/settings' },
  ];

  if (!health) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Command Center...</div>;

  return (
    <AppShell 
      appName="Command Center" 
      navigation={navigation} 
      user={{ name: 'root_admin', role: 'SuperAdmin' }}
    >
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>PASADIUM COMMAND CENTER</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Platform-wide observability and operational control.</p>
      </div>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>SYSTEM STATUS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <StatusIndicator label="Platform" status="operational" />
          <StatusIndicator label="Identity" status="operational" />
          <StatusIndicator label="API" status="operational" />
          <StatusIndicator label="Database" status="operational" />
          <StatusIndicator label="Security" status="operational" />
          <StatusIndicator label="Operational" status="operational" />
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>ACTIVITY</h2>
          <div style={{ backgroundColor: 'var(--color-bg-surface)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ 
                padding: '16px', 
                borderBottom: i === logs.length - 1 ? 'none' : '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem'
              }}>
                <span>{log.timestamp} - {log.event}</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{log.user}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>SYSTEM HEALTH</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Metric label="API Latency" value="12ms" trend="up" />
            <Metric label="DB Health" value="99.9%" trend="neutral" />
            <Metric label="Error Rate" value="0.02%" trend="down" />
            <Metric label="Req Volume" value="1.2k/s" trend="up" />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
