export interface GHNProvince {
  ProvinceID: number;
  ProvinceName: string;
  CountryID: number;
  Code: string;
  NameExtension: string[];
  IsEnable: number;
  RegionID: number;
  RegionCPN: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  AreaID: number;
  CanUpdateCOD: boolean;
  Status: number;
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}

export interface GHNDistrict {
  DistrictID: number;
  ProvinceID: number;
  DistrictName: string;
  Code: string;
  Type: number;
  SupportType: number;
  NameExtension: string[];
  IsEnable: number;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  CanUpdateCOD: boolean;
  Status: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: {
    From: any[];
    To: any[];
    Return: any[];
  };
  WhiteListDistrict: {
    From: any;
    To: any;
  };
  GovernmentCode: string;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string[];
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}

export interface GHNWard {
  WardCode: string;
  DistrictID: number;
  WardName: string;
  NameExtension: string[];
  IsEnable: number;
  CanUpdateCOD: boolean;
  UpdatedBy: number;
  CreatedAt: string;
  UpdatedAt: string;
  SupportType: number;
  PickType: number;
  DeliverType: number;
  WhiteListClient: {
    From: any[];
    To: any[];
    Return: any[];
  };
  WhiteListWard: {
    From: any;
    To: any;
  };
  GovernmentCode: string;
  Status: number;
  ReasonCode: string;
  ReasonMessage: string;
  OnDates: string[];
  UpdatedEmployee: number;
  UpdatedSource: string;
  UpdatedDate: string;
}

export interface GHNApiResponse<T> {
  code: number;
  message: string;
  data: T[];
}

export interface GHNService {
  service_id: number;
  short_name: string;
  service_type_id: number;
  config_fee_id: string;
  extra_cost_id: string;
  standard_config_fee_id: string;
  standard_extra_cost_id: string;
  ecom_config_fee_id: number;
  ecom_extra_cost_id: number;
  ecom_standard_config_fee_id: number;
  ecom_standard_extra_cost_id: number;
}

export interface GHNShippingFee {
  total: number;
  service_fee: number;
  insurance_fee: number;
  pick_station_fee: number;
  coupon_value: number;
  r2s_fee: number;
  return_again: number;
  document_return: number;
  double_check: number;
  cod_fee: number;
  pick_remote_areas_fee: number;
  deliver_remote_areas_fee: number;
  cod_failed_fee: number;
}

export interface GHNShippingFeeResponse {
  code: number;
  code_message_value: string;
  data: GHNShippingFee;
  message: string;
}

export interface GHNServiceResponse {
  code: number;
  code_message_value: string;
  data: GHNService[];
  message: string;
}

export interface GHNShippingFeeParams {
  serviceId?: number;
  serviceTypeId?: number;
  insuranceValue?: number;
  coupon?: string;
  toWardCode: string;
  toDistrictId: number;
  fromDistrictId: number;
  fromWardCode: string;
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface GHNShippingFeeAutoParams {
  shopId: string;
  insuranceValue?: number;
  coupon?: string;
  toWardCode: string;
  toDistrictId: number;
  weight: number;
  length: number;
  width: number;
  height: number;
}
