import apiClient from '@/lib/api';
import { LoginDto, RegisterDto, User } from '@/types/api';

export const authService = {
  async login(credentials: LoginDto): Promise<{ user: User; token: string }> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterDto): Promise<{ user: User; token: string }> {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get('/user/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  setStoredAuth(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};