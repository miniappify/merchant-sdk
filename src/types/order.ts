/**
 * Order Product Item
 */
export interface OrderProduct {
  /** ID sản phẩm */
  productId: string;
  /** Tên sản phẩm */
  productName: string;
  /** Số lượng */
  quantity: number;
  /** Giá per unit */
  price: number;
  /** Tổng giá cho sản phẩm này */
  total: number;
  /** SKU variant */
  sku?: string;
  /** Tên variant */
  variantName?: string;
}

/**
 * Create Order DTO
 */
export interface CreateOrderDto {
  /** ID người dùng */
  userId?: string;
  /** Zalo User ID */
  zaloUserId?: string;
  /** Tên khách hàng */
  customerName: string;
  /** Số điện thoại khách hàng */
  customerPhone: string;
  /** Email khách hàng */
  customerEmail?: string;
  /** Địa chỉ khách hàng */
  customerAddress?: string;
  /** Tổng tiền */
  totalAmount: number;
  /** Tổng tiền (alias) */
  total?: number;
  /** Phương thức thanh toán */
  paymentMethod?: string;
  /** Trạng thái thanh toán */
  paymentStatus?: string;
  /** Phương thức vận chuyển */
  shippingMethod?: string;
  /** Phí vận chuyển */
  shippingFee?: number;
  /** Số tiền giảm giá */
  discount?: number;
  /** Ghi chú đơn hàng */
  notes?: string;
  /** Items cho schema compatibility */
  items?: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  /** Danh sách sản phẩm trong đơn hàng */
  products: OrderProduct[];
}

/**
 * Update Order DTO
 */
export interface UpdateOrderDto {
  /** ID người dùng */
  userId?: string;
  /** Tên khách hàng */
  customerName?: string;
  /** Số điện thoại khách hàng */
  customerPhone?: string;
  /** Email khách hàng */
  customerEmail?: string;
  /** Địa chỉ khách hàng */
  customerAddress?: string;
  /** Tổng tiền */
  totalAmount?: number;
  /** Trạng thái đơn hàng */
  status?: "pending" | "confirmed" | "delivered" | "cancelled";
  /** Phương thức thanh toán */
  paymentMethod?: string;
  /** Trạng thái thanh toán */
  paymentStatus?: string;
  /** Phương thức vận chuyển */
  shippingMethod?: string;
  /** Phí vận chuyển */
  shippingFee?: number;
  /** Số tiền giảm giá */
  discount?: number;
  /** Ghi chú đơn hàng */
  notes?: string;
  /** Danh sách sản phẩm trong đơn hàng */
  products?: OrderProduct[];
}

/**
 * Order Response
 */
export interface OrderResponse {
  /** ID đơn hàng */
  id: string;
  /** ID shop */
  shopId: string;
  /** ID người dùng */
  userId?: string;
  /** Tên khách hàng */
  customerName: string;
  /** Số điện thoại khách hàng */
  customerPhone: string;
  /** Email khách hàng */
  customerEmail?: string;
  /** Địa chỉ khách hàng */
  customerAddress?: string;
  /** Tổng tiền */
  totalAmount: number;
  /** Trạng thái đơn hàng */
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  /** Phương thức thanh toán */
  paymentMethod?: string;
  /** Trạng thái thanh toán */
  paymentStatus?: string;
  /** Phương thức vận chuyển */
  shippingMethod?: string;
  /** Phí vận chuyển */
  shippingFee?: number;
  /** Số tiền giảm giá */
  discount?: number;
  /** Ghi chú đơn hàng */
  notes?: string;
  /** Danh sách sản phẩm trong đơn hàng */
  products: OrderProduct[];
  /** Ngày tạo */
  createdAt: Date;
  /** Ngày cập nhật */
  updatedAt: Date;
  /** Dữ liệu bổ sung */
  extradata?: any;
}

/**
 * Enhanced Order Response với thông tin chi tiết
 */
export interface EnhancedOrderResponse {
  /** ID đơn hàng */
  id: string;
  /** ID shop */
  shopId: string;
  /** Thông tin shop */
  shop?: {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  /** ID người dùng */
  userId?: string;
  /** Thông tin khách hàng */
  customer: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  /** Trạng thái đơn hàng */
  status: string;
  /** Thông tin thanh toán */
  payment: {
    method?: string;
    status?: string;
    transactionId?: string;
    paymentUrl?: string;
    paidAt?: Date;
    errorMessage?: string;
  };
  /** Thông tin vận chuyển */
  shipping: {
    method?: string;
    fee?: number;
    address?: string;
    estimatedDelivery?: Date;
  };
  /** Tính toán chi tiết */
  calculation: {
    subtotal: number;
    shippingFee: number;
    discount: number;
    tax: number;
    total: number;
    currency: string;
  };
  /** Danh sách sản phẩm trong đơn hàng */
  products: OrderProduct[];
  /** Ghi chú đơn hàng */
  notes?: string;
  /** Timestamps */
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
    confirmedAt?: Date;
    deliveredAt?: Date;
    cancelledAt?: Date;
  };
  /** Thông tin tracking */
  tracking?: {
    orderNumber: string;
    trackingNumber?: string;
    carrier?: string;
    status: string;
    lastUpdated: Date;
  };
  /** Metadata */
  metadata?: {
    source: string; // 'web', 'mobile', 'api'
    ipAddress?: string;
    userAgent?: string;
    referrer?: string;
  };
}

/**
 * Order List Response
 */
export interface OrderListResponse {
  /** Danh sách đơn hàng */
  orders: OrderResponse[];
  /** Tổng số đơn hàng */
  total: number;
  /** Trang hiện tại */
  page: number;
  /** Số lượng per page */
  limit: number;
  /** Có trang tiếp theo */
  hasNext: boolean;
  /** Có trang trước */
  hasPrev: boolean;
}
