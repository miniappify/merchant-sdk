import { HttpClient } from "../utils/http-client";
import {
  CreateOrderDto,
  UpdateOrderDto,
  OrderResponse,
  OrderListResponse,
  SearchParams,
} from "../types";

/**
 * Orders API Client
 */
export class OrdersAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Lấy danh sách đơn hàng
   */
  async list(params?: SearchParams): Promise<OrderListResponse> {
    const response = await this.httpClient.get<{
      data: OrderResponse[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>("/orders", params);

    // Handle both old format (meta) and new format (pagination)
    const data = response.data?.data || (Array.isArray(response.data) ? response.data : []);
    const pagination = response.data?.pagination || response.meta;
    const total = pagination?.total || 0;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const totalPages = (pagination && 'pages' in pagination) ? pagination.pages : Math.ceil(total / limit);

    return {
      orders: data,
      total,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Tạo đơn hàng mới
   */
  async create(data: CreateOrderDto): Promise<OrderResponse> {
    const response = await this.httpClient.post<OrderResponse>("/orders", data);

    if (!response.data) {
      throw new Error("Không thể tạo đơn hàng");
    }

    return response.data;
  }

  /**
   * Lấy thông tin đơn hàng theo ID
   */
  async getById(id: string): Promise<OrderResponse> {
    const response = await this.httpClient.get<OrderResponse>(`/orders/${id}`);

    if (!response.data) {
      throw new Error("Không tìm thấy đơn hàng");
    }

    return response.data;
  }

  /**
   * Cập nhật đơn hàng
   */
  async update(id: string, data: UpdateOrderDto): Promise<OrderResponse> {
    const response = await this.httpClient.put<OrderResponse>(
      `/orders/${id}`,
      data
    );

    if (!response.data) {
      throw new Error("Không thể cập nhật đơn hàng");
    }

    return response.data;
  }

  /**
   * Tìm kiếm đơn hàng
   */
  async search(
    query: string,
    params?: Omit<SearchParams, "search">
  ): Promise<OrderListResponse> {
    return this.list({ ...params, search: query });
  }

  /**
   * Lấy đơn hàng theo trạng thái
   */
  async getByStatus(
    status: string,
    params?: Omit<SearchParams, "status">
  ): Promise<OrderListResponse> {
    return this.list({ ...params, status });
  }

  /**
   * Lấy đơn hàng theo khách hàng
   */
  async getByCustomer(
    customerPhone: string,
    params?: Omit<SearchParams, "customerPhone">
  ): Promise<OrderListResponse> {
    return this.list({ ...params, customerPhone });
  }

  /**
   * Lấy đơn hàng theo ngày
   */
  async getByDateRange(
    startDate: string,
    endDate: string,
    params?: Omit<SearchParams, "startDate" | "endDate">
  ): Promise<OrderListResponse> {
    return this.list({ ...params, startDate, endDate });
  }

  /**
   * Cập nhật trạng thái đơn hàng
   */
  async updateStatus(
    id: string,
    status: "pending" | "confirmed" | "delivered" | "cancelled"
  ): Promise<OrderResponse> {
    return this.update(id, { status });
  }

  /**
   * Xác nhận đơn hàng
   */
  async confirm(id: string): Promise<OrderResponse> {
    return this.updateStatus(id, "confirmed");
  }

  /**
   * Giao hàng
   */
  async deliver(id: string): Promise<OrderResponse> {
    return this.updateStatus(id, "delivered");
  }

  /**
   * Hủy đơn hàng
   */
  async cancel(id: string): Promise<OrderResponse> {
    return this.updateStatus(id, "cancelled");
  }
}
