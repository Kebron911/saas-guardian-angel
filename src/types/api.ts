export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  updated_at?: string;
  display_name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refresh_token?: string;
}
