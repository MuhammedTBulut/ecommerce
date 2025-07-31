import { BaseService, IHttpClient } from './base';
import { Product, Category, PaginatedResponse, ApiResponse } from '@/types';

/**
 * Product Service Interface
 */
export interface IProductService {
  getProducts(params?: ProductQueryParams): Promise<PaginatedResponse<Product>>;
  getProductById(id: number): Promise<Product>;
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category>;
  getProductsByCategory(categoryId: number, params?: ProductQueryParams): Promise<PaginatedResponse<Product>>;
  searchProducts(query: string, params?: ProductQueryParams): Promise<PaginatedResponse<Product>>;
  getFeaturedProducts(): Promise<Product[]>;
  getRelatedProducts(productId: number): Promise<Product[]>;
}

/**
 * Product query parameters interface
 */
export interface ProductQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: 'name' | 'price' | 'createdAt' | 'rating';
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
  inStock?: boolean;
  search?: string;
}

/**
 * Admin Product Service Interface
 */
export interface IAdminProductService {
  createProduct(product: CreateProductDTO): Promise<Product>;
  updateProduct(id: number, product: UpdateProductDTO): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  toggleProductStatus(id: number): Promise<Product>;
  updateStock(id: number, stock: number): Promise<Product>;
  bulkUpdateProducts(updates: BulkProductUpdate[]): Promise<void>;
}

/**
 * Product DTOs
 */
export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface BulkProductUpdate {
  id: number;
  updates: UpdateProductDTO;
}

/**
 * Product Service implementation
 */
export class ProductService extends BaseService implements IProductService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Get products with filtering and pagination
   */
  async getProducts(params: ProductQueryParams = {}): Promise<PaginatedResponse<Product>> {
    return this.handleRequest(async () => {
      const queryString = this.buildQueryParams(params);
      const response = await this.httpClient.get<PaginatedResponse<Product>>(
        `/products${queryString}`
      );
      
      return response;
    }, 'Failed to fetch products');
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: number): Promise<Product> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Product>>(
        `/products/${id}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Product not found');
    }, `Failed to fetch product with ID: ${id}`);
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Category[]>>(
        '/categories'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch categories');
    }, 'Failed to fetch categories');
  }

  /**
   * Get single category by ID
   */
  async getCategoryById(id: number): Promise<Category> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Category>>(
        `/categories/${id}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Category not found');
    }, `Failed to fetch category with ID: ${id}`);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(
    categoryId: number, 
    params: ProductQueryParams = {}
  ): Promise<PaginatedResponse<Product>> {
    this.validateRequired({ categoryId }, ['categoryId']);

    return this.handleRequest(async () => {
      const queryParams = { ...params, categoryId };
      const queryString = this.buildQueryParams(queryParams);
      
      const response = await this.httpClient.get<PaginatedResponse<Product>>(
        `/products${queryString}`
      );
      
      return response;
    }, `Failed to fetch products for category: ${categoryId}`);
  }

  /**
   * Search products
   */
  async searchProducts(
    query: string, 
    params: ProductQueryParams = {}
  ): Promise<PaginatedResponse<Product>> {
    this.validateRequired({ query }, ['query']);

    return this.handleRequest(async () => {
      const queryParams = { ...params, search: query };
      const queryString = this.buildQueryParams(queryParams);
      
      const response = await this.httpClient.get<PaginatedResponse<Product>>(
        `/products/search${queryString}`
      );
      
      return response;
    }, `Failed to search products for: ${query}`);
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Product[]>>(
        '/products/featured'
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch featured products');
    }, 'Failed to fetch featured products');
  }

  /**
   * Get related products
   */
  async getRelatedProducts(productId: number): Promise<Product[]> {
    this.validateRequired({ productId }, ['productId']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Product[]>>(
        `/products/${productId}/related`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch related products');
    }, `Failed to fetch related products for: ${productId}`);
  }

  /**
   * Filter products by price range
   */
  async getProductsByPriceRange(
    minPrice: number, 
    maxPrice: number, 
    params: ProductQueryParams = {}
  ): Promise<PaginatedResponse<Product>> {
    return this.handleRequest(async () => {
      const queryParams = { ...params, minPrice, maxPrice };
      const queryString = this.buildQueryParams(queryParams);
      
      const response = await this.httpClient.get<PaginatedResponse<Product>>(
        `/products${queryString}`
      );
      
      return response;
    }, `Failed to fetch products in price range: ${minPrice}-${maxPrice}`);
  }

  /**
   * Get low stock products (admin use)
   */
  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    return this.handleRequest(async () => {
      const response = await this.httpClient.get<ApiResponse<Product[]>>(
        `/products/low-stock?threshold=${threshold}`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to fetch low stock products');
    }, 'Failed to fetch low stock products');
  }
}

/**
 * Admin Product Service implementation
 */
export class AdminProductService extends BaseService implements IAdminProductService {
  constructor(httpClient: IHttpClient) {
    super(httpClient);
  }

  /**
   * Create new product
   */
  async createProduct(product: CreateProductDTO): Promise<Product> {
    this.validateRequired(product, ['name', 'description', 'price', 'stock', 'categoryId']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.post<ApiResponse<Product>>(
        '/admin/products',
        product
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to create product');
    }, 'Failed to create product');
  }

  /**
   * Update existing product
   */
  async updateProduct(id: number, product: UpdateProductDTO): Promise<Product> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.put<ApiResponse<Product>>(
        `/admin/products/${id}`,
        product
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update product');
    }, `Failed to update product: ${id}`);
  }

  /**
   * Delete product
   */
  async deleteProduct(id: number): Promise<void> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.delete<ApiResponse<void>>(
        `/admin/products/${id}`
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to delete product');
      }
    }, `Failed to delete product: ${id}`);
  }

  /**
   * Toggle product active status
   */
  async toggleProductStatus(id: number): Promise<Product> {
    this.validateRequired({ id }, ['id']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<Product>>(
        `/admin/products/${id}/toggle-status`
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to toggle product status');
    }, `Failed to toggle status for product: ${id}`);
  }

  /**
   * Update product stock
   */
  async updateStock(id: number, stock: number): Promise<Product> {
    this.validateRequired({ id, stock }, ['id', 'stock']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<Product>>(
        `/admin/products/${id}/stock`,
        { stock }
      );
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.message || 'Failed to update stock');
    }, `Failed to update stock for product: ${id}`);
  }

  /**
   * Bulk update products
   */
  async bulkUpdateProducts(updates: BulkProductUpdate[]): Promise<void> {
    this.validateRequired({ updates }, ['updates']);

    return this.handleRequest(async () => {
      const response = await this.httpClient.patch<ApiResponse<void>>(
        '/admin/products/bulk-update',
        { updates }
      );
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to bulk update products');
      }
    }, 'Failed to bulk update products');
  }
}