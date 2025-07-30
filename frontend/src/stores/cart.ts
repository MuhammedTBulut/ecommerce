import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, Product } from '@/types'

interface CartStore {
  cart: Cart
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
        itemCount: 0,
      },
      
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.cart.items.find(item => item.product.id === product.id)
          
          if (existingItem) {
            existingItem.quantity += quantity
          } else {
            state.cart.items.push({
              id: `${product.id}-${Date.now()}`,
              product,
              quantity,
            })
          }
          
          return {
            cart: {
              ...state.cart,
              total: get().getTotal(),
              itemCount: get().getItemCount(),
            }
          }
        })
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter(item => item.product.id !== productId),
            total: get().getTotal(),
            itemCount: get().getItemCount(),
          }
        }))
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => {
          const item = state.cart.items.find(item => item.product.id === productId)
          if (item) {
            item.quantity = quantity
          }
          
          return {
            cart: {
              ...state.cart,
              total: get().getTotal(),
              itemCount: get().getItemCount(),
            }
          }
        })
      },
      
      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0,
            itemCount: 0,
          }
        })
      },
      
      getItemCount: () => {
        const state = get()
        return state.cart.items.reduce((count, item) => count + item.quantity, 0)
      },
      
      getTotal: () => {
        const state = get()
        return state.cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)