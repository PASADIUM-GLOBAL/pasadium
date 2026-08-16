import { apiClient } from "@pasadium/utils";
import { SystemHealth, AdminUser } from "@/lib/mock-api";

export const adminApi = {
  getSystemHealth: async () => {
    return apiClient.get<SystemHealth>('/admin/health');
  },
  getUsers: async () => {
    return apiClient.get<AdminUser[]>('/admin/users');
  },
  getSecurityLogs: async () => {
    return apiClient.get<any[]>('/admin/logs');
  },
  updateUserStatus: async (userId: string, status: string) => {
    return apiClient.post('/admin/users/status', { userId, status });
  },
};
