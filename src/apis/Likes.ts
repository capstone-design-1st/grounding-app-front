import { instanceWithToken } from "./index";

interface AssetListItemProps {
  id: string;
  name: string;
  present_price: number;
  fluctuation_rate: number;
  price_difference: number;
  type: string;
}

interface LikesListProps {
  content: AssetListItemProps[];
}

interface LikeResponse {
  property_id: string;
  user_id: string;
  liked_at?: string;
  disliked_at?: string;
  like_count: number;
}

export const addLike = async (propertyId: string): Promise<LikeResponse> => {
  const response = await instanceWithToken.post(
    `/likes/properties/${propertyId}`
  );
  return response.data as LikeResponse;
};

export const deleteLike = async (propertyId: string): Promise<LikeResponse> => {
  const response = await instanceWithToken.delete(
    `/likes/properties/${propertyId}`
  );
  return response.data as LikeResponse;
};

export const getLikeList = async () => {
  const response = await instanceWithToken.get(`/likes/properties`);
  return response.data as LikesListProps;
};
