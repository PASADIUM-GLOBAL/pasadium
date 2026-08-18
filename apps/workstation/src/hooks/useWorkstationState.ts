import { useState, useEffect } from 'react';
import { BrandOS } from '@pasadium/bridge';

export type ModuleID = 'TRADE' | 'MEDIA' | 'MARKET' | 'SECURITY' | 'ADMIN';

export type SystemPosture = 'SECURE' | 'ADAPTIVE' | 'ELEVATED' | 'RESTRICTED';

export interface WorkstationState {
  activeModule: ModuleID;
  system: {
    posture: SystemPosture;
    activity: 'QUIET' | 'NORMAL' | 'HIGH';
    load: number;
    latencyMs: number;
  };
  connection: {
    status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
    lastSync: string;
  };
}

export function useWorkstationState() {
  const [state, setState] = useState<Partial<WorkstationState>>({
    activeModule: 'TRADE',
    system: {
      posture: 'SECURE',
      activity: 'NORMAL',
      load: 0,
      latencyMs: 0,
    },
    connection: {
      status: 'ONLINE',
      lastSync: new Date().toISOString(),
    },
  });

  useEffect(() => {
    async function syncSystemStatus() {
      try {
        // In a real scenario, we would call BrandOS.system.getStatus()
        // For now, we use the Simulation runtime via BrandOS
        const status = await BrandOS.security.getPosture();
        
        setState(prev => ({
          ...prev,
          system: {
            ...prev.system,
            posture: status.posture as SystemPosture,
            activity: status.activity as 'QUIET' | 'NORMAL' | 'HIGH',
            load: status.intensity * 50, // Translate intensity to load percentage
            latencyMs: 24 + Math.floor(Math.random() * 10),
          }
        }));
      } catch (e) {
        console.error("System Sync Failed", e);
      }
    }

    syncSystemStatus();
    const interval = setInterval(syncSystemStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return {
    state,
    setState
  };
}
