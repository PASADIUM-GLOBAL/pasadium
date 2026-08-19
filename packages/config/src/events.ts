export type SecurityClassification = 'public' | 'internal' | 'private';
export type ConnectionStatus = 'connected' | 'reconnecting' | 'degraded' | 'offline';

export interface SovereignEvent<T = any> {
  id: string;
  type: string;
  version: number;
  timestamp: string;
  actor: {
    userId?: string;
    serviceId?: string;
  };
  subject: {
    type: string;
    id: string;
  };
  correlationId: string;
  payload: T;
  security: {
    classification: SecurityClassification;
  };
}

export interface RealtimeState {
  status: ConnectionStatus;
  latency: number;
  lastSync: string;
}
