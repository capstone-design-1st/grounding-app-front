import { instance } from "./index";

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

export const getLikeList = async (userId: string) => {
  const response = await instance.get(`/likes/properties/users/${userId}`);
  return response.data as LikesListProps;
};
