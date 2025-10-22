import { HttpClient } from "../utils/http-client";
import {
  GHNApiResponse,
  GHNProvince,
  GHNDistrict,
  GHNWard,
  GHNServiceResponse,
  GHNShippingFeeResponse,
  GHNShippingFeeParams,
  GHNShippingFeeAutoParams,
} from "../types";

export class GHNApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Lấy danh sách tỉnh/thành phố từ GHN
   */
  async getProvinces(): Promise<GHNApiResponse<GHNProvince>> {
    const response = await this.httpClient.get("/api/v1/ghn/provinces");
    return response.data;
  }

  /**
   * Lấy danh sách quận/huyện theo tỉnh
   */
  async getDistricts(provinceId: number): Promise<GHNApiResponse<GHNDistrict>> {
    const response = await this.httpClient.get("/api/v1/ghn/districts", {
      params: { province_id: provinceId },
    });
    return response.data;
  }

  /**
   * Lấy danh sách phường/xã theo quận/huyện
   */
  async getWards(districtId: number): Promise<GHNApiResponse<GHNWard>> {
    const response = await this.httpClient.get("/api/v1/ghn/wards", {
      params: { district_id: districtId },
    });
    return response.data;
  }

  /**
   * Lấy danh sách dịch vụ vận chuyển có sẵn
   */
  async getAvailableServices(
    fromDistrict: number,
    toDistrict: number
  ): Promise<GHNServiceResponse> {
    const response = await this.httpClient.get(
      "/api/v1/ghn/available-services",
      {
        params: {
          from_district: fromDistrict,
          to_district: toDistrict,
        },
      }
    );
    return response.data;
  }

  /**
   * Tính phí vận chuyển
   */
  async calculateShippingFee(
    params: GHNShippingFeeParams
  ): Promise<GHNShippingFeeResponse> {
    const response = await this.httpClient.get("/api/v1/ghn/shipping-fee", {
      params: {
        service_id: params.serviceId,
        service_type_id: params.serviceTypeId,
        insurance_value: params.insuranceValue,
        coupon: params.coupon,
        to_ward_code: params.toWardCode,
        to_district_id: params.toDistrictId,
        from_district_id: params.fromDistrictId,
        from_ward_code: params.fromWardCode,
        weight: params.weight,
        length: params.length,
        width: params.width,
        height: params.height,
      },
    });
    return response.data;
  }

  /**
   * Tính phí vận chuyển với tự động chọn dịch vụ
   */
  async calculateShippingFeeAuto(
    params: GHNShippingFeeAutoParams
  ): Promise<GHNShippingFeeResponse> {
    const response = await this.httpClient.get(
      "/api/v1/ghn/shipping-fee-auto",
      {
        params: {
          insurance_value: params.insuranceValue,
          coupon: params.coupon,
          to_ward_code: params.toWardCode,
          to_district_id: params.toDistrictId,
          shop_id: params.shopId,
          weight: params.weight,
          length: params.length,
          width: params.width,
          height: params.height,
        },
      }
    );
    return response.data;
  }
}
