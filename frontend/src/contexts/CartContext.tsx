'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types/api';
import { cartService } from '@/lib/cart';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalAmount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      return;
    }

    try {
      setLoading(true);
      const cartItems = await cartService.getCart();
      setItems(cartItems);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      if (!isAuthenticated) {
        setItems([]);
        return;
      }

      try {
        setLoading(true);
        const cartItems = await cartService.getCart();
        setItems(cartItems);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        toast.error('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      await cartService.addToCart({ productId, quantity });
      await refreshCart();
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      await cartService.updateCartItem(cartItemId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      await cartService.removeFromCart(cartItemId);
      await refreshCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalAmount,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}