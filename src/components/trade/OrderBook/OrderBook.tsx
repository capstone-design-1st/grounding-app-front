import React from "react";
import "./styles.css";
import { OrderBookEntry } from "../../../types";

interface OrderBookProps {
  entries: OrderBookEntry[];
}

const OrderBook: React.FC<OrderBookProps> = ({ entries }) => {
  const maxAmount = 300; // 바의 최대 기준을 1000개로 고정

  return (
    <div className="orderBook">
      {entries.map((entry, index) => (
        <div key={index} className={`orderEntry ${entry.type}`}>
          <span
            className={`amount ${entry.type === "sell" ? "left" : "right"}`}
          >
            {entry.amount}개
          </span>
          {entry.type === "sell" && (
            <div
              className="bar leftBar"
              style={{
                width: `${(entry.amount / maxAmount) * 100}%`, // 매도 주문 바의 너비 계산
              }}
            />
          )}
          <span className="price">{entry.price.toLocaleString()}원</span>
          {entry.type === "buy" && (
            <div
              className="bar rightBar"
              style={{
                width: `${(entry.amount / maxAmount) * 100}%`, // 매수 주문 바의 너비 계산
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderBook;
