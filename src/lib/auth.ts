// src/lib/auth.ts
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { User, AuthResponse } from '@/types/auth';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createToken(payload: any): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<{ user: User | null; token: string | null }> {
  const cookieStore = cookies();
  const token = (await cookieStore).get('auth-token')?.value;
  
  if (!token) return { user: null, token: null };
  
  try {
    const payload = await verifyToken(token);
    return { user: payload as User, token };
  } catch (error) {
    return { user: null, token: null };
  }
}

export async function setSession(token: string, user: User): Promise<void> {
  const cookieStore = cookies();
  
  (await cookieStore).set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  
  (await cookieStore).set('user-data', JSON.stringify(user), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = cookies();
  (await cookieStore).delete('auth-token');
  (await cookieStore).delete('user-data');
}