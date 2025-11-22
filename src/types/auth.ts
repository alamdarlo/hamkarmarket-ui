// src/types/auth.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface LoginCredentials {
  phoneNumber: string;
  captchaText: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  isSuccess: boolean;
  status: number;
  errors?: string[];
  error?: string;
}
export class Result<T = any> implements ApiResponse<T> {
  data?: T;
  message?: string;
  isSuccess: boolean;
  status: number;
  errors?: string[];
  error?: string;
    constructor(data: any | null, status: number, isSuccess: boolean, message?: string) {
        this.data = data;
        this.status = status;
        this.isSuccess = isSuccess;
        this.message = message;
    }
}
