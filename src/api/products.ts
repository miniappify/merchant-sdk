import { HttpClient } from "../utils/http-client";
import {
  CreateProductDto,
  UpdateProductDto,
  ProductResponse,
  ProductListResponse,
  SearchParams,
} from "../types";

/**
 * Products API Client
 */
export class ProductsAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Lấy danh sách sản phẩm
   */
  async list(params?: SearchParams): Promise<ProductListResponse> {
    const response = await this.httpClient.get<{
      data: ProductResponse[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>("/products", params);

    // Handle both old format (meta) and new format (pagination)
    const data = response.data?.data || (Array.isArray(response.data) ? response.data : []);
    const pagination = response.data?.pagination || response.meta;
    const total = pagination?.total || 0;
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const totalPages = (pagination && 'pages' in pagination) ? pagination.pages : Math.ceil(total / limit);

    return {
      products: data,
      total,
      page,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  /**
   * Tạo sản phẩm mới
   */
  async create(data: CreateProductDto): Promise<ProductResponse> {
    const response = await this.httpClient.post<ProductResponse>(
      "/products",
      data
    );

    if (!response.data) {
      throw new Error("Không thể tạo sản phẩm");
    }

    return response.data;
  }

  /**
   * Lấy thông tin sản phẩm theo ID
   */
  async getById(id: string): Promise<ProductResponse> {
    const response = await this.httpClient.get<ProductResponse>(
      `/products/${id}`
    );

    if (!response.data) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    return response.data;
  }

  /**
   * Cập nhật sản phẩm
   */
  async update(id: string, data: UpdateProductDto): Promise<ProductResponse> {
    const response = await this.httpClient.put<ProductResponse>(
      `/products/${id}`,
      data
    );

    if (!response.data) {
      throw new Error("Không thể cập nhật sản phẩm");
    }

    return response.data;
  }

  /**
   * Xóa sản phẩm
   */
  async delete(id: string): Promise<boolean> {
    const response = await this.httpClient.delete(`/products/${id}`);
    return response.success;
  }

  /**
   * Tìm kiếm sản phẩm
   */
  async search(
    query: string,
    params?: Omit<SearchParams, "search">
  ): Promise<ProductListResponse> {
    return this.list({ ...params, search: query });
  }

  /**
   * Lấy sản phẩm theo danh mục
   */
  async getByCategory(
    categoryId: string,
    params?: Omit<SearchParams, "categoryId">
  ): Promise<ProductListResponse> {
    return this.list({ ...params, categoryId });
  }

  /**
   * Lấy sản phẩm nổi bật
   */
  async getFeatured(
    params?: Omit<SearchParams, "isFeatured">
  ): Promise<ProductListResponse> {
    return this.list({ ...params, isFeatured: true });
  }

  /**
   * Lấy sản phẩm mới
   */
  async getNew(
    params?: Omit<SearchParams, "isNew">
  ): Promise<ProductListResponse> {
    return this.list({ ...params, isNew: true });
  }

  /**
   * Lấy sản phẩm bán chạy
   */
  async getBestSeller(
    params?: Omit<SearchParams, "isBestSeller">
  ): Promise<ProductListResponse> {
    return this.list({ ...params, isBestSeller: true });
  }

  /**
   * Lấy sản phẩm theo trạng thái
   */
  async getByStatus(
    status: string,
    params?: Omit<SearchParams, "status">
  ): Promise<ProductListResponse> {
    return this.list({ ...params, status });
  }
}
