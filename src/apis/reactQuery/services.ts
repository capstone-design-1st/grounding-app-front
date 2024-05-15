import { instance } from "../../apis";

interface Listing {
  id: number;
  title: string;
  description: string;
}

// 매물 리스트 조회
export const fetchListings = async (
  page: number,
  size: number,
  status: string
): Promise<Listing[]> => {
  const response = await instance.get(
    `/listings?page=${page}&size=${size}&status=${status}`
  );
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data as Listing[];
};

// 매물 갯수 조회
export const fetchListingsCount = async () => {
  return instance
    .get(`/home/listings/counting`)
    .then((response) => response.data);
};

// 거래 순위에 따른 매물 리스트 조회
export const fetchListingsByVolume = async (page: number, size: number) => {
  return instance
    .get(`/home/listings?rank=tradingVolume&page=${page}&size=${size}`)
    .then((response) => response.data);
};
