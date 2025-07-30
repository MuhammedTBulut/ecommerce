import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // TODO: Implement actual API call
          // const response = await api.login({ email, password });
          
          // Mock login for now
          const mockUser: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'user',
            addresses: [],
            createdAt: new Date().toISOString(),
          };
          
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true });
        try {
          // TODO: Implement actual API call
          // const response = await api.register(userData);
          
          // Mock registration for now
          const mockUser: User = {
            id: '1',
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: 'user',
            addresses: [],
            createdAt: new Date().toISOString(),
          };
          
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
      
      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        });
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);