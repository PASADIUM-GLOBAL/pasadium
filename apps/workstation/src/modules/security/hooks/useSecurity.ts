import { useState, useEffect } from 'react';
import { BrandOS } from '@pasadium/bridge';
import { SecurityState, AuditLog } from '@pasadium/bridge/src/contracts/security';

export function useSecurity() {
  const [integrity, setIntegrity] = useState<SecurityState | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function syncSecurityStatus() {
    try {
      const [state, audit] = await Promise.all([
        BrandOS.security.getSystemIntegrity(),
        BrandOS.security.getAuditLogs()
      ]);
      setIntegrity(state);
      setLogs(audit);
    } catch (e) {
      console.error("Security sync failed", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    syncSecurityStatus();
    const interval = setInterval(syncSecurityStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    integrity,
    logs,
    loading,
    syncSecurityStatus
  };
}
