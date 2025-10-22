import { HttpClient } from "./utils/http-client";
import { ProductsAPI } from "./api/products";
import { OrdersAPI } from "./api/orders";
import { CategoriesAPI } from "./api/categories";
import { ShopAPI } from "./api/shop";
import { UsersAPI } from "./api/users";
import { GHNApi } from "./api/ghn";
import { LocationApi } from "./api/location";
import { MiniappifyConfig } from "./types";

/**
 * Miniappify Merchant SDK
 *
 * SDK TypeScript để tương tác với Miniappify Merchant API
 *
 * @example
 * ```typescript
 * import { MiniappifySDK } from '@miniappify/merchant-sdk';
 *
 * const sdk = new MiniappifySDK({
 *   apiKey: 'your-api-key-here'
 * });
 *
 * // Lấy danh sách sản phẩm
 * const products = await sdk.products.list();
 *
 * // Tạo đơn hàng mới
 * const order = await sdk.orders.create({
 *   customerName: 'Nguyễn Văn A',
 *   customerPhone: '0123456789',
 *   totalAmount: 100000,
 *   products: [...]
 * });
 * ```
 */
export class MiniappifySDK {
  private httpClient: HttpClient;

  public readonly products: ProductsAPI;
  public readonly orders: OrdersAPI;
  public readonly categories: CategoriesAPI;
  public readonly shop: ShopAPI;
  public readonly users: UsersAPI;
  public readonly ghn: GHNApi;
  public readonly location: LocationApi;

  constructor(config: MiniappifyConfig) {
    // Validate required config
    if (!config.apiKey) {
      throw new Error("API Key là bắt buộc");
    }

    // Initialize HTTP client
    this.httpClient = new HttpClient(config);

    // Initialize API modules
    this.products = new ProductsAPI(this.httpClient);
    this.orders = new OrdersAPI(this.httpClient);
    this.categories = new CategoriesAPI(this.httpClient);
    this.shop = new ShopAPI(this.httpClient);
    this.users = new UsersAPI(this.httpClient);
    this.ghn = new GHNApi(this.httpClient);
    this.location = new LocationApi(this.httpClient);
  }

  /**
   * Cập nhật API key
   */
  updateApiKey(apiKey: string): void {
    this.httpClient.updateApiKey(apiKey);
  }

  /**
   * Cập nhật base URL
   */
  updateBaseUrl(baseUrl: string): void {
    this.httpClient.updateBaseUrl(baseUrl);
  }

  /**
   * Lấy cấu hình hiện tại
   */
  getConfig(): MiniappifyConfig {
    return this.httpClient.getConfig();
  }

  /**
   * Kiểm tra kết nối API
   */
  async ping(): Promise<boolean> {
    try {
      await this.shop.getMe();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Lấy thông tin version của SDK
   */
  getVersion(): string {
    return "1.0.0";
  }
}

// Export types
export * from "./types";

// Export individual API classes
export { ProductsAPI } from "./api/products";
export { OrdersAPI } from "./api/orders";
export { CategoriesAPI } from "./api/categories";
export { ShopAPI } from "./api/shop";
export { UsersAPI } from "./api/users";
export { GHNApi } from "./api/ghn";
export { LocationApi } from "./api/location";

// Default export
export default MiniappifySDK;
