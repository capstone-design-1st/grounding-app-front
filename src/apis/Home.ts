import { instanceWithoutToken, instanceWithToken } from ".";

interface Listing {
  created_at: string;
  name: string;
  oneline: string;
  property_id: string;
  thumbnail_url: string | null;
}

interface onGoingList {
  content: Listing[];
}

// 모집 중 매물 리스트 조회
export const getOnGoingList = async (): Promise<onGoingList> => {
  const response = await instanceWithoutToken.get<onGoingList>(
    `/properties/fundraising/basic-info`
  );
  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
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
