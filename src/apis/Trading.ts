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
    `/trading/${propertyId}/inventory/quantity`
  );
  return response.data;
};

//매도 가능한 수량 조회
export const getAvailableSellQuantity = async (propertyId: string | null) => {
  const response = await instanceWithToken.get(
    `/trading/${propertyId}/inventory/quantity`
  );
  console.log(response.data);
  return response.data;
};
