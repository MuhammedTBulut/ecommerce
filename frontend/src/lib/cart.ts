import apiClient from '@/lib/api';
import { CartItem, AddToCartDto } from '@/types/api';

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  async addToCart(item: AddToCartDto): Promise<void> {
    await apiClient.post('/cart', item);
  },

  async updateCartItem(cartItemId: number, quantity: number): Promise<void> {
    await apiClient.put(`/cart/${cartItemId}`, { quantity });
  },

  async removeFromCart(cartItemId: number): Promise<void> {
    await apiClient.delete(`/cart/${cartItemId}`);
  },

  async clearCart(): Promise<void> {
    await apiClient.delete('/cart');
  }
};