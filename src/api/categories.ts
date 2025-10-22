import { HttpClient } from "../utils/http-client";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryResponse,
  CategoryListResponse,
} from "../types";

/**
 * Categories API Client
 */
export class CategoriesAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Lấy danh sách danh mục
   */
  async list(): Promise<CategoryListResponse> {
    const response = await this.httpClient.get<CategoryResponse[]>(
      "/categories"
    );

    return {
      categories: response.data || [],
      total: response.data?.length || 0,
      page: 1,
      limit: response.data?.length || 0,
      hasNext: false,
      hasPrev: false,
    };
  }

  /**
   * Tạo danh mục mới
   */
  async create(data: CreateCategoryDto): Promise<CategoryResponse> {
    const response = await this.httpClient.post<CategoryResponse>(
      "/categories",
      data
    );

    if (!response.data) {
      throw new Error("Không thể tạo danh mục");
    }

    return response.data;
  }

  /**
   * Lấy thông tin danh mục theo ID
   */
  async getById(id: string): Promise<CategoryResponse> {
    const response = await this.httpClient.get<CategoryResponse>(
      `/categories/${id}`
    );

    if (!response.data) {
      throw new Error("Không tìm thấy danh mục");
    }

    return response.data;
  }

  /**
   * Cập nhật danh mục
   */
  async update(id: string, data: UpdateCategoryDto): Promise<CategoryResponse> {
    const response = await this.httpClient.put<CategoryResponse>(
      `/categories/${id}`,
      data
    );

    if (!response.data) {
      throw new Error("Không thể cập nhật danh mục");
    }

    return response.data;
  }

  /**
   * Xóa danh mục
   */
  async delete(id: string): Promise<boolean> {
    const response = await this.httpClient.delete(`/categories/${id}`);
    return response.success;
  }

  /**
   * Lấy danh mục đang hoạt động
   */
  async getActive(): Promise<CategoryListResponse> {
    const allCategories = await this.list();

    return {
      ...allCategories,
      categories: allCategories.categories.filter(
        (category) => category.isActive
      ),
      total: allCategories.categories.filter((category) => category.isActive)
        .length,
    };
  }

  /**
   * Kích hoạt danh mục
   */
  async activate(id: string): Promise<CategoryResponse> {
    return this.update(id, { isActive: true });
  }

  /**
   * Vô hiệu hóa danh mục
   */
  async deactivate(id: string): Promise<CategoryResponse> {
    return this.update(id, { isActive: false });
  }
}
