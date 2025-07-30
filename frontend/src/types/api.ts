// API Types based on backend DTOs
export interface User {
  id: number;
  fullName: string;
  email: string;
  roleId: number;
  roleName: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
  stock: number;
}

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

export interface AddToCartDto {
  productId: number;
  quantity: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}