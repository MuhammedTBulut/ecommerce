// User and Authentication Types
export interface User {
  id: number;
  fullName: string;
  email: string;
  birthDate?: string; // Optional since backend has nullable DateTime
  gender?: boolean | null; // Backend returns boolean for gender, not string
  role: string; // Backend returns role as string, not object
}

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
  birthDate: string; // Will be converted to DateTime on backend
  gender: boolean | null; // Backend expects boolean
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  category: Category;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  products?: Product[];
}

// Cart Types
export interface CartItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  id: number;
  userId: number;
  user: User;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

// Comment/Review Types (Updated)
export interface ProductComment {
  id: number;
  productId: number;
  userId: number;
  user: User;
  content: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

export interface ReviewFormData {
  content: string;
  rating: number;
}

export interface ReviewStats {
  averageRating: number;
  totalComments: number;
  ratingDistribution: Record<number, number>;
}

// Campaign Types (New)
export interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  discount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

// Action Log Types
export interface ActionLog {
  id: number;
  userId: number;
  user: User;
  actionType: string;
  description: string;
  timestamp: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface ValidationError {
  field: string;
  message: string;
}

// Dashboard Analytics Types
export interface SalesChart {
  date: string;
  amount: number;
  orderCount: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export interface CategoryAnalytics {
  categoryId: number;
  categoryName: string;
  salesCount: number;
  revenue: number;
}

// Theme Types
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (userData: RegisterDTO) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  updateProfile: (updatedData: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

// Cart Context Types
export interface CartContextType {
  cart: Cart | null;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  getItemCount: () => number;
  getCartTotal: () => number;
  isInCart: (productId: number) => boolean;
  getCartItem: (productId: number) => CartItem | undefined;
  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  validateCart: () => Promise<{ isValid: boolean; errors: string[] }>;
  refreshCart: () => Promise<void>;
}