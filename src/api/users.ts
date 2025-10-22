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
    const response = await this.httpClient.get<UserResponse[]>(
      "/users",
      params
    );

    return {
      users: response.data || [],
      total: response.meta?.total || 0,
      page: response.meta?.page || 1,
      limit: response.meta?.limit || 10,
      hasNext: response.meta?.hasNext || false,
      hasPrev: response.meta?.hasPrev || false,
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
