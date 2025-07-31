import { BaseService, IHttpClient } from './base';
import { User, LoginDTO, RegisterDTO, ApiResponse } from '@/types';
import Cookies from 'js-cookie';
import { ApiConfig } from './base';

/**
 * Authentication Service Interface
 */
export interface IAuthService {
  login(credentials: LoginDTO): Promise<{ user: User; token: string }>;
  register(userData: RegisterDTO): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  refreshToken(): Promise<string>;
  isAuthenticated(): boolean;
}

/**
 * Authentication Service implementation
 */
export class AuthService extends BaseService implements IAuthService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Login user with credentials
   */
  async login(credentials: LoginDTO): Promise<{ user: User; token: string }> {
    this.validateRequired(credentials, ['email', 'password']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<{ user: User; token: string }>>(
        '/auth/login',
        credentials
      );

      if (response.success && response.data) {
        // Store token in HTTP-only cookie (more secure)
        Cookies.set(ApiConfig.TOKEN_COOKIE, response.data.token, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        return response.data;
      }

      throw new Error(response.message || 'Login failed');
    }, 'Login failed');
  }

  /**
   * Register new user
   */
  async register(userData: RegisterDTO): Promise<{ user: User; token: string }> {
    this.validateRequired(userData, ['fullName', 'email', 'password', 'birthDate', 'gender']);

    return this.handleRequest(async () => {
      // Ensure user registers with Customer role only
      const registerData = {
        ...userData,
        role: 'Customer' // Force customer role as per requirements
      };

      const response = await this.httpClient.post<ApiResponse<{ user: User; token: string }>>(
        '/auth/register',
        registerData
      );

      if (response.success && response.data) {
        // Store token in HTTP-only cookie
        Cookies.set(ApiConfig.TOKEN_COOKIE, response.data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        return response.data;
      }

      throw new Error(response.message || 'Registration failed');
    }, 'Registration failed');
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    return this.handleRequest(async () => {
      // Call logout endpoint if available
      try {
        await this.httpClient.post('/auth/logout');
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }

      // Clear all auth cookies
      Cookies.remove(ApiConfig.TOKEN_COOKIE);
      Cookies.remove(ApiConfig.REFRESH_TOKEN_COOKIE);

      // Redirect to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }, 'Logout failed');
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<User>>('/auth/me');
      
      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to get user data');
    }, 'Failed to get current user');
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<string> {
    return this.handleRequest(async () => {
      const refreshToken = Cookies.get(ApiConfig.REFRESH_TOKEN_COOKIE);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.httpClient.post<ApiResponse<{ token: string }>>(
        '/auth/refresh',
        { refreshToken }
      );

      if (response.success && response.data) {
        // Update token cookie
        Cookies.set(ApiConfig.TOKEN_COOKIE, response.data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        return response.data.token;
      }

      throw new Error(response.message || 'Token refresh failed');
    }, 'Token refresh failed');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = Cookies.get(ApiConfig.TOKEN_COOKIE);
    return !!token;
  }

  /**
   * Get user role from token (client-side helper)
   */
  getUserRole(): string | null {
    if (typeof window === 'undefined') return null;

    const token = Cookies.get(ApiConfig.TOKEN_COOKIE);
    if (!token) return null;

    try {
      // Decode JWT token to get role (basic implementation)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Check if current user is admin
   */
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin' || role === 'SuperAdmin';
  }

  /**
   * Get token for API calls
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return Cookies.get(ApiConfig.TOKEN_COOKIE) || null;
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}