export type SecurityPosture = 'SECURE' | 'ADAPTIVE' | 'ELEVATED' | 'RESTRICTED';

export interface SecurityState {
  posture: SecurityPosture;
  intensity: number; // 0.0 to 2.0
  activity: 'QUIET' | 'ACTIVE' | 'HIGH';
  healthIndex: number; // 0.0 to 100.0
  kernelState: 'LOCKED' | 'ADAPTIVE' | 'OPEN';
  memoryIntegrity: 'VERIFIED' | 'COMPROMISED' | 'SYNCING';
  uptime: string;
  activeNodes: number;
  lastAudit: {
    time: string;
    event: string;
  };
}

export interface AuditLog {
  time: string;
  event: string;
  status: 'SUCCESS' | 'ACTIVE' | 'FAILED' | 'PENDING';
}

export interface SecurityCapability {
  getPosture(): Promise<SecurityState>;
  getSystemIntegrity(): Promise<SecurityState>;
  getAuditLogs(): Promise<AuditLog[]>;
  requestMaintenance(action: string): Promise<{ success: boolean }>;
}
