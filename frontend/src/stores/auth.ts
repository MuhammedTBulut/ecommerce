import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@/types'
import { api } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true })
        try {
          const response = await api.post<AuthResponse>('/auth/login', credentials)
          const { token, user } = response.data
          
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          set({ user, token, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (data: RegisterRequest) => {
        set({ isLoading: true })
        try {
          const response = await api.post<AuthResponse>('/auth/register', data)
          const { token, user } = response.data
          
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          set({ user, token, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        set({ user: null, token: null })
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
)