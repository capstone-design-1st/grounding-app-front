import { instance } from "./index";

interface LocationDTO {
  city: string;
  gu: string;
  dong: string;
  detail: string;
}

interface PropertyDTO {
  id: string;
  name: string;
  oneline: string;
  present_price: number;
  view_count: number;
  like_count: number;
  volume_count: number;
  type: string;
  price_difference: number;
  price_difference_rate: number;
}

interface FundraiseDTO {
  progress_rate: number;
  deadline: string;
  investor_count: number;
  security_type: string; //증권사
  issuer: string; //발행인
  security_count: number; //증권수
  issue_price: number;
  total_fund: number;
  subscription_start_date: string;
  subscription_end_date: string;
  operator_name: string; //운영사
  operator_introduction: string; //운영사 설명
}

interface NewsDTO {
  id: string;
  s3_url: string;
  cloudfront_url: string;
  title: string;
  content: string;
  reported_at: string;
  publisher: string;
  url: string;
}

interface DocumentDTO {
  id: string;
  title: string;
  s3_url: string;
  cloudfront_url: string;
}

interface ThumbnailURLDTO {
  s3_url: string;
  cloudfront_url: string;
}

interface InvestmentPointDTO {
  title: string;
  content: string;
}

interface PropertyDetails {
  property_dto: PropertyDTO;
  fundraise_dto: FundraiseDTO;
  property_detail_dto: Record<string, any>;
  location_dto: LocationDTO;
  thumbnail_url_dto: ThumbnailURLDTO;
  news_dto: NewsDTO[];
  representation_photo_url_dto: ThumbnailURLDTO[];
  investment_point_dto: InvestmentPointDTO[];
  document_dto: DocumentDTO[];
}

export const fetchProperty = async (
  propertyId: string
): Promise<PropertyDetails> => {
  const response = await instance.get<PropertyDetails>(
    `/properties/${propertyId}`
  );

  if (response.status !== 200) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};
