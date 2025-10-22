/**
 * Product Attribute
 */
export interface ProductAttribute {
  /** Tên thuộc tính (vd: color, size) */
  name: string;
  /** Giá trị thuộc tính (vd: Red, L) */
  value: string;
  /** Tên hiển thị (vd: Màu sắc) */
  displayName?: string;
  /** Giá bổ sung cho thuộc tính (vd: +5000 cho size L) */
  price?: number;
}

/**
 * Product Variant
 */
export interface ProductVariant {
  /** SKU của variant */
  sku: string;
  /** Giá của variant */
  price: number;
  /** Giá gốc trước giảm giá */
  priceBeforeDiscount?: number;
  /** Phần trăm giảm giá (0-100) */
  discount?: number;
  /** Số lượng tồn kho */
  stock: number;
  /** Các thuộc tính của variant */
  attributes: ProductAttribute[];
  /** Hình ảnh của variant */
  images?: string[];
  /** Trạng thái hoạt động */
  isActive?: boolean;
}

/**
 * Create Product DTO
 */
export interface CreateProductDto {
  /** Tên sản phẩm */
  name: string;
  /** Mô tả sản phẩm */
  description?: string;
  /** Mã sản phẩm */
  code?: string;
  /** Slug sản phẩm */
  slug?: string;
  /** Tên thương hiệu */
  brandName?: string;
  /** Tên đơn vị */
  unitName?: string;
  /** Trọng lượng sản phẩm */
  weight?: number;
  /** Mô tả ngắn */
  descriptionShort?: string;
  /** Mô tả đầy đủ */
  descriptionFull?: string;
  /** URL video */
  videoUrl?: string;
  /** Các variant của sản phẩm */
  variants: ProductVariant[];
  /** Danh sách ID danh mục */
  categoryIds?: string[];
  /** Trạng thái hoạt động */
  isActive?: boolean;
  /** Trạng thái có sẵn */
  isAvailable?: boolean;
  /** Trạng thái hiển thị */
  isVisible?: boolean;
  /** Sản phẩm mới */
  isNew?: boolean;
  /** Bán chạy */
  isBestSeller?: boolean;
  /** Nổi bật */
  isFeatured?: boolean;
  /** Có thể thêm vào giỏ hàng */
  canAddToCart?: boolean;
  /** Có thể chọn số lượng */
  canChooseQuantity?: boolean;
  /** Có thể yêu thích */
  canFavorite?: boolean;
  /** Cho phép ghi chú tùy chỉnh */
  allowCustomNote?: boolean;
  /** Hình ảnh chính */
  image?: string;
  /** Danh sách hình ảnh */
  imageUrls?: string[];
  /** Danh sách hình ảnh (alias) */
  images?: string[];
  /** Thuộc tính sản phẩm */
  attributes?: Record<string, string>;
}

/**
 * Update Product DTO
 */
export interface UpdateProductDto extends Partial<CreateProductDto> {}

/**
 * Product Response
 */
export interface ProductResponse {
  /** ID sản phẩm */
  id: string;
  /** ID shop */
  shopId: string;
  /** Tên sản phẩm */
  name: string;
  /** Mô tả sản phẩm */
  description?: string;
  /** Mã sản phẩm */
  code?: string;
  /** Slug sản phẩm */
  slug?: string;
  /** Tên thương hiệu */
  brandName?: string;
  /** Tên đơn vị */
  unitName?: string;
  /** Trọng lượng sản phẩm */
  weight?: number;
  /** Mô tả ngắn */
  descriptionShort?: string;
  /** Mô tả đầy đủ */
  descriptionFull?: string;
  /** URL video */
  videoUrl?: string;
  /** Các variant của sản phẩm */
  variants?: ProductVariant[];
  /** Danh sách ID danh mục */
  categoryIds?: string[];
  /** Trạng thái hoạt động */
  isActive?: boolean;
  /** Trạng thái có sẵn */
  isAvailable?: boolean;
  /** Trạng thái hiển thị */
  isVisible?: boolean;
  /** Sản phẩm mới */
  isNew?: boolean;
  /** Bán chạy */
  isBestSeller?: boolean;
  /** Nổi bật */
  isFeatured?: boolean;
  /** Có thể thêm vào giỏ hàng */
  canAddToCart?: boolean;
  /** Có thể chọn số lượng */
  canChooseQuantity?: boolean;
  /** Có thể yêu thích */
  canFavorite?: boolean;
  /** Cho phép ghi chú tùy chỉnh */
  allowCustomNote?: boolean;
  /** Tổng số lượng tồn kho */
  totalStock?: number;
  /** Giá tối thiểu */
  minPrice?: number;
  /** Giá tối đa */
  maxPrice?: number;
  /** Hình ảnh chính */
  image?: string;
  /** Danh sách hình ảnh */
  imageUrls?: string[];
  /** Danh sách hình ảnh (alias) */
  images?: string[];
  /** Thuộc tính sản phẩm */
  attributes?: Record<string, string>;
  /** Trạng thái sản phẩm */
  status?: string;
  /** Đánh giá trung bình */
  ratingAvg?: number;
  /** Số lượng đánh giá */
  ratingCount?: number;
  /** Đánh giá */
  rating?: number;
  /** Ngày tạo */
  createdAt: Date;
  /** Ngày cập nhật */
  updatedAt: Date;
}

/**
 * Product List Response
 */
export interface ProductListResponse {
  /** Danh sách sản phẩm */
  products: ProductResponse[];
  /** Tổng số sản phẩm */
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
