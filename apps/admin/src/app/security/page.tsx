"use client";
import React, { useEffect, useState } from 'react';
import { Card, Container } from "@pasadium/ui";
import { adminApi } from "@/lib/api-client";
import { SecurityLog } from "@/lib/mock-api";

export default function SecurityPage() {
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getSecurityLogs().then(data => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Security Logs...</div>;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1>Security Management</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Audit trails, threat detection, and security policy enforcement.</p>
      </div>

      <div className="admin-grid" style={{ marginBottom: '40px' }}>
        <Card>
          <h3>Threat Level</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#eab308', margin: '10px 0' }}>Elevated</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Increased failed login attempts detected from 4.22.x.x</p>
        </Card>
        <Card>
          <h3>Active Firewalls</h3>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e', margin: '10px 0' }}>All Active</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>8/8 perimeter nodes reporting healthy status.</p>
        </Card>
      </div>

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Audit Log</h2>
          <button style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Export CSV</button>
        </div>
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
