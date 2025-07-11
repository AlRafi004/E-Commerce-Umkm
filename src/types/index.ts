// User and Authentication Types
export interface User {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: "customer" | "vendor" | "admin";
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  role?: "customer" | "vendor";
}

// Vendor/Store Types
export interface Store {
  _id: string;
  vendorId: string;
  name: string;
  description: string;
  brandStory: string;
  logo?: string;
  banner?: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  isLocal: boolean;
  rating: number;
  totalReviews: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export interface Product {
  _id: string;
  storeId: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: number;
  minOrder: number;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isLocal: boolean;
  tags: string[];
  rating: number;
  totalReviews: number;
  totalSold: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  isActive: boolean;
}

// Cart and Order Types
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface Order {
  _id: string;
  customerId: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  storeId: string;
}

// Review and Rating Types
export interface Review {
  _id: string;
  customerId: string;
  customer: User;
  productId: string;
  orderId: string;
  rating: number;
  comment: string;
  images?: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Chat Types
export interface ChatMessage {
  _id: string;
  chatRoomId: string;
  senderId: string;
  sender: User;
  message: string;
  messageType: "text" | "image" | "file";
  isRead: boolean;
  createdAt: Date;
}

export interface ChatRoom {
  _id: string;
  customerId: string;
  vendorId: string;
  lastMessage?: ChatMessage;
  unreadCount: {
    customer: number;
    vendor: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics and Report Types
export interface SalesAnalytics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  salesGrowth: number;
  ordersGrowth: number;
  topProducts: Product[];
  topCategories: Category[];
  monthlySales: {
    month: string;
    sales: number;
    orders: number;
  }[];
}

export interface StoreAnalytics {
  storeId: string;
  storeName: string;
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  rating: number;
  salesData: {
    date: string;
    sales: number;
    orders: number;
  }[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Form Types
export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isLocal?: boolean;
  rating?: number;
  sortBy?: "newest" | "price_low" | "price_high" | "rating" | "popular";
  page?: number;
  limit?: number;
}
