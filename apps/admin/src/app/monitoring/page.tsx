"use client";
import React, { useEffect, useState } from 'react';
import { Card, Container } from "@pasadium/ui";
import { adminApi } from "@/lib/api-client";
import { SystemHealth } from "@/lib/mock-api";

export default function MonitoringPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getSystemHealth().then(data => {
      setHealth(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading System Metrics...</div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1>System Monitoring</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Infrastructure performance and resource utilization.</p>
      </div>

      <div className="admin-grid">
        <Card>
          <h3>CPU Load</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{health?.cpu}</div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '12%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
          </div>
        </Card>
        <Card>
          <h3>Memory Usage</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>{health?.memory}</div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '26%', height: '100%', backgroundColor: 'var(--color-primary)' }}></div>
          </div>
        </Card>
        <Card>
          <h3>Global Latency</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>42ms</div>
          <p style={{ color: 'var(--color-text-muted)' }}>Average across 12 edge regions.</p>
        </Card>
      </div>

      <section style={{ marginTop: '40px' }}>
        <h2>Regional Node Status</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Status</th>
              <th>Latency</th>
              <th>Load</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>US-East-1</td><td className="status-active">Healthy</td><td>12ms</td><td>Low</td></tr>
            <tr><td>EU-West-1</td><td className="status-active">Healthy</td><td>45ms</td><td>Medium</td></tr>
            <tr><td>AP-South-1</td><td className="status-active">Healthy</td><td>112ms</td><td>Low</td></tr>
            <tr><td>US-West-2</td><td className="status-active">Healthy</td><td>22ms</td><td>High</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
