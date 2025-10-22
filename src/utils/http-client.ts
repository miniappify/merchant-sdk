import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { MiniappifyConfig, ApiResponse, MiniappifyError } from "../types";

/**
 * HTTP Client cho Miniappify API
 */
export class HttpClient {
  private client: AxiosInstance;
  private config: MiniappifyConfig;

  constructor(config: MiniappifyConfig) {
    this.config = {
      baseUrl: "https://merchant-api.miniappify.vn",
      timeout: 30000,
      version: "v1",
      ...config,
    };

    this.client = axios.create({
      baseURL: `${this.config.baseUrl}/api/${this.config.version}`,
      timeout: this.config.timeout,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.config.apiKey,
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Thêm timestamp để tránh cache
        if (config.method === "get") {
          config.params = {
            ...config.params,
            _t: Date.now(),
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        const miniappifyError = this.handleError(error);
        return Promise.reject(miniappifyError);
      }
    );
  }

  /**
   * Xử lý lỗi từ API
   */
  private handleError(error: any): MiniappifyError {
    if (error.response) {
      // Server trả về lỗi
      const { status, data } = error.response;
      const message = data?.message || data?.error || "API Error";
      const code = data?.code || "API_ERROR";

      return new MiniappifyError(message, status, code, data);
    } else if (error.request) {
      // Không có response từ server
      return new MiniappifyError(
        "Không thể kết nối đến server",
        0,
        "NETWORK_ERROR"
      );
    } else {
      // Lỗi khác
      return new MiniappifyError(
        error.message || "Unknown error",
        0,
        "UNKNOWN_ERROR"
      );
    }
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get(url, { params });
      return this.transformResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(url, data);
      return this.transformResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put(url, data);
      return this.transformResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete(url);
      return this.transformResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Transform response từ API
   */
  private transformResponse<T>(response: AxiosResponse): ApiResponse<T> {
    const { data } = response;

    // Nếu response đã có cấu trúc ApiResponse
    if (typeof data === "object" && "success" in data) {
      return data as ApiResponse<T>;
    }

    // Nếu response là array hoặc object thông thường
    return {
      success: true,
      data: data as T,
    };
  }

  /**
   * Upload file
   */
  async upload<T = any>(
    url: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return this.transformResponse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lấy cấu hình hiện tại
   */
  getConfig(): MiniappifyConfig {
    return { ...this.config };
  }

  /**
   * Cập nhật API key
   */
  updateApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
    this.client.defaults.headers["X-API-Key"] = apiKey;
  }

  /**
   * Cập nhật base URL
   */
  updateBaseUrl(baseUrl: string): void {
    this.config.baseUrl = baseUrl;
    this.client.defaults.baseURL = `${baseUrl}/api/${this.config.version}`;
  }
}
