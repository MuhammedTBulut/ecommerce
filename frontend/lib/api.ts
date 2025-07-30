import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  
  // Products
  products: '/products',
  productById: (id: string) => `/products/${id}`,
  productsByCategory: (category: string) => `/products/category/${category}`,
  
  // Categories
  categories: '/categories',
  
  // Cart
  cart: '/cart',
  addToCart: '/cart/add',
  updateCart: '/cart/update',
  removeFromCart: '/cart/remove',
  
  // Orders
  orders: '/orders',
  orderById: (id: string) => `/orders/${id}`,
  createOrder: '/orders',
  
  // User
  profile: '/user/profile',
  updateProfile: '/user/profile',
  
  // Admin
  adminDashboard: '/admin/dashboard',
  adminProducts: '/admin/products',
  adminOrders: '/admin/orders',
  adminUsers: '/admin/users',
};

export default api;