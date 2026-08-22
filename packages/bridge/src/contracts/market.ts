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

export interface MarginBreakdown {
  sourcingCost: number;
  importTariffs: number;
  platformFee: number;
  calculatedMargin: number;
  finalListPrice: number;
  markupPercentage: number;
  isHedged: boolean;
  isDynamicMarkup: boolean;
}

export interface LogisticsNode {
  id: string;
  label: string;
  status: 'ACTIVE' | 'TRANSIT' | 'PENDING' | 'ERROR';
  detail: string;
  integrity: number;
}

export interface LogisticsStatus {
  nodes: LogisticsNode[];
  globalIntegrity: number;
}

export interface MarketCapability {
  getSupplyChainStatus(): Promise<SupplyChainNode[]>;
  getInventory(): Promise<InventoryItem[]>;
  calculateMargin(productId: string): Promise<MarginBreakdown>;
  synchronizeStorefront(provider: 'SHOPIFY' | 'WOOCOMMERCE'): Promise<{ success: boolean }>;
}
