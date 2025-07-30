import apiClient from '@/lib/api';
import { Order } from '@/types/api';

export const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  async getOrder(id: number): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(orderData: {
    shippingAddress: string;
    paymentMethod: string;
  }): Promise<Order> {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  }
};