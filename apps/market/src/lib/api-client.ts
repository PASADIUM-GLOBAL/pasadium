import { apiClient } from "../shared/utils/api-client";

export const marketApi = {
  getProducts: async () => {
    return apiClient.get<any[]>('/market/products');
  },
  addToCart: async (productId: string) => {
    return apiClient.post('/market/cart', { productId });
  },
};
