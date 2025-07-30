import { create } from 'zustand';
import { ProductFilters } from '@/types';

interface UIStore {
  theme: 'light' | 'dark';
  mobileMenuOpen: boolean;
  searchQuery: string;
  filters: ProductFilters;
  viewMode: 'grid' | 'list';
  sortBy: 'name' | 'price' | 'rating' | 'created' | 'popularity';
  sortOrder: 'asc' | 'desc';
  
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  clearFilters: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sortBy: 'name' | 'price' | 'rating' | 'created' | 'popularity') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
}

export const useUIStore = create<UIStore>()((set, get) => ({
  theme: 'light',
  mobileMenuOpen: false,
  searchQuery: '',
  filters: {},
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',
  
  setTheme: (theme) => {
    set({ theme });
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },
  
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },
  
  setMobileMenuOpen: (open) => {
    set({ mobileMenuOpen: open });
  },
  
  toggleMobileMenu: () => {
    set({ mobileMenuOpen: !get().mobileMenuOpen });
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  
  setFilters: (newFilters) => {
    set({ filters: { ...get().filters, ...newFilters } });
  },
  
  clearFilters: () => {
    set({ filters: {} });
  },
  
  setViewMode: (mode) => {
    set({ viewMode: mode });
  },
  
  setSortBy: (sortBy: 'name' | 'price' | 'rating' | 'created' | 'popularity') => {
    set({ sortBy });
  },
  
  setSortOrder: (order) => {
    set({ sortOrder: order });
  }
}));