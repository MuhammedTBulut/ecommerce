import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id);
          
          let newItems;
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { product, quantity }];
          }
          
          const newState = { ...state, items: newItems };
          const totals = calculateTotals(newItems);
          return { ...newState, ...totals };
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.product.id !== productId);
          const totals = calculateTotals(newItems);
          return { ...state, items: newItems, ...totals };
        });
      },

      updateItemQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.product.id !== productId);
            const totals = calculateTotals(newItems);
            return { ...state, items: newItems, ...totals };
          }
          
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          const totals = calculateTotals(newItems);
          return { ...state, items: newItems, ...totals };
        });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      calculateTotals: () => {
        set((state) => {
          const totals = calculateTotals(state.items);
          return { ...state, ...totals };
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function calculateTotals(items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { totalItems, totalPrice };
}