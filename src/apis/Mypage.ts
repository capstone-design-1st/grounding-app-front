import { instanceWithToken } from "./index";

type QueryKey = [
  string,
  {
    page: number;
    size: number;
    startDate?: string;
    endDate?: string;
    type?: string;
  }
];

export const getTransactions = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [, { page, size, startDate, endDate, type }] = queryKey;
  const { data } = await instanceWithToken.get("/account/transactions", {
    params: { page, size, startDate, endDate, type },
  });
  return data;
};

//내가 가진 자산 리스트 조회ㄴ
export const getMyAccountInventory = async () => {
  const response = await instanceWithToken.get("/account/inventory");
  return response.data;
};
