import { apiClient } from "../shared/utils/api-client";

export const mediaApi = {
  getFeed: async () => {
    return apiClient.get<any[]>('/media/feed');
  },
  publishContent: async (content: any) => {
    return apiClient.post('/media/publish', content);
  },
};
