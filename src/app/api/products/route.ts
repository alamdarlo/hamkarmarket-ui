import { NextResponse } from 'next/server';

const mockProducts = [
  {
    id: 1,
    name: 'سبد ماهی آذر 1404 ',
    description: 'سبد ماهی آذر 1404 ',
    price: 65000000,
    sellPrice: 60000000,
    unit:'سبد',
    quantity:2,
    image: '/productsImg/fish1.jpg',
    category: 'electronics',
    stock: 15,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'سبد کالای برنج آذر 1404 ',
    description: 'سبد کالای برنج آذر (20کیلوگرم در 2 کیسه)1404 ',
    price: 65000000,
    sellPrice: 60000000,
    unit:'سبد',
    quantity:2,
    image: '/productsImg/rice1.jpg',
    category: 'electronics',
    stock: 15,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'آجیل و گز شب یلدا 1404 ',
    description: 'آجیل و گز شب یلدا 1404',
    price: 65000000,
    sellPrice: 60000000,
    unit:'سبد',
    quantity:2,
    image: '/productsImg/ajil.jpg',
    category: 'electronics',
    stock: 15,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  // محصولات دیگر...
];

export async function GET() {
  try {
    // در پروژه واقعی، داده‌ها را از دیتابیس بگیرید
    return NextResponse.json(mockProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در دریافت محصولات' },
      { status: 500 }
    );
  }
}