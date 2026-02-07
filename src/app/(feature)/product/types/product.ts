export interface Product {
  id: number;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export type OrderType = 'buy' | 'sell';

export interface Order {
  id: number;
  productId: number;
  userId: number;
  type: OrderType;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}