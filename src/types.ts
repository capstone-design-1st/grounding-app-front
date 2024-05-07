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
}
