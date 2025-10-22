/**
 * Shop Information Response
 */
export interface ShopResponse {
  /** ID shop */
  id: string;
  /** Tên shop */
  name: string;
  /** Mô tả shop */
  description?: string;
  /** Địa chỉ shop */
  address?: string;
  /** Số điện thoại shop */
  phone?: string;
  /** Email shop */
  email?: string;
  /** Logo shop */
  logo?: string;
  /** Trạng thái hoạt động */
  isActive: boolean;
  /** App ID */
  appId?: string;
  /** Thông tin app */
  appInfor?: any;
  /** Miễn phí ship */
  isFreeShip?: boolean;
  /** Sử dụng dữ liệu mẫu */
  isUseSampleData?: boolean;
  /** Ngày tạo */
  createdAt: Date;
  /** Ngày cập nhật */
  updatedAt: Date;
}

/**
 * Shop Basic Info (từ /me endpoint)
 */
export interface ShopBasicInfo {
  /** Tên shop */
  name: string;
  /** Mô tả shop */
  description?: string;
  /** Địa chỉ shop */
  address?: string;
  /** Số điện thoại shop */
  phone?: string;
  /** Email shop */
  email?: string;
  /** Logo shop */
  logo?: string;
  /** Trạng thái hoạt động */
  isActive: boolean;
  /** App ID */
  appId?: string;
  /** Thông tin app */
  appInfor?: any;
  /** Miễn phí ship */
  isFreeShip?: boolean;
  /** Sử dụng dữ liệu mẫu */
  isUseSampleData?: boolean;
}
