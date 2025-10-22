/**
 * User Response
 */
export interface UserResponse {
  /** ID người dùng */
  id: string;
  /** ID shop */
  shopId: string;
  /** Tên đầy đủ */
  fullName: string;
  /** Số điện thoại */
  phone?: string;
  /** Email */
  email?: string;
  /** Avatar */
  avatar?: string;
  /** Trạng thái */
  status?: string;
  /** Ngày tạo */
  createdAt: Date;
  /** Ngày cập nhật */
  updatedAt: Date;
}

/**
 * User List Response
 */
export interface UserListResponse {
  /** Danh sách người dùng */
  users: UserResponse[];
  /** Tổng số người dùng */
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

/**
 * User Search Parameters
 */
export interface UserSearchParams {
  /** Từ khóa tìm kiếm (tên, phone, email) */
  search?: string;
  /** Trạng thái filter */
  status?: string;
  /** Số trang */
  page?: number;
  /** Số lượng per page */
  limit?: number;
}
