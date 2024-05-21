import { instance } from ".";

export const fetchProperty = async (propertyId: string) => {
  const response = await instance.get(`/properties/${propertyId}`);

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};
