import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { OrderBookEntry } from "../../../types";
import {
  useModalStore,
  usePropertyStore,
  useQuantityPriceStore,
} from "../../../store/tradeStore";
import { getToken } from "../../../util/token";

interface OrderBookProps {
  basePrice: number;
}

// 거래 데이터가 없을 경우 기본 값으로 설정
const generateOrderBookData = (basePrice: number): OrderBookEntry[] => {
  const orderBookData: OrderBookEntry[] = [];
  const amount = 0;

  // 매도 부분: basePrice부터 시작
  for (let i = 8; i >= 0; i--) {
    orderBookData.push({
      price: basePrice + i * 50,
      quantity: amount,
      type: "매도",
    });
  }

  // 매수 부분: basePrice보다 낮은 가격부터 시작
  for (let i = 1; i < 8; i++) {
    orderBookData.push({
      price: basePrice - i * 50,
      quantity: amount,
      type: "매수",
    });
  }
  return orderBookData;
};

const updateOrderBookData = (
  initialData: OrderBookEntry[],
  content: OrderBookEntry[]
): OrderBookEntry[] => {
  const updatedData = [...initialData];

  content.forEach((item) => {
    const index = updatedData.findIndex(
      (entry) => entry.price === item.price && entry.type === item.type
    );
    if (index !== -1) {
      updatedData[index].quantity = item.quantity;
    }
  });

  return updatedData;
};

const OrderEntry: React.FC<OrderBookEntry> = ({
  quantity,
  price,
  type,
  currentPrice,
}) => {
  const maxAmount = 3000;
  const percentage = (quantity / maxAmount) * 100;
  const leftBarRef = useRef<HTMLDivElement>(null);
  const rightBarRef = useRef<HTMLDivElement>(null);

  const { setShowModal } = useModalStore();
  const { setPrice } = useQuantityPriceStore();

  const handlePriceClick = () => {
    if (getToken()) {
      setPrice(price);
      setShowModal(true);
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  useEffect(() => {
    if (type === "매도" && leftBarRef.current) {
      leftBarRef.current.style.width = "0%";
      setTimeout(() => {
        if (leftBarRef.current) {
          leftBarRef.current.style.width = `${percentage}%`;
        }
      }, 0);
    } else if (type === "매수" && rightBarRef.current) {
      rightBarRef.current.style.width = "0%";
      setTimeout(() => {
        if (rightBarRef.current) {
          rightBarRef.current.style.width = `${percentage}%`;
        }
      }, 0);
    }
  }, [percentage, type]);

  return (
    <div
      className={`orderEntry ${type} ${
        price === currentPrice ? "current" : ""
      }`}
    >
      <span className={`amount ${type === "매도" ? "left" : "right"}`}>
        {quantity}개
      </span>
      {type === "매도" && <div ref={leftBarRef} className="bar leftBar" />}
      <span className="price" onClick={handlePriceClick}>
        {price.toLocaleString()}원
      </span>
      {type === "매수" && <div ref={rightBarRef} className="bar rightBar" />}
    </div>
  );
};

const OrderBook: React.FC<OrderBookProps> = ({ basePrice }) => {
  const [orderBookData, setOrderBookData] = useState<OrderBookEntry[]>([]);
  const { propertyId } = usePropertyStore((state) => state);

  useEffect(() => {
    const initialData = generateOrderBookData(basePrice);
    setOrderBookData(initialData);

    const socket = new WebSocket("wss://app-server.grounding.site/quotes");

    socket.onopen = () => {
      console.log("WebSocket connection established");
      const message = JSON.stringify({
        propertyId: propertyId,
        basePrice: basePrice,
        page: 0,
        size: 10,
        direction: null,
      });
      socket.send(message);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.totalElements === 0) {
          setOrderBookData(initialData);
        } else {
          const updatedData = updateOrderBookData(initialData, data.content);
          setOrderBookData(updatedData);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      if (!event.wasClean) {
        console.error("WebSocket closed unexpectedly");
      }
    };

    return () => {
      socket.close();
      console.log("WebSocket connection closed on cleanup");
    };
  }, [basePrice, propertyId]);

  return (
    <div className="orderBook">
      {orderBookData.map((entry, index) => (
        <OrderEntry key={index} {...entry} currentPrice={basePrice} />
      ))}
    </div>
  );
};

export default OrderBook;
