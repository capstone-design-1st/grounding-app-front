import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { OrderBookEntry } from "../../../types";
import {
  useModalStore,
  useQuantityPriceStore,
} from "../../../store/tradeStore";

interface OrderBookProps {
  basePrice: number;
}

//거래 데이터가 없을 경우 기본 값으로 설정
const generateOrderBookData = (basePrice: number): OrderBookEntry[] => {
  const orderBookData: OrderBookEntry[] = [];
  const amount = 0;

  for (let i = 8; i > 0; i--) {
    orderBookData.push({
      price: basePrice + i * 50,
      amount: amount,
      type: "sell",
    });
  }

  for (let i = 1; i <= 8; i++) {
    orderBookData.push({
      price: basePrice - i * 50,
      amount: amount,
      type: "buy",
    });
  }

  return orderBookData;
};

const OrderEntry: React.FC<OrderBookEntry> = ({ amount, price, type }) => {
  const maxAmount = 300;
  const percentage = (amount / maxAmount) * 100;
  const leftBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);

  const { setShowModal } = useModalStore();
  const { setPrice } = useQuantityPriceStore();

  const handlePriceClick = () => {
    setPrice(price);
    setShowModal(true);
  };

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
      <span className="price" onClick={handlePriceClick}>
        {price.toLocaleString()}원
      </span>
      {type === "buy" && <div ref={rightBarRef} className="bar rightBar" />}
    </div>
  );
};

const OrderBook: React.FC<OrderBookProps> = ({ basePrice }) => {
  const [orderBookData, setOrderBookData] = useState<OrderBookEntry[]>([]);

  useEffect(() => {
    const initialData = generateOrderBookData(basePrice);
    setOrderBookData(initialData);

    const socket = new WebSocket("ws://3.39.108.39:8033/quotes");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.totalElements === 0) {
        setOrderBookData(initialData);
      } else {
        console.log(data);
      }
    };

    return () => {
      socket.close();
    };
  }, [basePrice]);

  return (
    <div className="orderBook">
      {orderBookData.map((entry, index) => (
        <OrderEntry key={index} {...entry} />
      ))}
    </div>
  );
};

export default OrderBook;
