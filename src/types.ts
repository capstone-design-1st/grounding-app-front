export interface AccordionItem {
  title: string;
  content: string;
}

export interface OrderBookEntry {
  price: number;
  quantity: number;
  type: "buy" | "sell";
}

export interface ChartTableProps {
  headers: string[];
  data: TodayTradingTableRow[] | EachDayTradingTableRow[];
  type: "today" | "eachDay";
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
  type: "building" | "land";
}

// API 응답 타입 정의
export interface ApiResponse {
  content: Property[];
}

//당일 거래 타입 정의
export interface TodayTradingTableRow {
  executed_at: string;
  executed_price: string;
  fluctuation_rate: string;
  quantity: string;
}

//일별 거래 타입 정의
export interface EachDayTradingTableRow {
  closing_price: number;
  fluctuation_rate: number;
  date: string;
  max_price: number;
  min_price: number;
  opening_price: number;
  property_id: string;
  volume_count: number;
}

//거래 내역 타입 정의
export type transactionQueryKey = [
  string,
  {
    page: number;
    size: number;
    startDate?: string;
    endDate?: string;
    type?: string;
  }
];
