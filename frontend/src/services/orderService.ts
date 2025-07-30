import { apiClient } from './apiClient';
import type {
  OrderListDTO,
  OrderDetailDTO,
  OrderCreateDTO,
} from '../types/api';

export const orderService = {
  async createOrder(order: OrderCreateDTO): Promise<OrderDetailDTO> {
    return apiClient.post<OrderDetailDTO>('/Orders', order);
  },

  async getOrders(): Promise<OrderListDTO[]> {
    return apiClient.get<OrderListDTO[]>('/Orders');
  },

  async getOrder(id: number): Promise<OrderDetailDTO> {
    return apiClient.get<OrderDetailDTO>(`/Orders/${id}`);
  },
};