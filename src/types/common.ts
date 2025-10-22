/**
 * Cấu hình cơ bản cho SDK
 */
export interface MiniappifyConfig {
  /** API Key để xác thực */
  apiKey: string;
  /** Base URL của API (mặc định: https://merchant-api.miniappify.vn) */
  baseUrl?: string;
  /** Timeout cho requests (mặc định: 30000ms) */
  timeout?: number;
  /** Version của API (mặc định: v1) */
  version?: string;
}

/**
 * Response cơ bản từ API
 */
export interface ApiResponse<T = any> {
  /** Trạng thái thành công */
  success: boolean;
  /** Dữ liệu trả về */
  data?: T;
  /** Thông báo lỗi */
  message?: string;
  /** Mã lỗi */
  error?: string;
  /** Metadata bổ sung */
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Số trang (bắt đầu từ 1) */
  page?: number;
  /** Số lượng items per page */
  limit?: number;
  /** Sắp xếp theo field */
  sortBy?: string;
  /** Thứ tự sắp xếp (asc/desc) */
  sortOrder?: "asc" | "desc";
}

/**
 * Search parameters
 */
export interface SearchParams extends PaginationParams {
  /** Từ khóa tìm kiếm */
  search?: string;
  /** Trạng thái filter */
  status?: string;
  /** Các filter khác */
  [key: string]: any;
}

/**
 * Error class cho SDK
 */
export class MiniappifyError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly details?: any;

  constructor(message: string, status?: number, code?: string, details?: any) {
    super(message);
    this.name = "MiniappifyError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
