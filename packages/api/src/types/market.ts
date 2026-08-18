export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  provider: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  items: CartItem[];
  paymentMethod: string;
}

export interface OrderResponse {
  orderId: string;
  status: 'processing' | 'confirmed' | 'shipped';
  total: string;
  timestamp: string;
}
