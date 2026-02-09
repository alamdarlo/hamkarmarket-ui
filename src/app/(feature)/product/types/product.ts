export interface Product {
  id: number;
  name: string;
  unit: string;
  description: string;
  quantity: number;
  avragePrice:number;
  maxPrice: number;
  minPrice: number;
  minDistance:number;
  minPriceInForce:number;
  step: number,
  imageUrl: string;
  category: string;
}

export type OrderType = 'buy' | 'sell';

export interface Order {
  id?: number;
  productId: number;
  userId?: number;
  type: OrderType;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt?: string;
}