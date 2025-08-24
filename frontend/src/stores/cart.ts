import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'
import { api } from '@/lib/api'

interface CartState {
  items: CartItem[]
  isLoading: boolean
  addItem: (productId: number, quantity?: number) => Promise<void>
  removeItem: (itemId: number) => Promise<void>
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  clearCart: () => void
  fetchCart: () => Promise<void>
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (productId: number, quantity = 1) => {
        set({ isLoading: true })
        try {
          await api.post('/cart', { productId, quantity })
          await get().fetchCart()
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      removeItem: async (itemId: number) => {
        set({ isLoading: true })
        try {
          await api.delete(`/cart/${itemId}`)
          set(state => ({
            items: state.items.filter(item => item.id !== itemId),
            isLoading: false
          }))
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      updateQuantity: async (itemId: number, quantity: number) => {
        set({ isLoading: true })
        try {
          await api.put(`/cart/${itemId}`, { quantity })
          set(state => ({
            items: state.items.map(item => 
              item.id === itemId ? { ...item, quantity } : item
            ),
            isLoading: false
          }))
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      fetchCart: async () => {
        set({ isLoading: true })
        try {
          const response = await api.get<CartItem[]>('/cart')
          set({ items: response.data, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.productPrice * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)