import { User, LoginDTO, RegisterDTO } from '@/types';
import { StorageHelper } from '@/lib/utils';

/**
 * Mock Authentication Service for development when backend is not available
 */
export class MockAuthService {
  private static readonly MOCK_USERS_KEY = 'mock_users';
  private static readonly CURRENT_USER_KEY = 'current_user';
  private static readonly AUTH_TOKEN_KEY = 'auth_token';

  /**
   * Default mock users for testing
   */
  private static getDefaultUsers(): User[] {
    return [
      {
        id: 1,
        fullName: 'Admin User',
        email: 'admin@example.com',
        role: 'Admin',
        birthDate: '1990-01-01',
        gender: true
      },
      {
        id: 2,
        fullName: 'John Customer',
        email: 'customer@example.com',
        role: 'Customer',
        birthDate: '1995-06-15',
        gender: true
      },
      {
        id: 3,
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'Customer',
        birthDate: '1988-03-20',
        gender: false
      }
    ];
  }

  /**
   * Initialize mock users in localStorage
   */
  static initializeMockUsers(): void {
    const existingUsers = StorageHelper.getItem<User[]>(this.MOCK_USERS_KEY);
    if (!existingUsers) {
      StorageHelper.setItem(this.MOCK_USERS_KEY, this.getDefaultUsers());
    }
  }

  /**
   * Mock login function
   */
  static async login(credentials: LoginDTO): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      // Simulate API delay
      setTimeout(() => {
        this.initializeMockUsers();
        const users = StorageHelper.getItem<User[]>(this.MOCK_USERS_KEY) || [];
        
        // Simple password check - in development, any password works for demo
        const user = users.find(u => u.email === credentials.email);
        
        if (!user) {
          reject(new Error('Invalid email or password'));
          return;
        }

        // Generate mock JWT token
        const token = this.generateMockToken(user);
        
        // Store current user and token
        StorageHelper.setItem(this.CURRENT_USER_KEY, user);
        StorageHelper.setItem(this.AUTH_TOKEN_KEY, token);

        resolve({ user, token });
      }, 1000); // 1 second delay to simulate network request
    });
  }

  /**
   * Mock register function
   */
  static async register(userData: RegisterDTO): Promise<{ user: User; token: string }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.initializeMockUsers();
        const users = StorageHelper.getItem<User[]>(this.MOCK_USERS_KEY) || [];
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
          reject(new Error('User with this email already exists'));
          return;
        }

        // Create new user
        const newUser: User = {
          id: users.length + 1,
          fullName: userData.fullName,
          email: userData.email,
          role: 'Customer',
          birthDate: userData.birthDate,
          gender: userData.gender
        };

        // Add to users array
        users.push(newUser);
        StorageHelper.setItem(this.MOCK_USERS_KEY, users);

        // Generate token and store user
        const token = this.generateMockToken(newUser);
        StorageHelper.setItem(this.CURRENT_USER_KEY, newUser);
        StorageHelper.setItem(this.AUTH_TOKEN_KEY, token);

        resolve({ user: newUser, token });
      }, 1500); // 1.5 second delay
    });
  }

  /**
   * Mock logout function
   */
  static async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        StorageHelper.removeItem(this.CURRENT_USER_KEY);
        StorageHelper.removeItem(this.AUTH_TOKEN_KEY);
        resolve();
      }, 500);
    });
  }

  /**
   * Get current user from storage
   */
  static getCurrentUser(): User | null {
    return StorageHelper.getItem<User>(this.CURRENT_USER_KEY);
  }

  /**
   * Get current token from storage
   */
  static getToken(): string | null {
    return StorageHelper.getItem<string>(this.AUTH_TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    const token = this.getToken();
    return !!(user && token);
  }

  /**
   * Generate mock JWT token
   */
  private static generateMockToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }

  /**
   * Validate mock token
   */
  static validateToken(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1]));
      const expirationTime = payload.exp * 1000;
      
      return Date.now() < expirationTime;
    } catch {
      return false;
    }
  }

  /**
   * Clear all mock data (useful for testing)
   */
  static clearMockData(): void {
    StorageHelper.removeItem(this.MOCK_USERS_KEY);
    StorageHelper.removeItem(this.CURRENT_USER_KEY);
    StorageHelper.removeItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Get all mock users (for admin purposes)
   */
  static getAllUsers(): User[] {
    this.initializeMockUsers();
    return StorageHelper.getItem<User[]>(this.MOCK_USERS_KEY) || [];
  }

  /**
   * Reset password for mock user (for forgot password functionality)
   */
  static async resetPassword(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.initializeMockUsers();
        const users = StorageHelper.getItem<User[]>(this.MOCK_USERS_KEY) || [];
        const user = users.find(u => u.email === email);
        
        // In a real app, this would send an email
        // For demo purposes, we'll just return success if user exists
        resolve(!!user);
      }, 1000);
    });
  }
}