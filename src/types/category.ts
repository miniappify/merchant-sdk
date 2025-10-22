/**
 * Create Category DTO
 */
export interface CreateCategoryDto {
  /** Tên danh mục */
  name: string;
  /** Mô tả danh mục */
  description?: string;
  /** Màu sắc danh mục */
  color: string;
  /** Icon danh mục (Lucide icon name) */
  icon?: string;
  /** Trạng thái hoạt động */
  isActive?: boolean;
}

/**
 * Update Category DTO
 */
export interface UpdateCategoryDto {
  /** Tên danh mục */
  name?: string;
  /** Mô tả danh mục */
  description?: string;
  /** Màu sắc danh mục */
  color?: string;
  /** Icon danh mục (Lucide icon name) */
  icon?: string;
  /** Trạng thái hoạt động */
  isActive?: boolean;
}

/**
 * Category Response
 */
export interface CategoryResponse {
  /** ID danh mục */
  id: string;
  /** Tên danh mục */
  name: string;
  /** Mô tả danh mục */
  description?: string;
  /** Màu sắc danh mục */
  color: string;
  /** Icon danh mục */
  icon?: string;
  /** Trạng thái hoạt động */
  isActive: boolean;
  /** Ngày tạo */
  createdAt: Date;
  /** Ngày cập nhật */
  updatedAt: Date;
}

/**
 * Category List Response
 */
export interface CategoryListResponse {
  /** Danh sách danh mục */
  categories: CategoryResponse[];
  /** Tổng số danh mục */
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
