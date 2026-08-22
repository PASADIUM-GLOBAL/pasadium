import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

export const useSecurity = () => {
  const { bridge } = useAuth();
  const [integrity, setIntegrity] = useState<any>(null);

  const fetchIntegrity = async () => {
    try {
      const data = await bridge.security.getIntegrity();
      setIntegrity(data);
      return data;
    } catch (err) {
      console.error("INTEGRITY_SYNC_FAILURE:", err);
    }
  };

  const requestMaintenance = async (action: string) => {
    return await bridge.security.requestMaintenance(action);
  };

  return { integrity, fetchIntegrity, requestMaintenance };
};
