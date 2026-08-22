import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

import type {
  AdminLog,
  AdminSnapshot,
  AdminStats,
  AdminVerification,
  AdminWorker,
} from '@pasadium/bridge';

export const useAdmin = () => {
  const { bridge } = useAuth();

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [workers, setWorkers] = useState<AdminWorker[]>([]);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [verification, setVerification] = useState<AdminVerification | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const snapshot: AdminSnapshot = await bridge.admin.getSnapshot();

      setStats(snapshot.stats);
      setWorkers(snapshot.workers);
      setLogs(snapshot.logs);
      setVerification(snapshot.verification);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('ADMIN_SYNC_FAILURE')
      );
    } finally {
      setLoading(false);
    }
  }, [bridge]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    stats,
    workers,
    logs,
    verification,
    loading,
    error,
    refresh,
  };
};
