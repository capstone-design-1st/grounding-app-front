import { instanceWithToken } from "./index";
import { transactionQueryKey } from "../types";
import { QueryFunction } from "react-query";

//거래 내역 조회
export const getTransactions: QueryFunction<any, transactionQueryKey> = async ({
  queryKey,
}) => {
  const [, { page, size, startDate, endDate }] = queryKey;
  const response = await instanceWithToken.get("/account/transactions", {
    params: { page, size, startDate, endDate },
  });
  return response.data;
};

//내가 가진 자산 리스트 조회
export const getMyAccountInventory = async () => {
  const response = await instanceWithToken.get("/account/inventory");
  return response.data;
};

//현재 투자 금액 조회
export const getMyInvestment = async () => {
  const response = await instanceWithToken.get("/account/present-status");
  return response.data;
};
