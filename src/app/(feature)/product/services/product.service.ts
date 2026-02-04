import { NextResponse } from 'next/server';
import api from '@/shared/lib/api-client'
import { Product } from '../types/product';
import { ApiResponse } from '@/shared/types/api-error.type';

// API endpoint
export const fetchProductsApi = async (): Promise<ApiResponse<Product[]>> => {
  const response = await api.get<Product[]>('/api/product/getAll');
  debugger;
  return response;
};