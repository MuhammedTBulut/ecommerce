// Base types matching the C# backend models

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber?: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  categoryId: string
  category?: Category
  stock: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description?: string
  parentId?: string
  imageUrl?: string
  isActive: boolean
  products?: Product[]
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  product?: Product
  quantity: number
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  user?: User
  orderItems: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress: string
  paymentInfo?: PaymentInfo
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product?: Product
  quantity: number
  price: number
}

export interface PaymentInfo {
  id: string
  orderId: string
  paymentMethod: string
  paymentStatus: string
  transactionId?: string
  amount: number
  createdAt: string
  updatedAt: string
}

export interface ProductComment {
  id: string
  productId: string
  userId: string
  user?: User
  comment: string
  rating: number
  createdAt: string
  updatedAt: string
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phoneNumber?: string
}

export interface ProductFilter {
  categoryId?: string
  minPrice?: number
  maxPrice?: number
  searchTerm?: string
  sortBy?: 'name' | 'price' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

export interface CheckoutForm {
  shippingAddress: string
  paymentMethod: string
  notes?: string
}