import { BaseService, IHttpClient } from './base';
import { Cart, CartItem, ApiResponse } from '@/types';

/**
 * Cart Service Interface
 */
export interface ICartService {
  getCart(): Promise<Cart>;
  addToCart(productId: number, quantity: number): Promise<Cart>;
  updateCartItem(itemId: number, quantity: number): Promise<Cart>;
  removeFromCart(itemId: number): Promise<Cart>;
  clearCart(): Promise<void>;
  getCartItemCount(): Promise<number>;
  getCartTotal(): Promise<number>;
}

/**
 * Cart Service implementation
 */
export class CartService extends BaseService implements ICartService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get current user's cart
   */
  async getCart(): Promise<Cart> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Cart>>('/cart');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch cart');
    }, 'Failed to fetch cart');
  }

  /**
   * Add product to cart
   */
  async addToCart(productId: number, quantity: number): Promise<Cart> {
    this.validateRequired({ productId, quantity }, ['productId', 'quantity']);

    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<Cart>>(
        '/cart/add',
        { productId, quantity }
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to add item to cart');
    }, `Failed to add product ${productId} to cart`);
  }

  /**
   * Update cart item quantity
   */
  async updateCartItem(itemId: number, quantity: number): Promise<Cart> {
    this.validateRequired({ itemId, quantity }, ['itemId', 'quantity']);

    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    return this.handleRequest(async () => {
      const response = await this.httpClient.put<ApiResponse<Cart>>(
        `/cart/items/${itemId}`,
        { quantity }
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update cart item');
    }, `Failed to update cart item ${itemId}`);
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(itemId: number): Promise<Cart> {
    this.validateRequired({ itemId }, ['itemId']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<Cart>>(
        `/cart/items/${itemId}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to remove item from cart');
    }, `Failed to remove cart item ${itemId}`);
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<void> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<void>>('/cart/clear');
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to clear cart');
      }
    }, 'Failed to clear cart');
  }

  /**
   * Get total number of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<{ count: number }>>('/cart/count');
      
      if (response.success && response.data) {
        return response.data.count;
      }
      
      return 0;
    }, 'Failed to get cart item count');
  }

  /**
   * Get cart total amount
   */
  async getCartTotal(): Promise<number> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<{ total: number }>>('/cart/total');
      
      if (response.success && response.data) {
        return response.data.total;
      }
      
      return 0;
    }, 'Failed to get cart total');
  }

  /**
   * Move item from cart to wishlist (if wishlist exists)
   */
  async moveToWishlist(itemId: number): Promise<void> {
    this.validateRequired({ itemId }, ['itemId']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<void>>(
        `/cart/items/${itemId}/move-to-wishlist`
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to move item to wishlist');
      }
    }, `Failed to move cart item ${itemId} to wishlist`);
  }

  /**
   * Save cart for later (guest to user migration)
   */
  async saveCartForLater(): Promise<void> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<void>>('/cart/save-for-later');
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to save cart for later');
      }
    }, 'Failed to save cart for later');
  }

  /**
   * Validate cart before checkout
   */
  async validateCart(): Promise<{ isValid: boolean; errors: string[] }> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<{ isValid: boolean; errors: string[] }>>(
        '/cart/validate'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      return { isValid: false, errors: ['Failed to validate cart'] };
    }, 'Failed to validate cart');
  }

  /**
   * Apply coupon code to cart
   */
  async applyCoupon(couponCode: string): Promise<Cart> {
    this.validateRequired({ couponCode }, ['couponCode']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<Cart>>(
        '/cart/apply-coupon',
        { couponCode }
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to apply coupon');
    }, `Failed to apply coupon: ${couponCode}`);
  }

  /**
   * Remove coupon from cart
   */
  async removeCoupon(): Promise<Cart> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<Cart>>('/cart/remove-coupon');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to remove coupon');
    }, 'Failed to remove coupon');
  }
}