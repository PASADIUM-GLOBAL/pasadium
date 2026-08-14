export interface AdminUser {
  id: string;
  username: string;
  role: 'SuperAdmin' | 'Admin' | 'Operator';
  status: 'Active' | 'Suspended';
  lastLogin: string;
}

export interface SystemHealth {
  cpu: string;
  memory: string;
  uptime: string;
  status: 'Healthy' | 'Warning' | 'Critical';
}

export interface SecurityLog {
  timestamp: string;
  event: string;
  user: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Allowed' | 'Blocked';
}

export const mockAdminApi = {
  getSystemHealth: async (): Promise<SystemHealth> => {
    return {
      cpu: '12%',
      memory: '4.2GB / 16GB',
      uptime: '14d 6h 22m',
      status: 'Healthy',
    };
  },

  getUsers: async (): Promise<AdminUser[]> => {
    return [
      { id: 'u1', username: 'root_admin', role: 'SuperAdmin', status: 'Active', lastLogin: '2026-08-14 09:12' },
      { id: 'u2', username: 'ops_lead', role: 'Admin', status: 'Active', lastLogin: '2026-08-14 11:45' },
      { id: 'u3', username: 'security_analyst', role: 'Operator', status: 'Active', lastLogin: '2026-08-13 16:20' },
      { id: 'u4', username: 'legacy_user', role: 'Operator', status: 'Suspended', lastLogin: '2026-07-01 08:00' },
    ];
  },

  getSecurityLogs: async (): Promise<SecurityLog[]> => {
    return [
      { timestamp: '2026-08-14 12:01', event: 'Failed login attempt', user: 'unknown', severity: 'Medium', status: 'Blocked' },
      { timestamp: '2026-08-14 11:45', event: 'User role updated', user: 'root_admin', severity: 'Low', status: 'Allowed' },
      { timestamp: '2026-08-14 10:20', event: 'API Rate limit exceeded', user: 'api_service_v1', severity: 'Medium', status: 'Blocked' },
      { timestamp: '2026-08-14 09:05', event: 'SSH access from new IP', user: 'ops_lead', severity: 'High', status: 'Allowed' },
      { timestamp: '2026-08-14 08:30', event: 'System backup completed', user: 'system', severity: 'Low', status: 'Allowed' },
    ];
  },

  updateUserStatus: async (userId: string, status: 'Active' | 'Suspended') => {
    return { success: true, userId, status };
  },
};
