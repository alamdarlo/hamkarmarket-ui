// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api';
import { setSession } from '@/lib/auth';
import { LoginCredentials, AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json();
    
    // Call your backend API
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (!response.data) {
      throw new Error('Login failed');
    }

    const { user, token } = response.data;
    
    // Set session cookies
    await setSession(token, user);
    
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Login failed' },
      { status: 400 }
    );
  }
}