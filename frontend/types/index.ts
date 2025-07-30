export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  payment: PaymentInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface PaymentInfo {
  method: 'credit_card' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: Pick<User, 'firstName' | 'lastName' | 'avatar'>;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}