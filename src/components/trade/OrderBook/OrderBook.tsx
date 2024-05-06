import React, { useEffect, useRef } from "react";
import "./styles.css";
import { OrderBookEntry } from "../../../types";

interface OrderBookProps {
  entries: OrderBookEntry[];
}

const OrderEntry: React.FC<OrderBookEntry> = ({ amount, price, type }) => {
  const maxAmount = 300;
  const percentage = (amount / maxAmount) * 100;
  const leftBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "sell" && leftBarRef.current) {
      leftBarRef.current.style.width = "0%";
      setTimeout(() => {
        if (leftBarRef.current) {
          leftBarRef.current.style.width = `${percentage}%`;
        }
      }, 0);
    } else if (type === "buy" && rightBarRef.current) {
      rightBarRef.current.style.width = "0%";
      setTimeout(() => {
        if (rightBarRef.current) {
          rightBarRef.current.style.width = `${percentage}%`;
        }
      }, 0);
    }
  }, [percentage, type]);

  return (
    <div className={`orderEntry ${type}`}>
      <span className={`amount ${type === "sell" ? "left" : "right"}`}>
        {amount}개
      </span>
      {type === "sell" && <div ref={leftBarRef} className="bar leftBar" />}
      <span className="price">{price.toLocaleString()}원</span>
      {type === "buy" && <div ref={rightBarRef} className="bar rightBar" />}
    </div>
  );
};

const OrderBook: React.FC<OrderBookProps> = ({ entries }) => {
  return (
    <div className="orderBook">
      {entries.map((entry, index) => (
        <OrderEntry key={index} {...entry} />
      ))}
    </div>
  );
};

export default OrderBook;
