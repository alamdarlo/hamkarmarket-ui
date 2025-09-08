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
  success: boolean;
  status: number;
  errors?: Record<string, string[]>;
}
