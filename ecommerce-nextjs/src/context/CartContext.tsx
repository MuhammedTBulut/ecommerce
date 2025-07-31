'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartContextType } from '@/types';
import { cartService } from '@/services';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';

/**
 * Cart Context
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Props
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart Provider Component
 * Manages global cart state using Context API
 */
export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  /**
   * Initialize cart when user authentication changes
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  /**
   * Load cart from API
   */
  const loadCart = async (): Promise<void> => {
    try {
      setLoading(true);
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Failed to load cart:', error);
      // Don't show error toast for cart loading failures
      // as cart might not exist yet
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add product to cart
   */
  const addToCart = async (productId: number, quantity: number = 1): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to cart');
      return;
    }

    try {
      setLoading(true);
      const updatedCart = await cartService.addToCart(productId, quantity);
      setCart(updatedCart);
      toast.success('Item added to cart');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = async (itemId: number): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage cart');
      return;
    }

    try {
      setLoading(true);
      const updatedCart = await cartService.removeFromCart(itemId);
      setCart(updatedCart);
      toast.success('Item removed from cart');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update item quantity in cart
   */
  const updateQuantity = async (itemId: number, quantity: number): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage cart');
      return;
    }

    if (quantity < 0) {
      toast.error('Quantity cannot be negative');
      return;
    }

    if (quantity === 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      setLoading(true);
      const updatedCart = await cartService.updateCartItem(itemId, quantity);
      setCart(updatedCart);
      toast.success('Cart updated');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update cart';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear entire cart
   */
  const clearCart = async (): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage cart');
      return;
    }

    try {
      setLoading(true);
      await cartService.clearCart();
      setCart(null);
      toast.success('Cart cleared');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get cart item count
   */
  const getItemCount = (): number => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Get cart total amount
   */
  const getCartTotal = (): number => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  /**
   * Check if product is in cart
   */
  const isInCart = (productId: number): boolean => {
    if (!cart || !cart.items) return false;
    return cart.items.some(item => item.productId === productId);
  };

  /**
   * Get cart item by product ID
   */
  const getCartItem = (productId: number): CartItem | undefined => {
    if (!cart || !cart.items) return undefined;
    return cart.items.find(item => item.productId === productId);
  };

  /**
   * Apply coupon to cart
   */
  const applyCoupon = async (couponCode: string): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('Please log in to apply coupon');
      return;
    }

    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      setLoading(true);
      const updatedCart = await cartService.applyCoupon(couponCode);
      setCart(updatedCart);
      toast.success('Coupon applied successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to apply coupon';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove coupon from cart
   */
  const removeCoupon = async (): Promise<void> => {
    if (!isAuthenticated) {
      toast.error('Please log in to manage cart');
      return;
    }

    try {
      setLoading(true);
      const updatedCart = await cartService.removeCoupon();
      setCart(updatedCart);
      toast.success('Coupon removed');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove coupon';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Validate cart before checkout
   */
  const validateCart = async (): Promise<{ isValid: boolean; errors: string[] }> => {
    if (!isAuthenticated) {
      return { isValid: false, errors: ['Please log in to proceed'] };
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      return { isValid: false, errors: ['Cart is empty'] };
    }

    try {
      setLoading(true);
      const validation = await cartService.validateCart();
      return validation;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate cart';
      return { isValid: false, errors: [errorMessage] };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Refresh cart data
   */
  const refreshCart = async (): Promise<void> => {
    if (isAuthenticated) {
      await loadCart();
    }
  };

  /**
   * Context value object
   */
  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
    getItemCount,
    getCartTotal,
    isInCart,
    getCartItem,
    applyCoupon,
    removeCoupon,
    validateCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to use cart context
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}

/**
 * Hook for cart statistics
 */
export function useCartStats() {
  const { cart } = useCart();

  const itemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const totalAmount = cart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
  const uniqueItemCount = cart?.items?.length || 0;
  const isEmpty = itemCount === 0;

  return {
    itemCount,
    totalAmount,
    uniqueItemCount,
    isEmpty,
    hasItems: !isEmpty,
  };
}

/**
 * Mini cart component for header/navigation
 */
interface MiniCartProps {
  className?: string;
}

export function MiniCartIndicator({ className = '' }: MiniCartProps) {
  const { itemCount } = useCartStats();
  const { loading } = useCart();

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 00-.293.707V19a2 2 0 002 2h12a2 2 0 002-2v-2.586a1 1 0 00-.293-.707L15 13" 
        />
      </svg>
      
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </div>
  );
}

/**
 * Higher-order component for cart functionality
 */
export function withCart<P extends object>(
  Component: React.ComponentType<P & { cart: CartContextType }>
) {
  return function CartEnabledComponent(props: P) {
    const cart = useCart();
    return <Component {...props} cart={cart} />;
  };
}