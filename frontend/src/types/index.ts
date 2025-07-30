export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  categoryId: number
  categoryName: string
  imageUrl: string
}

export interface ProductListItem {
  id: number
  name: string
  price: number
  categoryId: number
  categoryName: string
  imageUrl: string
}

export interface Category {
  id: number
  name: string
}

export interface User {
  id: number
  fullName: string
  email: string
  roleId: number
  roleName: string
  gender?: boolean
  birthDate?: string
}

export interface CartItem {
  id: number
  productId: number
  productName: string
  productPrice: number
  productImageUrl: string
  quantity: number
  userId: number
}

export interface Order {
  id: number
  userId: number
  orderDate: string
  totalAmount: number
  status: string
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  productId: number
  productName: string
  productPrice: number
  quantity: number
}

export interface ProductComment {
  id: number
  productId: number
  userId: number
  userName: string
  comment: string
  rating: number
  commentDate: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  gender?: boolean
  birthDate?: string
}