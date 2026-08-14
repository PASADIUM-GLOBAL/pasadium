"use client";
import React, { useEffect, useState } from 'react';
import { Card, Container } from "@shared/ui";
import { adminApi } from "@/lib/api-client";
import { SystemHealth, SecurityLog } from "@/lib/mock-api";

export default function AdminDashboard() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [logs, setLogs] = useState<SecurityLog[]>([]);

  useEffect(() => {
    Promise.all([
      adminApi.getSystemHealth(),
      adminApi.getSecurityLogs()
    ]).then(([healthData, logsData]) => {
      setHealth(healthData);
      setLogs(logsData.slice(0, 5));
    });
  }, []);

  if (!health) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Dashboard...</div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1>Platform Overview</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Real-time status of the PASADIUM ecosystem.</p>
      </div>

      <div className="admin-grid">
        <Card>
          <h3>System Health</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
            {health.status}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)' }}>
            <span>CPU Usage: {health.cpu}</span>
            <span>Memory: {health.memory}</span>
            <span>Uptime: {health.uptime}</span>
          </div>
        </Card>

        <Card>
          <h3>Active Sessions</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
            1,248
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>Across all specialized applications.</p>
        </Card>

        <Card>
          <h3>Security Alerts</h3>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0', color: '#ef4444' }}>
            3
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>High priority alerts requiring attention.</p>
        </Card>
      </div>

      <section style={{ marginTop: '40px' }}>
        <h2>Recent Security Events</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event</th>
              <th>User</th>
              <th>Severity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i}>
                <td>{log.timestamp}</td>
                <td>{log.event}</td>
                <td>{log.user}</td>
                <td className={`severity-${log.severity.toLowerCase()}`}>{log.severity}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
