/**
 * API Client
 * Centralized HTTP client for making API requests
 */

import { API_BASE_URL, API_TIMEOUT, DEFAULT_HEADERS } from '../config/api.config';
import { APP_CONFIG } from '../config/app.config';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Get authorization token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Make an HTTP request
 */
async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Add default headers
  const headers: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...(options.headers as Record<string, string>),
  };
  
  // Add authorization token if available
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new ApiError(
        data.message || 'Request failed',
        response.status,
        data
      );
    }
    
    return {
      success: true,
      data,
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }
    
    return {
      success: false,
      error: error.message || 'Network error',
    };
  }
}

/**
 * API Client methods
 */
export const apiClient = {
  /**
   * GET request
   */
  get: <T = any>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  
  /**
   * POST request
   */
  post: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  /**
   * PUT request
   */
  put: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  /**
   * PATCH request
   */
  patch: <T = any>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  /**
   * DELETE request
   */
  delete: <T = any>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
