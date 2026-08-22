export interface AdminStats {
  systemLoad: number;
  activeWorkers: number;
  healthyWorkers: number;
  totalWorkers: number;
  integrity: number;
}

export interface AdminWorker {
  id: string;
  name: string;
  status: 'ONLINE' | 'BUSY' | 'IDLE' | 'OFFLINE' | 'ERROR';
  load: number;
}

export interface AdminVerification {
  id: string;
  type: 'ORDER' | 'ASSET' | 'TRANSACTION';
  reference: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED' | 'FLAGGED';
  asset: string;
  timestamp: string;
}

export interface AdminLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';
  source: string;
  message: string;
}

export interface AdminSnapshot {
  stats: AdminStats;
  workers: AdminWorker[];
  verification: AdminVerification | null;
  logs: AdminLog[];
}
