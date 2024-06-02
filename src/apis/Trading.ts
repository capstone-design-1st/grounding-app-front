import { instance } from ".";

//구매 가능한 수량 조회
export const getAvailableBuyQuantity = async (propertyId: string | null) => {
  const response = await instance.get(
    `/trading/${propertyId}/inventory/quantity`
  );
  return response.data;
};

//매도 가능한 수량 조회
export const getAvailableSellQuantity = async (propertyId: string | null) => {
  const response = await instance.get(
    `/trading/${propertyId}/inventory/quantity`
  );
  console.log(response.data);
  return response.data;
};
