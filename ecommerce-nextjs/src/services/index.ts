// Export base service classes and interfaces
export * from './base';

// Export service implementations
export * from './auth';
export * from './product';
export * from './cart';
export * from './order';
export * from './comment';
export * from './analytics';

// Export concrete service instances using dependency injection
import { httpClient } from './base';
import { AuthService } from './auth';
import { ProductService, AdminProductService } from './product';
import { CartService } from './cart';
import { OrderService, AdminOrderService } from './order';
import { CommentService, AdminCommentService } from './comment';
import { AnalyticsService, ActionLogService } from './analytics';

/**
 * Service Factory following Factory pattern
 */
export class ServiceFactory {
  private static instances: Map<string, any> = new Map();

  /**
   * Get or create service instance (Singleton pattern)
   */
  private static getInstance<T>(key: string, factory: () => T): T {
    if (!this.instances.has(key)) {
      this.instances.set(key, factory());
    }
    return this.instances.get(key) as T;
  }

  // Public API services
  static get authService(): AuthService {
    return this.getInstance('authService', () => new AuthService(httpClient));
  }

  static get productService(): ProductService {
    return this.getInstance('productService', () => new ProductService(httpClient));
  }

  static get cartService(): CartService {
    return this.getInstance('cartService', () => new CartService(httpClient));
  }

  static get orderService(): OrderService {
    return this.getInstance('orderService', () => new OrderService(httpClient));
  }

  static get commentService(): CommentService {
    return this.getInstance('commentService', () => new CommentService(httpClient));
  }

  // Admin services
  static get adminProductService(): AdminProductService {
    return this.getInstance('adminProductService', () => new AdminProductService(httpClient));
  }

  static get adminOrderService(): AdminOrderService {
    return this.getInstance('adminOrderService', () => new AdminOrderService(httpClient));
  }

  static get adminCommentService(): AdminCommentService {
    return this.getInstance('adminCommentService', () => new AdminCommentService(httpClient));
  }

  static get analyticsService(): AnalyticsService {
    return this.getInstance('analyticsService', () => new AnalyticsService(httpClient));
  }

  static get actionLogService(): ActionLogService {
    return this.getInstance('actionLogService', () => new ActionLogService(httpClient));
  }

  /**
   * Clear all service instances (useful for testing)
   */
  static clearInstances(): void {
    this.instances.clear();
  }

  /**
   * Reset specific service instance
   */
  static resetService(serviceName: string): void {
    this.instances.delete(serviceName);
  }
}

// Export service instances for convenience
export const authService = ServiceFactory.authService;
export const productService = ServiceFactory.productService;
export const cartService = ServiceFactory.cartService;
export const orderService = ServiceFactory.orderService;
export const commentService = ServiceFactory.commentService;
export const adminProductService = ServiceFactory.adminProductService;
export const adminOrderService = ServiceFactory.adminOrderService;
export const adminCommentService = ServiceFactory.adminCommentService;
export const analyticsService = ServiceFactory.analyticsService;
export const actionLogService = ServiceFactory.actionLogService;

/**
 * Service configuration interface
 */
export interface ServiceConfig {
  baseUrl?: string;
  timeout?: number;
  retryAttempts?: number;
  enableLogging?: boolean;
}

/**
 * Service provider for dependency injection in React components
 */
export class ServiceProvider {
  private config: ServiceConfig;

  constructor(config: ServiceConfig = {}) {
    this.config = {
      baseUrl: 'http://localhost:5095/api',
      timeout: 10000,
      retryAttempts: 3,
      enableLogging: true,
      ...config
    };
  }

  /**
   * Get configured service factory
   */
  getServiceFactory(): typeof ServiceFactory {
    // Could extend this to create custom configured instances
    return ServiceFactory;
  }

  /**
   * Update service configuration
   */
  updateConfig(newConfig: Partial<ServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    // Clear instances to force recreation with new config
    ServiceFactory.clearInstances();
  }

  /**
   * Get current configuration
   */
  getConfig(): ServiceConfig {
    return { ...this.config };
  }
}

// Default service provider instance
export const defaultServiceProvider = new ServiceProvider();

/**
 * Type definitions for service collections
 */
export type PublicServices = {
  auth: AuthService;
  product: ProductService;
  cart: CartService;
  order: OrderService;
  comment: CommentService;
};

export type AdminServices = {
  product: AdminProductService;
  order: AdminOrderService;
  comment: AdminCommentService;
  analytics: AnalyticsService;
  actionLog: ActionLogService;
};

/**
 * Utility function to get all public services
 */
export function getPublicServices(): PublicServices {
  return {
    auth: ServiceFactory.authService,
    product: ServiceFactory.productService,
    cart: ServiceFactory.cartService,
    order: ServiceFactory.orderService,
    comment: ServiceFactory.commentService,
  };
}

/**
 * Utility function to get all admin services
 */
export function getAdminServices(): AdminServices {
  return {
    product: ServiceFactory.adminProductService,
    order: ServiceFactory.adminOrderService,
    comment: ServiceFactory.adminCommentService,
    analytics: ServiceFactory.analyticsService,
    actionLog: ServiceFactory.actionLogService,
  };
}

/**
 * Service health check utility
 */
export class ServiceHealthCheck {
  static async checkAllServices(): Promise<{
    [serviceName: string]: { status: 'healthy' | 'unhealthy'; error?: string };
  }> {
    const services = getPublicServices();
    const results: any = {};

    for (const [serviceName, service] of Object.entries(services)) {
      try {
        // Try to make a simple health check call
        // This would depend on your API having health check endpoints
        await httpClient.get('/health');
        results[serviceName] = { status: 'healthy' };
      } catch (error) {
        results[serviceName] = { 
          status: 'unhealthy', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    }

    return results;
  }
}