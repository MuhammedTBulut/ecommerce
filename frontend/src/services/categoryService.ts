import { apiClient } from './apiClient';
import type {
  CategoryDTO,
  CategoryCreateDTO,
} from '../types/api';

export const categoryService = {
  async getCategories(): Promise<CategoryDTO[]> {
    return apiClient.get<CategoryDTO[]>('/Categories');
  },

  async createCategory(category: CategoryCreateDTO): Promise<CategoryDTO> {
    return apiClient.post<CategoryDTO>('/Categories', category);
  },

  async updateCategory(id: number, category: CategoryCreateDTO): Promise<CategoryDTO> {
    return apiClient.put<CategoryDTO>(`/Categories/${id}`, category);
  },

  async deleteCategory(id: number): Promise<void> {
    return apiClient.delete<void>(`/Categories/${id}`);
  },
};