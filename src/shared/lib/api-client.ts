// lib/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { ApiResponse, LoginResponse } from '../types/api-error.type';
import { useAuthStore } from '@/app/(feature)/(auth)/store/auth.store';

class ApiClient {
  private baseURL: string;
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:44340';

    // Create axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // ضروری برای ارسال کوکی‌ها (HttpOnly tokens)
    });

    // Setup interceptors once
    this.setupInterceptors();
  }

  // Setup response interceptor (از کد دوم گرفته شده، با بهبود)
  private setupInterceptors() {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => this.axiosInstance(originalRequest))
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            await this.refreshToken(); // Refresh token
            this.processQueue(null); // Success: resolve queued requests
            return this.axiosInstance(originalRequest); // Retry original
          } catch (refreshError) {
            this.processQueue(refreshError); // Fail: reject queued
            useAuthStore.getState().logout(); // Logout
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Process queued requests (از کد دوم)
  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      error ? prom.reject(error) : prom.resolve(token);
    });
    this.failedQueue = [];
  }

  // Refresh token method (از refreshTokenApi گرفته شده)
  public async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<LoginResponse>> = await this.axiosInstance.post(
        '/api/account/refresh-token',
        {},
        { withCredentials: true } // تضمینی برای credentials
      );
      return response.status >= 200 && response.status < 300 ? response.data : { isSuccess: false, data: {} as LoginResponse, errors: ['خطا در refresh'] };
    } catch (error: any) {
      return { isSuccess: false, data: {} as LoginResponse, errors: ['خطا در refresh token'] };
    }
  }

  // Private request method (بهبودیافته از کد اول)
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
        console.warn('Non-2xx response:', response.data); // بهتر از log ساده
        return {
          isSuccess: false,
          data: {} as T,
          errors: ['خطایی سمت سرور رخ داده است'],
        };
      }
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }

  // Centralized error handling (بهبود: کمتر تکرار)
  private handleError<T>(error: AxiosError | any): ApiResponse<T> {
   // console.error('API Error:', error); // Log for debugging

    const isCorsError = this.isCorsError(error);

    if (isCorsError) {
      return {
        isSuccess: false,
        data: {} as T,
        errors: ['لطفا بعدا تلاش نمایید'],
      };
    }

    if (error.response) {
      return {
        isSuccess: false,
        data: {} as T,
        errors: error.response.data?.errors || ['خطایی رخ داده است'],
      };
    } else if (error.request) {
      return {
        isSuccess: false,
        data: {} as T,
        errors: ['خطایی در ارتباط با سرور رخ داده است'],
      };
    } else {
      return {
        isSuccess: false,
        data: {} as T,
        errors: ['خطایی رخ داده است لطفا بعدا تلاش نمایید'],
      };
    }
  }

  // CORS error detection (بهبود: ساده‌تر)
  private isCorsError(error: AxiosError): boolean {
    if (!error.response) {
      const message = error.message?.toLowerCase() || '';
      const corsIndicators = [
        'network error',
        'cross-origin',
        'cors',
        'failed to fetch',
        'access-control',
        'origin not allowed',
      ];
      return corsIndicators.some((indicator) => message.includes(indicator));
    }
    return false;
  }

  // Public methods (همون کد اول، بدون تغییر زیاد)
  async get<T>(endpoint: string, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' }, captchaKey);
  }

  async post<T>(endpoint: string, data?: any, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', data }, captchaKey);
  }

  async put<T>(endpoint: string, data?: any, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', data }, captchaKey);
  }

  async delete<T>(endpoint: string, captchaKey?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' }, captchaKey);
  } 
}

export const api = new ApiClient();
export default api;