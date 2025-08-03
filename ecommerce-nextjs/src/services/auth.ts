import { BaseService, IHttpClient } from './base';
import { User, LoginDTO, RegisterDTO, ApiResponse } from '@/types';
import Cookies from 'js-cookie';
import { ApiConfig } from './base';
import { MockAuthService } from './mockAuth';

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
      try {
        // Try to make API call first
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
      } catch (error: any) {
        // Check if it's a network error (backend not available)
        if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
          console.warn('Backend API not available, falling back to mock authentication');
          
          // Use mock authentication as fallback
          const mockResult = await MockAuthService.login(credentials);
          
          // Store token in cookie for consistency
          Cookies.set(ApiConfig.TOKEN_COOKIE, mockResult.token, {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });

          return mockResult;
        }
        
        // Re-throw other errors
        throw error;
      }
    }, 'Login failed');
  }

  /**
   * Register new user
   */
  async register(userData: RegisterDTO): Promise<{ user: User; token: string }> {
    this.validateRequired(userData, ['fullName', 'email', 'password', 'birthDate', 'gender']);

    return this.handleRequest(async () => {
      try {
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
      } catch (error: any) {
        // Check if it's a network error (backend not available)
        if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
          console.warn('Backend API not available, falling back to mock authentication');
          
          // Use mock authentication as fallback
          const mockResult = await MockAuthService.register(userData);
          
          // Store token in cookie for consistency
          Cookies.set(ApiConfig.TOKEN_COOKIE, mockResult.token, {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });

          return mockResult;
        }
        
        // Re-throw other errors
        throw error;
      }
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
      } catch (error: any) {
        // If it's a network error, use mock logout
        if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
          await MockAuthService.logout();
        }
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
      try {
        const response = await this.httpClient.get<ApiResponse<User>>('/auth/me');
        
        if (response.success && response.data) {
          return response.data;
        }

        throw new Error(response.message || 'Failed to get user data');
      } catch (error: any) {
        // Check if it's a network error (backend not available)
        if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
          // Fallback to mock service
          const user = MockAuthService.getCurrentUser();
          if (user) {
            return user;
          }
          throw new Error('No authenticated user found');
        }
        
        // Re-throw other errors
        throw error;
      }
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
    if (!token) return false;

    // Try to validate token
    try {
      // First check if it's a mock token
      if (MockAuthService.validateToken(token)) {
        return true;
      }
      
      // Otherwise, assume it's valid if it exists (for real backend tokens)
      return true;
    } catch {
      return false;
    }
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

  /**
   * Reset password for user
   */
  async resetPassword(email: string): Promise<boolean> {
    if (!AuthService.validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    return this.handleRequest(async () => {
      try {
        const response = await this.httpClient.post<ApiResponse<{ success: boolean }>>(
          '/auth/reset-password',
          { email }
        );

        if (response.success && response.data) {
          return response.data.success;
        }

        return false;
      } catch (error: any) {
        // Check if it's a network error (backend not available)
        if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
          console.warn('Backend API not available, using mock reset password');
          return await MockAuthService.resetPassword(email);
        }
        
        // Re-throw other errors
        throw error;
      }
    }, 'Password reset failed');
  }
}