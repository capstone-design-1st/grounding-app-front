export interface AccordionItem {
  title: string;
  content: string;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  type: "buy" | "sell";
}
