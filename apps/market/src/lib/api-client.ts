import { apiClient } from "@pasadium/utils";

export const marketApi = {
  getProducts: async () => {
    return apiClient.get<any[]>('/market/products');
  },
  addToCart: async (productId: string) => {
    return apiClient.post('/market/cart', { productId });
  },
  purchaseProduct: async (productId: string) => {
    return apiClient.post('/market/purchase', { productId });
  },
};
