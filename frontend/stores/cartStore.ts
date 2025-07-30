import { create } from 'zustand'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalAmount: 0,

  addItem: (product: Product, quantity = 1) => {
    const { items } = get()
    const existingItem = items.find(item => item.productId === product.id)

    let newItems: CartItem[]
    if (existingItem) {
      newItems = items.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        product,
        quantity,
        userId: '', // Will be set when user logs in
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      newItems = [...items, newItem]
    }

    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = newItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    )

    set({ items: newItems, totalItems, totalAmount })
  },

  removeItem: (productId: string) => {
    const { items } = get()
    const newItems = items.filter(item => item.productId !== productId)
    
    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = newItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    )

    set({ items: newItems, totalItems, totalAmount })
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    const { items } = get()
    const newItems = items.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    )

    const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = newItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    )

    set({ items: newItems, totalItems, totalAmount })
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalAmount: 0 })
  },

  getItemQuantity: (productId: string) => {
    const { items } = get()
    const item = items.find(item => item.productId === productId)
    return item ? item.quantity : 0
  }
}))