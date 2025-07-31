import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

/**
 * Base API Configuration following OOP principles
 */
export class ApiConfig {
  public static readonly BASE_URL = 'http://localhost:5095/api';
  public static readonly TIMEOUT = 10000;
  
  // Cookie names
  public static readonly TOKEN_COOKIE = 'ecommerce_token';
  public static readonly REFRESH_TOKEN_COOKIE = 'ecommerce_refresh_token';
}

/**
 * HTTP Client Interface for dependency injection
 */
export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
}

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  public statusCode: number;
  public response?: any;

  constructor(message: string, statusCode: number, response?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * HTTP Client implementation using Axios
 */
export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ApiConfig.BASE_URL,
      timeout: ApiConfig.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get(ApiConfig.TOKEN_COOKIE);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        const statusCode = error.response?.status || 500;
        const errorData = error.response?.data as any;
        const message = errorData?.message || error.message || 'An error occurred';
        
        // Handle unauthorized errors
        if (statusCode === 401) {
          // Clear tokens and redirect to login
          Cookies.remove(ApiConfig.TOKEN_COOKIE);
          Cookies.remove(ApiConfig.REFRESH_TOKEN_COOKIE);
          
          // Don't redirect if already on login page
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
            window.location.href = '/auth/login';
          }
        }

        throw new ApiError(message, statusCode, error.response?.data);
      }
    );
  }

  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.axiosInstance.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.axiosInstance.delete(url, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.patch(url, data, config);
    return response.data;
  }
}

/**
 * Base Service class implementing common patterns
 */
export abstract class BaseService {
  protected httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Handle async operations with error logging
   */
  protected async handleRequest<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'Operation failed'
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      console.error(`${errorMessage}:`, error);
      throw error;
    }
  }

  /**
   * Build query parameters
   */
  protected buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Validate required parameters
   */
  protected validateRequired(params: Record<string, any>, requiredFields: string[]): void {
    const missingFields = requiredFields.filter(field => 
      params[field] === null || params[field] === undefined || params[field] === ''
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }
}

// Create singleton instance of HTTP client
export const httpClient = new HttpClient();