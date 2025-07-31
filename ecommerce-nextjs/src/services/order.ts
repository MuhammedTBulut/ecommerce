import { BaseService, IHttpClient } from './base';
import { Order, OrderItem, OrderStatus, PaginatedResponse, ApiResponse } from '@/types';

/**
 * Order DTOs
 */
export interface CreateOrderDTO {
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod: string;
  notes?: string;
}

export interface UpdateOrderStatusDTO {
  status: OrderStatus;
  notes?: string;
}

export interface OrderFilterParams {
  page?: number;
  pageSize?: number;
  status?: OrderStatus;
  userId?: number;
  startDate?: string;
  endDate?: string;
  sortBy?: 'createdAt' | 'totalAmount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Order Service Interface
 */
export interface IOrderService {
  createOrder(orderData: CreateOrderDTO): Promise<Order>;
  getOrders(params?: OrderFilterParams): Promise<PaginatedResponse<Order>>;
  getOrderById(id: number): Promise<Order>;
  getUserOrders(userId?: number, params?: OrderFilterParams): Promise<PaginatedResponse<Order>>;
  cancelOrder(id: number, reason?: string): Promise<Order>;
  getOrderTracking(id: number): Promise<OrderTrackingInfo>;
}

/**
 * Admin Order Service Interface
 */
export interface IAdminOrderService {
  getAllOrders(params?: OrderFilterParams): Promise<PaginatedResponse<Order>>;
  updateOrderStatus(id: number, data: UpdateOrderStatusDTO): Promise<Order>;
  getOrdersByStatus(status: OrderStatus): Promise<Order[]>;
  getOrderStatistics(): Promise<OrderStatistics>;
  exportOrders(params?: OrderFilterParams): Promise<Blob>;
}

/**
 * Order tracking and statistics interfaces
 */
export interface OrderTrackingInfo {
  orderId: number;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
  history: OrderHistoryItem[];
}

export interface OrderHistoryItem {
  id: number;
  status: OrderStatus;
  timestamp: string;
  notes?: string;
  location?: string;
}

export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersToday: number;
  ordersThisWeek: number;
  ordersThisMonth: number;
}

/**
 * Order Service implementation
 */
export class OrderService extends BaseService implements IOrderService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Create new order from cart
   */
  async createOrder(orderData: CreateOrderDTO): Promise<Order> {
    this.validateRequired(orderData, ['shippingAddress', 'paymentMethod']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<Order>>(
        '/orders',
        orderData
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to create order');
    }, 'Failed to create order');
  }

  /**
   * Get orders with filtering and pagination
   */
  async getOrders(params: OrderFilterParams = {}): Promise<PaginatedResponse<Order>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<PaginatedResponse<Order>>(
        `/orders${queryString}`
      );
      
      return response;
    }, 'Failed to fetch orders');
  }

  /**
   * Get single order by ID
   */
  async getOrderById(id: number): Promise<Order> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Order>>(
        `/orders/${id}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Order not found');
    }, `Failed to fetch order with ID: ${id}`);
  }

  /**
   * Get orders for a specific user
   */
  async getUserOrders(
    userId?: number, 
    params: OrderFilterParams = {}
  ): Promise<PaginatedResponse<Order>> {
    return this.handleRequest(async () => {
      const endpoint = userId ? `/orders/user/${userId}` : '/orders/my-orders';
      const queryString = this.buildQueryParams(params);
      
      const response = await this.httpClient.get<PaginatedResponse<Order>>(
        `${endpoint}${queryString}`
      );
      
      return response;
    }, userId ? `Failed to fetch orders for user: ${userId}` : 'Failed to fetch user orders');
  }

  /**
   * Cancel an order
   */
  async cancelOrder(id: number, reason?: string): Promise<Order> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<Order>>(
        `/orders/${id}/cancel`,
        { reason }
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to cancel order');
    }, `Failed to cancel order: ${id}`);
  }

  /**
   * Get order tracking information
   */
  async getOrderTracking(id: number): Promise<OrderTrackingInfo> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<OrderTrackingInfo>>(
        `/orders/${id}/tracking`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to get order tracking');
    }, `Failed to get tracking for order: ${id}`);
  }

  /**
   * Reorder items from a previous order
   */
  async reorder(id: number): Promise<Order> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<Order>>(
        `/orders/${id}/reorder`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to reorder');
    }, `Failed to reorder from order: ${id}`);
  }

  /**
   * Get order invoice
   */
  async getOrderInvoice(id: number): Promise<Blob> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get(
        `/orders/${id}/invoice`,
        { responseType: 'blob' }
      );
      
      return response as Blob;
    }, `Failed to get invoice for order: ${id}`);
  }
}

/**
 * Admin Order Service implementation
 */
export class AdminOrderService extends BaseService implements IAdminOrderService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get all orders (admin view)
   */
  async getAllOrders(params: OrderFilterParams = {}): Promise<PaginatedResponse<Order>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<PaginatedResponse<Order>>(
        `/admin/orders${queryString}`
      );
      
      return response;
    }, 'Failed to fetch all orders');
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id: number, data: UpdateOrderStatusDTO): Promise<Order> {
    this.validateRequired({ id, ...data }, ['id', 'status']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<Order>>(
        `/admin/orders/${id}/status`,
        data
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update order status');
    }, `Failed to update status for order: ${id}`);
  }

  /**
   * Get orders by status
   */
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    this.validateRequired({ status }, ['status']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Order[]>>(
        `/admin/orders/status/${status}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch orders by status');
    }, `Failed to fetch orders with status: ${status}`);
  }

  /**
   * Get order statistics for admin dashboard
   */
  async getOrderStatistics(): Promise<OrderStatistics> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<OrderStatistics>>(
        '/admin/orders/statistics'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch order statistics');
    }, 'Failed to fetch order statistics');
  }

  /**
   * Export orders to CSV/Excel
   */
  async exportOrders(params: OrderFilterParams = {}): Promise<Blob> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get(
        `/admin/orders/export${queryString}`,
        { responseType: 'blob' }
      );
      
      return response as Blob;
    }, 'Failed to export orders');
  }

  /**
   * Bulk update order statuses
   */
  async bulkUpdateOrderStatus(
    orderIds: number[], 
    status: OrderStatus, 
    notes?: string
  ): Promise<void> {
    this.validateRequired({ orderIds, status }, ['orderIds', 'status']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<void>>(
        '/admin/orders/bulk-update-status',
        { orderIds, status, notes }
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to bulk update order statuses');
      }
    }, 'Failed to bulk update order statuses');
  }

  /**
   * Get orders requiring attention (delayed, issues, etc.)
   */
  async getOrdersRequiringAttention(): Promise<Order[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Order[]>>(
        '/admin/orders/requiring-attention'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch orders requiring attention');
    }, 'Failed to fetch orders requiring attention');
  }

  /**
   * Get sales report by date range
   */
  async getSalesReport(startDate: string, endDate: string): Promise<any> {
    this.validateRequired({ startDate, endDate }, ['startDate', 'endDate']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<any>>(
        `/admin/orders/sales-report?startDate=${startDate}&endDate=${endDate}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to generate sales report');
    }, `Failed to generate sales report for ${startDate} to ${endDate}`);
  }
}