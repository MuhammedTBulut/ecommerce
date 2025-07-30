import { apiClient } from './apiClient';
import type {
  CartItemDTO,
  AddToCartDTO,
} from '../types/api';

export const cartService = {
  async getCart(): Promise<CartItemDTO[]> {
    return apiClient.get<CartItemDTO[]>('/Cart');
  },

  async addToCart(item: AddToCartDTO): Promise<CartItemDTO> {
    return apiClient.post<CartItemDTO>('/Cart', item);
  },

  async updateCartItem(id: number, quantity: number): Promise<CartItemDTO> {
    return apiClient.put<CartItemDTO>(`/Cart/${id}`, { quantity });
  },

  async removeFromCart(id: number): Promise<void> {
    return apiClient.delete<void>(`/Cart/${id}`);
  },

  async clearCart(): Promise<void> {
    return apiClient.delete<void>('/Cart/clear');
  },
};