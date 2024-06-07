import { instanceWithToken } from ".";
import { instanceWithoutToken } from ".";
import { FetchPropertiesParams, ApiResponse } from "../types";

// getPropertiesList 함수 정의
export const getPropertiesList = async ({
  keyword,
  page,
  size,
}: FetchPropertiesParams): Promise<ApiResponse> => {
  const response = await instanceWithoutToken.get(`/properties/searching`, {
    params: { keyword, page, size },
  });
  return response.data;
};

//구매 가능한 수량 조회
export const getAvailableBuyQuantity = async (propertyId: string | null) => {
  const response = await instanceWithToken.get(
    `/trading/${propertyId}/buyable-quantity`
  );
  return response.data;
};

//매도 가능한 수량 조회
export const getAvailableSellQuantity = async (propertyId: string | null) => {
  const response = await instanceWithToken.get(
    `/trading/${propertyId}/inventory/quantity`
  );
  return response.data;
};

// 당일 거래 조회
export const getTodayTrading = async (
  propertyId: string | null,
  page: number,
  size: number
) => {
  const response = await instanceWithToken.get(
    `/properties/${propertyId}/real-time-transaction-log`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};

// 일별 거래 조회
export const getEachDayTrading = async (
  propertyId: string | null,
  page: number,
  size: number
) => {
  const response = await instanceWithToken.get(
    `/properties/${propertyId}/price-info`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};

//매도하기
export const postBuyProperty = async (
  propertyId: string | null,
  quantity: number,
  price: number
) => {
  const response = await instanceWithToken.post(
    `/trading/${propertyId}/buying`,
    {
      quantity,
      price,
    }
  );
  return response.data;
};

//매수하기
export const postSellProperty = async (
  propertyId: string | null,
  quantity: number,
  price: number
) => {
  const response = await instanceWithToken.post(
    `/trading/${propertyId}/selling`,
    {
      quantity,
      price,
    }
  );
  return response.data;
};
