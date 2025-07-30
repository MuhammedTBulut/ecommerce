import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  clearError: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      // This will be connected to actual API later
      console.log('Login attempt:', { email, password })
      // Simulated login for now
      set({
        isLoading: false,
        isAuthenticated: true,
        user: {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } as User,
        token: 'fake-token'
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      })
    }
  },

  register: async (userData: any) => {
    set({ isLoading: true, error: null })
    try {
      // This will be connected to actual API later
      console.log('Register attempt:', userData)
      set({ isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      })
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null
    })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
    }
  },

  clearError: () => set({ error: null }),

  setUser: (user: User) => set({ user })
}))