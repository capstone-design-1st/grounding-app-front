import { instanceWithoutToken, instanceWithToken } from ".";

interface Listing {
  listing_id: string;
  thumbnail_url: string;
  name: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

interface HomeData {
  content: Listing[];
}
// 매물 리스트 조회
export const fetchListings = async (
  page: number,
  size: number,
  status: string
): Promise<HomeData> => {
  const response = await instanceWithoutToken.get(
    `/property?page=${page}&size=${size}&status=${status}`
  );
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data as HomeData;
};

// 매물 갯수 조회
export const fetchListingsCount = async () => {
  return instanceWithoutToken
    .get(`/home/property/counting`)
    .then((response) => response.data);
};

//보유 자산 조회
export const fetchAssetHome = async (userId: string) => {
  return instanceWithToken
    .get(`/home/${userId}/listings`)
    .then((response) => response.data);
};

// 거래 순위에 따른 매물 리스트 조회
export const fetchListingsByVolume = async () => {
  return instanceWithoutToken
    .get(`/properties/popular`)
    .then((response) => response.data);
};
