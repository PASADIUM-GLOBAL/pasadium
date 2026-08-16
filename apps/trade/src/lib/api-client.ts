import { apiClient } from "@pasadium/utils";
import { PortfolioItem } from "@pasadium/api";

export const tradeApi = {
  getTickers: async () => {
    return apiClient.get<any[]>('/trade/tickers');
  },
  getPortfolio: async () => {
    return apiClient.get<PortfolioItem[]>('/trade/portfolio');
  },
};
