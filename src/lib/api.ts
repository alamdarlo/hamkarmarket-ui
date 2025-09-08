// src/lib/api.ts
import { ApiResponse } from '@/types/auth';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44340';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    captchaKey?:string
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'X-Captcha-Token':captchaKey??'',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(endpoint: string,captchaKey?:string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' },captchaKey);
  }

  async post<T>(endpoint: string, data?: any,captchaKey?:string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    },
    captchaKey
  );
  }

  async put<T>(endpoint: string, data?: any,captchaKey?:string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    captchaKey
  );
  }

  async delete<T>(endpoint: string,captchaKey?:string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' },captchaKey);
  }
}

export const api = new ApiClient();