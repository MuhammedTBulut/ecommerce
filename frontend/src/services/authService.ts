import { apiClient } from './apiClient';
import type {
  LoginDTO,
  UserRegisterDTO,
  AuthResponse,
  UserDTO,
  UserUpdateDTO,
} from '../types/api';

export const authService = {
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/Auth/login', credentials);
  },

  async register(userData: UserRegisterDTO): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/Auth/register', userData);
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getStoredUser(): UserDTO | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  },

  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  },
};

export const userService = {
  async getProfile(): Promise<UserDTO> {
    return apiClient.get<UserDTO>('/Users/me');
  },

  async updateProfile(userData: UserUpdateDTO): Promise<UserDTO> {
    return apiClient.put<UserDTO>('/Users/me', userData);
  },

  async deleteAccount(): Promise<void> {
    return apiClient.delete<void>('/Users/me');
  },
};