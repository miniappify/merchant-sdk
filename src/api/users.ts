import { HttpClient } from "../utils/http-client";
import { UserResponse, UserListResponse, UserSearchParams } from "../types";

/**
 * Users API Client
 */
export class UsersAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Lấy danh sách người dùng
   */
  async list(params?: UserSearchParams): Promise<UserListResponse> {
    const response = await this.httpClient.get<{
      data: UserResponse[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>("/users", params);

    // Handle both old format (meta) and new format (pagination)
    const data = response.data?.data || (Array.isArray(response.data) ? response.data : []);
    const pagination = response.data?.pagination || response.meta;
    const total = pagination?.total || 0;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const totalPages = (pagination && 'pages' in pagination) ? pagination.pages : Math.ceil(total / limit);

    return {
      users: data,
      total,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Tìm kiếm người dùng
   */
  async search(
    query: string,
    params?: Omit<UserSearchParams, "search">
  ): Promise<UserListResponse> {
    return this.list({ ...params, search: query });
  }

  /**
   * Lấy người dùng theo trạng thái
   */
  async getByStatus(
    status: string,
    params?: Omit<UserSearchParams, "status">
  ): Promise<UserListResponse> {
    return this.list({ ...params, status });
  }

  /**
   * Lấy người dùng theo số điện thoại
   */
  async getByPhone(
    phone: string,
    params?: Omit<UserSearchParams, "search">
  ): Promise<UserListResponse> {
    return this.search(phone, params);
  }

  /**
   * Lấy người dùng theo email
   */
  async getByEmail(
    email: string,
    params?: Omit<UserSearchParams, "search">
  ): Promise<UserListResponse> {
    return this.search(email, params);
  }

  /**
   * Lấy người dùng theo tên
   */
  async getByName(
    name: string,
    params?: Omit<UserSearchParams, "search">
  ): Promise<UserListResponse> {
    return this.search(name, params);
  }

  /**
   * Lấy người dùng đang hoạt động
   */
  async getActive(
    params?: Omit<UserSearchParams, "status">
  ): Promise<UserListResponse> {
    return this.getByStatus("active", params);
  }

  /**
   * Lấy người dùng bị khóa
   */
  async getInactive(
    params?: Omit<UserSearchParams, "status">
  ): Promise<UserListResponse> {
    return this.getByStatus("inactive", params);
  }

  /**
   * Lấy tất cả người dùng (không filter)
   */
  async getAll(
    params?: Omit<UserSearchParams, "status">
  ): Promise<UserListResponse> {
    return this.list(params);
  }
}
