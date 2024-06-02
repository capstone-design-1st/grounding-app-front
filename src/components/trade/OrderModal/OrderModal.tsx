import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Tab from "../../common/Tab/Tab";
import Button from "../../common/Button/Button";
import {
  getAvailableBuyQuantity,
  getAvailableSellQuantity,
} from "../../../apis/Trading";
import { useQuery } from "react-query";
import usePropertyStore from "../../../store/tradeStore";

interface OrderModalProps {
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ onClose }) => {
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [sellAmount, setSellAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [activeTab, setActiveTab] = useState("매수");
  const modalRef = useRef<HTMLDivElement>(null);

  // const handleMarketPrice = async () => {
  //   const marketPrice = await getMarketPrice();
  //   setPrice(marketPrice); // 시장가를 input 필드에 설정
  // };

  const { propertyId } = usePropertyStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const fetchQuantity = async () => {
    if (activeTab === "매수") {
      return await getAvailableBuyQuantity(propertyId);
    } else {
      return await getAvailableSellQuantity(propertyId);
    }
  };

  const { data: maxQuantity, refetch } = useQuery(
    ["maxQuantity", activeTab],
    fetchQuantity
  );

  const resetValues = () => {
    setQuantity(0);
    setPrice(0);
    refetch();
  };

  const handleTabChange = () => {
    resetValues();
  };

  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity > maxQuantity) {
      alert(`최대 가능 수량을 초과하였습니다. 최대 가능 수량: ${maxQuantity}`);
    } else {
      setQuantity(newQuantity);
    }
  };

  const tabs = [
    {
      label: "매수",
      content: (
        <div className="orderForm">
          <div className="quickButtons">
            <p>
              매수 가능 수량 <span>(수수료 포함)</span>
            </p>
            <div>{maxQuantity}주</div>
          </div>
          <div className="inputGroup">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} readOnly />
            <span>주</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="quickButtons">
            {[10, 20, 50, 100].map((amount) => (
              <button key={amount} onClick={() => handleQuantityChange(amount)}>
                +{amount}주
              </button>
            ))}
            <button>최대</button>
          </div>
          <div className="inputGroup">
            <button onClick={() => setPrice(price - 50)}>-</button>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <span>원</span>
            <button onClick={() => setPrice(price + 50)}>+</button>
          </div>
          <div className="quickButtons">
            <button onClick={() => setBuyAmount(1 / 2)}>시장가</button>
            <button onClick={() => setBuyAmount(1 / 2)}>지정가</button>
          </div>

          <div className="buttonWrapper">
            <p onClick={resetValues}>초기화</p>
            <Button
              text="매수하기"
              color="white"
              background="var(--red)"
              padding="10px 0px"
              width="240px"
              onClick={() => console.log("매수하기")}
            />
          </div>
        </div>
      ),
    },
    {
      label: "매도",
      content: (
        <div className="orderForm">
          <p>
            매도 가능 수량 <span>(수수료 포함)</span> 최대 {maxQuantity}주
          </p>
          <div className="inputGroup">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} readOnly />
            <span>주</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="quickButtons">
            {[1 / 2, 1 / 4, 1 / 5, 1 / 10, 1].map((fraction, index) => (
              <button
                key={index}
                onClick={() => setSellAmount(Math.floor(4 * fraction))}
              >
                {fraction}
              </button>
            ))}
          </div>
          <div className="inputGroup">
            <button onClick={() => setPrice(price - 50)}>-</button>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <span>원</span>
            <button onClick={() => setPrice(price + 50)}>+</button>
          </div>

          <div className="quickButtons">
            <button onClick={() => setBuyAmount(1 / 2)}>시장가</button>
            <button onClick={() => setBuyAmount(1 / 2)}>지정가</button>
          </div>

          <div className="buttonWrapper">
            <p onClick={resetValues}>초기화</p>
            <Button
              text="매도하기"
              color="white"
              background="var(--blue)"
              padding="10px 0px"
              width="240px"
              onClick={() => console.log("매도하기")}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div ref={modalRef} className="modalContainer">
      <Tab
        tabs={tabs}
        width="50%"
        active={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default OrderModal;
