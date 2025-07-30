import { create } from 'zustand';
import type { CartItemDTO } from '../types/api';

interface CartState {
  items: CartItemDTO[];
  isOpen: boolean;
  setItems: (items: CartItemDTO[]) => void;
  addItem: (item: CartItemDTO) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  isOpen: false,
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.productId === item.productId);
    if (existingItem) {
      return {
        items: state.items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity, totalPrice: (i.quantity + item.quantity) * i.productPrice }
            : i
        )
      };
    }
    return { items: [...state.items, item] };
  }),
  updateItem: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id
        ? { ...item, quantity, totalPrice: quantity * item.productPrice }
        : item
    )
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.totalPrice, 0);
  },
}));