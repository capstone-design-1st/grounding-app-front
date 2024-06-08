import { instanceWithToken } from ".";

interface FundraiseRequest {
  quantity: number;
}

export const fundraiseProperty = async (
  propertyId: string,
  data: FundraiseRequest
) => {
  const response = await instanceWithToken.post(
    `/fundraise/${propertyId}`,
    data
  );
  return response.data;
};
