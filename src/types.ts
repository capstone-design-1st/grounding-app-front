export interface AccordionItem {
  title: string;
  content: string;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  type: "buy" | "sell";
}

export interface table2RowsProps {
  label: string;
  value: string;
  color?: string;
  weight?: string;
  fontSize?: string;
}

// 검색 타입 정의
export interface FetchPropertiesParams {
  keyword: string;
  page: number;
  size: number;
}

// Property 타입 정의 (API 응답의 각 항목)
export interface Property {
  property_id: string;
  city: string;
  gu: string;
  name: string;
  one_line: string;
  fluctuation_rate: number;
}

// API 응답 타입 정의
export interface ApiResponse {
  content: Property[];
}
