import { apiClient } from './apiClient';
import type {
  ProductListDTO,
  ProductDetailDTO,
  ProductCreateDTO,
  ProductUpdateDTO,
  ProductFilters,
} from '../types/api';

export const productService = {
  async getProducts(filters?: ProductFilters): Promise<ProductListDTO[]> {
    const params = new URLSearchParams();
    
    if (filters?.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    
    const queryString = params.toString();
    const url = queryString ? `/Products?${queryString}` : '/Products';
    
    return apiClient.get<ProductListDTO[]>(url);
  },

  async getProduct(id: number): Promise<ProductDetailDTO> {
    return apiClient.get<ProductDetailDTO>(`/Products/${id}`);
  },

  async createProduct(product: ProductCreateDTO): Promise<ProductDetailDTO> {
    return apiClient.post<ProductDetailDTO>('/Products', product);
  },

  async updateProduct(id: number, product: ProductUpdateDTO): Promise<ProductDetailDTO> {
    return apiClient.put<ProductDetailDTO>(`/Products/${id}`, product);
  },

  async deleteProduct(id: number): Promise<void> {
    return apiClient.delete<void>(`/Products/${id}`);
  },
};