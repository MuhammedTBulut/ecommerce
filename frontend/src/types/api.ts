// Auth types
export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserRegisterDTO {
  fullName: string;
  email: string;
  password: string;
  gender?: boolean;
  birthDate?: string;
}

export interface AuthResponse {
  token: string;
  user: UserDTO;
}

// User types
export interface UserDTO {
  id: number;
  fullName: string;
  email: string;
  role: string;
  gender?: boolean;
  birthDate?: string;
}

export interface UserUpdateDTO {
  fullName?: string;
  email?: string;
  gender?: boolean;
  birthDate?: string;
}

// Product types
export interface ProductListDTO {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
}

export interface ProductDetailDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName: string;
  imageUrl: string;
  stock: number;
}

export interface ProductCreateDTO {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  stock: number;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  imageUrl?: string;
  stock?: number;
}

// Category types
export interface CategoryDTO {
  id: number;
  name: string;
  description?: string;
}

export interface CategoryCreateDTO {
  name: string;
  description?: string;
}

// Cart types
export interface CartItemDTO {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
  totalPrice: number;
}

export interface AddToCartDTO {
  productId: number;
  quantity: number;
}

// Order types
export interface OrderListDTO {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
}

export interface OrderDetailDTO {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItemDTO[];
}

export interface OrderItemDTO {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderCreateDTO {
  items: {
    productId: number;
    quantity: number;
  }[];
}

// Support Ticket types
export interface SupportTicketDTO {
  id: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface SupportTicketCreateDTO {
  subject: string;
  description: string;
}

// Admin types
export interface AdminCreateUserDTO {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  gender?: boolean;
  birthDate?: string;
}

export interface AdminOrderListDTO {
  id: number;
  userId: number;
  userFullName: string;
  userEmail: string;
  orderDate: string;
  totalAmount: number;
  status: string;
}

export interface RoleDTO {
  id: number;
  name: string;
  description?: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Filter and search types
export interface ProductFilters {
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}