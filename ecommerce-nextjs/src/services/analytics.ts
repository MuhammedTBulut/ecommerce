import { BaseService, IHttpClient } from './base';
import { 
  DashboardStats, 
  SalesChart, 
  CategoryAnalytics, 
  ActionLog, 
  PaginatedResponse, 
  ApiResponse 
} from '@/types';

/**
 * Analytics filter parameters
 */
export interface AnalyticsFilterParams {
  startDate?: string;
  endDate?: string;
  granularity?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  categoryId?: number;
  productId?: number;
  userId?: number;
}

export interface ActionLogFilterParams {
  page?: number;
  pageSize?: number;
  userId?: number;
  actionType?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'timestamp' | 'actionType' | 'userId';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Analytics data interfaces
 */
export interface SalesAnalytics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  salesByPeriod: SalesChart[];
  topSellingProducts: Array<{
    productId: number;
    productName: string;
    totalSold: number;
    revenue: number;
  }>;
  salesByCategory: CategoryAnalytics[];
}

export interface UserAnalytics {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  activeUsers: number;
  usersByGender: Record<string, number>;
  usersByAgeGroup: Record<string, number>;
  userRegistrationTrend: Array<{
    date: string;
    count: number;
  }>;
}

export interface ProductAnalytics {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  productsByCategory: Record<string, number>;
  topRatedProducts: Array<{
    productId: number;
    productName: string;
    averageRating: number;
    reviewCount: number;
  }>;
  productViewTrend: Array<{
    date: string;
    views: number;
  }>;
}

export interface GeographicAnalytics {
  ordersByCountry: Record<string, number>;
  ordersByCity: Record<string, number>;
  revenueByRegion: Record<string, number>;
}

export interface PerformanceMetrics {
  averagePageLoadTime: number;
  bounceRate: number;
  conversionRate: number;
  cartAbandonmentRate: number;
  averageSessionDuration: number;
  pageViews: number;
  uniqueVisitors: number;
}

/**
 * Analytics Service Interface
 */
export interface IAnalyticsService {
  getDashboardStats(): Promise<DashboardStats>;
  getSalesAnalytics(params?: AnalyticsFilterParams): Promise<SalesAnalytics>;
  getUserAnalytics(params?: AnalyticsFilterParams): Promise<UserAnalytics>;
  getProductAnalytics(params?: AnalyticsFilterParams): Promise<ProductAnalytics>;
  getGeographicAnalytics(params?: AnalyticsFilterParams): Promise<GeographicAnalytics>;
  getPerformanceMetrics(params?: AnalyticsFilterParams): Promise<PerformanceMetrics>;
  getSalesChart(params?: AnalyticsFilterParams): Promise<SalesChart[]>;
  getCategoryAnalytics(params?: AnalyticsFilterParams): Promise<CategoryAnalytics[]>;
  exportAnalyticsReport(params?: AnalyticsFilterParams): Promise<Blob>;
}

/**
 * Action Log Service Interface
 */
export interface IActionLogService {
  getActionLogs(params?: ActionLogFilterParams): Promise<PaginatedResponse<ActionLog>>;
  getUserActionLogs(userId: number, params?: ActionLogFilterParams): Promise<PaginatedResponse<ActionLog>>;
  logAction(actionType: string, description: string): Promise<void>;
  getActionTypes(): Promise<string[]>;
  deleteOldLogs(olderThanDays: number): Promise<void>;
  exportActionLogs(params?: ActionLogFilterParams): Promise<Blob>;
}

/**
 * Analytics Service implementation
 */
export class AnalyticsService extends BaseService implements IAnalyticsService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<DashboardStats>>(
        '/admin/analytics/dashboard-stats'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch dashboard stats');
    }, 'Failed to fetch dashboard stats');
  }

  /**
   * Get sales analytics
   */
  async getSalesAnalytics(params: AnalyticsFilterParams = {}): Promise<SalesAnalytics> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<SalesAnalytics>>(
        `/admin/analytics/sales${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch sales analytics');
    }, 'Failed to fetch sales analytics');
  }

  /**
   * Get user analytics
   */
  async getUserAnalytics(params: AnalyticsFilterParams = {}): Promise<UserAnalytics> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<UserAnalytics>>(
        `/admin/analytics/users${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch user analytics');
    }, 'Failed to fetch user analytics');
  }

  /**
   * Get product analytics
   */
  async getProductAnalytics(params: AnalyticsFilterParams = {}): Promise<ProductAnalytics> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<ProductAnalytics>>(
        `/admin/analytics/products${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch product analytics');
    }, 'Failed to fetch product analytics');
  }

  /**
   * Get geographic analytics
   */
  async getGeographicAnalytics(params: AnalyticsFilterParams = {}): Promise<GeographicAnalytics> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<GeographicAnalytics>>(
        `/admin/analytics/geographic${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch geographic analytics');
    }, 'Failed to fetch geographic analytics');
  }

  /**
   * Get performance metrics
   */
  async getPerformanceMetrics(params: AnalyticsFilterParams = {}): Promise<PerformanceMetrics> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<PerformanceMetrics>>(
        `/admin/analytics/performance${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch performance metrics');
    }, 'Failed to fetch performance metrics');
  }

  /**
   * Get sales chart data
   */
  async getSalesChart(params: AnalyticsFilterParams = {}): Promise<SalesChart[]> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<SalesChart[]>>(
        `/admin/analytics/sales-chart${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch sales chart data');
    }, 'Failed to fetch sales chart data');
  }

  /**
   * Get category analytics
   */
  async getCategoryAnalytics(params: AnalyticsFilterParams = {}): Promise<CategoryAnalytics[]> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<CategoryAnalytics[]>>(
        `/admin/analytics/categories${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch category analytics');
    }, 'Failed to fetch category analytics');
  }

  /**
   * Export analytics report
   */
  async exportAnalyticsReport(params: AnalyticsFilterParams = {}): Promise<Blob> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get(
        `/admin/analytics/export${queryString}`,
        { responseType: 'blob' }
      );
      
      return response as Blob;
    }, 'Failed to export analytics report');
  }

  /**
   * Get real-time analytics data
   */
  async getRealTimeAnalytics(): Promise<{
    activeUsers: number;
    currentOrders: number;
    salesInLastHour: number;
    topProductsNow: Array<{ productId: number; productName: string; views: number }>;
  }> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<any>>(
        '/admin/analytics/real-time'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch real-time analytics');
    }, 'Failed to fetch real-time analytics');
  }

  /**
   * Get conversion funnel data
   */
  async getConversionFunnel(params: AnalyticsFilterParams = {}): Promise<Array<{
    stage: string;
    users: number;
    conversionRate: number;
  }>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<ApiResponse<any>>(
        `/admin/analytics/conversion-funnel${queryString}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch conversion funnel data');
    }, 'Failed to fetch conversion funnel data');
  }
}

/**
 * Action Log Service implementation
 */
export class ActionLogService extends BaseService implements IActionLogService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get action logs with filtering
   */
  async getActionLogs(params: ActionLogFilterParams = {}): Promise<PaginatedResponse<ActionLog>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<PaginatedResponse<ActionLog>>(
        `/admin/action-logs${queryString}`
      );
      
      return response;
    }, 'Failed to fetch action logs');
  }

  /**
   * Get action logs for a specific user
   */
  async getUserActionLogs(
    userId: number, 
    params: ActionLogFilterParams = {}
  ): Promise<PaginatedResponse<ActionLog>> {
    this.validateRequired({ userId }, ['userId']);

    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<PaginatedResponse<ActionLog>>(
        `/admin/action-logs/user/${userId}${queryString}`
      );
      
      return response;
    }, `Failed to fetch action logs for user: ${userId}`);
  }

  /**
   * Log a user action
   */
  async logAction(actionType: string, description: string): Promise<void> {
    this.validateRequired({ actionType, description }, ['actionType', 'description']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<void>>(
        '/action-logs',
        { actionType, description }
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to log action');
      }
    }, `Failed to log action: ${actionType}`);
  }

  /**
   * Get available action types
   */
  async getActionTypes(): Promise<string[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<string[]>>(
        '/admin/action-logs/types'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch action types');
    }, 'Failed to fetch action types');
  }

  /**
   * Delete old logs (cleanup)
   */
  async deleteOldLogs(olderThanDays: number): Promise<void> {
    this.validateRequired({ olderThanDays }, ['olderThanDays']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<void>>(
        `/admin/action-logs/cleanup?olderThanDays=${olderThanDays}`
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete old logs');
      }
    }, `Failed to delete logs older than ${olderThanDays} days`);
  }

  /**
   * Export action logs
   */
  async exportActionLogs(params: ActionLogFilterParams = {}): Promise<Blob> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get(
        `/admin/action-logs/export${queryString}`,
        { responseType: 'blob' }
      );
      
      return response as Blob;
    }, 'Failed to export action logs');
  }

  /**
   * Get action log statistics
   */
  async getActionLogStatistics(): Promise<{
    totalActions: number;
    actionsToday: number;
    actionsThisWeek: number;
    actionsThisMonth: number;
    actionsByType: Record<string, number>;
    mostActiveUsers: Array<{
      userId: number;
      userName: string;
      actionCount: number;
    }>;
  }> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<any>>(
        '/admin/action-logs/statistics'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch action log statistics');
    }, 'Failed to fetch action log statistics');
  }
}