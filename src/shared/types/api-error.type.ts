export interface ApiError {
  message: string
  code?: string
  error?: string
  data?: any
  errors?: Record<string, string[]>
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  data: T;
  message?: string;
  error?: string;
  statusCode?: string;
  errors?: string[];
}


export interface LoginResponse {
  // بر اساس response لاگین‌ت پر کن (مثال)
  user?: {
    id: string;
    name: string;
    lastName: string;
    phoneNumber: string;
    roles: string[];
  };
  // اگر لازم باشه، expires_in و ... اضافه کن
}


export interface AuthUser {
  id: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
}

