import { HttpClient } from "../utils/http-client";
import { ShopBasicInfo } from "../types";

/**
 * Shop API Client
 */
export class ShopAPI {
  constructor(private httpClient: HttpClient) {}

  /**
   * Lấy thông tin cơ bản của shop
   */
  async getMe(): Promise<ShopBasicInfo> {
    const response = await this.httpClient.get<ShopBasicInfo>("/shop/me");

    if (!response.data) {
      throw new Error("Không thể lấy thông tin shop");
    }

    return response.data;
  }

  /**
   * Lấy thông tin chi tiết shop
   */
  async getInfo(): Promise<ShopBasicInfo> {
    return this.getMe();
  }

  /**
   * Kiểm tra trạng thái shop
   */
  async isActive(): Promise<boolean> {
    const shopInfo = await this.getMe();
    return shopInfo.isActive;
  }

  /**
   * Lấy tên shop
   */
  async getName(): Promise<string> {
    const shopInfo = await this.getMe();
    return shopInfo.name;
  }

  /**
   * Lấy thông tin liên hệ
   */
  async getContactInfo(): Promise<{
    phone?: string;
    email?: string;
    address?: string;
  }> {
    const shopInfo = await this.getMe();
    return {
      phone: shopInfo.phone,
      email: shopInfo.email,
      address: shopInfo.address,
    };
  }

  /**
   * Lấy logo shop
   */
  async getLogo(): Promise<string | undefined> {
    const shopInfo = await this.getMe();
    return shopInfo.logo;
  }

  /**
   * Lấy thông tin app
   */
  async getAppInfo(): Promise<{
    appId?: string;
    appInfor?: any;
  }> {
    const shopInfo = await this.getMe();
    return {
      appId: shopInfo.appId,
      appInfor: shopInfo.appInfor,
    };
  }

  /**
   * Kiểm tra có miễn phí ship không
   */
  async isFreeShip(): Promise<boolean> {
    const shopInfo = await this.getMe();
    return shopInfo.isFreeShip || false;
  }

  /**
   * Kiểm tra có sử dụng dữ liệu mẫu không
   */
  async isUseSampleData(): Promise<boolean> {
    const shopInfo = await this.getMe();
    return shopInfo.isUseSampleData || false;
  }
}
