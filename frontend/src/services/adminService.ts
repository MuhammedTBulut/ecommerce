import { apiClient } from './apiClient';
import type {
  SupportTicketDTO,
  SupportTicketCreateDTO,
  AdminOrderListDTO,
  AdminCreateUserDTO,
  RoleDTO,
} from '../types/api';

export const supportService = {
  async createTicket(ticket: SupportTicketCreateDTO): Promise<SupportTicketDTO> {
    return apiClient.post<SupportTicketDTO>('/SupportTickets', ticket);
  },

  async getTickets(): Promise<SupportTicketDTO[]> {
    return apiClient.get<SupportTicketDTO[]>('/SupportTickets');
  },

  async resolveTicket(id: number): Promise<SupportTicketDTO> {
    return apiClient.put<SupportTicketDTO>(`/SupportTickets/${id}/resolve`);
  },
};

export const adminService = {
  async getOrders(): Promise<AdminOrderListDTO[]> {
    return apiClient.get<AdminOrderListDTO[]>('/admin/orders');
  },

  async createUser(user: AdminCreateUserDTO): Promise<void> {
    return apiClient.post<void>('/admin/users', user);
  },

  async getUserRoles(): Promise<RoleDTO[]> {
    return apiClient.get<RoleDTO[]>('/admin/users/roles');
  },

  async getRoles(): Promise<RoleDTO[]> {
    return apiClient.get<RoleDTO[]>('/admin/roles');
  },

  async createRole(role: Omit<RoleDTO, 'id'>): Promise<RoleDTO> {
    return apiClient.post<RoleDTO>('/admin/roles', role);
  },

  async updateRole(id: number, role: Omit<RoleDTO, 'id'>): Promise<RoleDTO> {
    return apiClient.put<RoleDTO>(`/admin/roles/${id}`, role);
  },

  async deleteRole(id: number): Promise<void> {
    return apiClient.delete<void>(`/admin/roles/${id}`);
  },
};