import apiClient from '@/lib/api';
import { Product, ProductListItem, Category } from '@/types/api';

export const productService = {
  async getProducts(params?: {
    categoryId?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ProductListItem[]> {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  async searchProducts(query: string): Promise<ProductListItem[]> {
    const response = await apiClient.get('/products', {
      params: { search: query }
    });
    return response.data;
  }
};