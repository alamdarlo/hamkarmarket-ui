export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sellPrice?: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
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