export interface SupplyChainNode {
  label: string;
  status: 'ACTIVE' | 'TRANSIT' | 'PENDING' | 'ERROR';
  detail: string;
}

export interface InventoryItem {
  name: string;
  price: string;
  type: 'DIGITAL' | 'SERVICE' | 'PHYSICAL';
  status: string;
}

export interface MarginCalculation {
  sourcingCost: string;
  tariffs: string;
  shipping: string;
  targetProfit: string;
  finalPrice: string;
}

export interface MarketCapability {
  getSupplyChainStatus(): Promise<SupplyChainNode[]>;
  getInventory(): Promise<InventoryItem[]>;
  calculateMargin(productId: string): Promise<MarginCalculation>;
  synchronizeStorefront(provider: 'SHOPIFY' | 'WOOCOMMERCE'): Promise<{ success: boolean }>;
}
