// src/lib/api.ts
import { ApiResponse } from '@/types/auth';
import { error } from 'console';
import { toast } from 'react-toastify';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44340';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    captchaKey?: string
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'X-Captcha-Token': captchaKey ?? '',
        ...options.headers,
      },
      ...options,
    };

    let res: ApiResponse<T> = {} as ApiResponse<T>;
    // try {
      const response=  await fetch(url, config);
     
      debugger
      const data = await response.json();

      debugger
      if (!response.ok) {
        debugger
        toast.error("error")
        console.log(data)
        res
      } else {
        debugger
        console.log(data)

      }
      debugger
       return data;
    // } catch (error: any) {

    //   console.log(error)

    //   debugger
    //   return { ...res, isSuccess: false, data: {} as T, errors: ['خطايي رخ داده است لطفا بعدا تلاش نماييد'] };
    // }
  }

  async get<T>(endpoint: string, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, captchaKey);
  }

  async post<T>(endpoint: string, data?: any, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    },
      captchaKey
    );
  }

  async put<T>(endpoint: string, data?: any, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    },
      captchaKey
    );
  }

  async delete<T>(endpoint: string, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, captchaKey);
  }
}

export const api = new ApiClient();