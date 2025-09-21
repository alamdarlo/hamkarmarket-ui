// src/lib/api.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types/auth';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44340';

    // Create axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private axiosInstance;

  private async request<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
    captchaKey?: string
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {
      url: endpoint,
      headers: {
        'X-Captcha-Token': captchaKey ?? '',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.axiosInstance.request(config);

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        console.log(response.data);
        return {
          isSuccess: false,
          data: {} as T,
          errors: ['خطايي رخ داده است']
        } as ApiResponse<T>;
      }
    } catch (error: any) {
      console.log(error);

      // Check if it's a CORS error
      const isCorsError = this.isCorsError(error);

      if (isCorsError) {
        return {
          isSuccess: false,
          data: {} as T,
          errors: ['لطفا بعدا تلاش نماييد']
        } as ApiResponse<T>;
      }

      if (error.response) {
        return {
          isSuccess: false,
          data: {} as T,
          errors: error.response.data?.errors || ['خطايي رخ داده است']
        } as ApiResponse<T>;

      } else if (error.request) {
        // Request was made but no response received
        return {
          isSuccess: false,
          data: {} as T,
          errors: ['خطايي در ارتباط با سرور رخ داده است']
        } as ApiResponse<T>;

      } else {
        const isCorsError = this.isCorsError(error);
        console.log(isCorsError);
        // Other errors
        return {
          isSuccess: false,
          data: {} as T,
          errors: ['خطايي رخ داده است لطفا بعدا تلاش نماييد']
        } as ApiResponse<T>;
      }
    }
  }

  async get<T>(endpoint: string, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, captchaKey);
  }

  async post<T>(endpoint: string, data?: any, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      data: data,
    }, captchaKey);
  }

  async put<T>(endpoint: string, data?: any, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      data: data,
    }, captchaKey);
  }

  async delete<T>(endpoint: string, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, captchaKey);
  }

  // Method to detect CORS errors
  private isCorsError(error: AxiosError): boolean {
    // CORS errors typically have no response and specific error messages
    if (!error.response) {
      const errorMessage = error.message || '';

      // Common CORS error indicators
      const corsIndicators = [
        'network error',
        'cross-origin',
        'cors',
        'failed to fetch',
        'access-control',
        'origin not allowed'
      ];

      return corsIndicators.some(indicator =>
        errorMessage.toLowerCase().includes(indicator)
      );
    }

    return false;
  }

}

export const api = new ApiClient();


