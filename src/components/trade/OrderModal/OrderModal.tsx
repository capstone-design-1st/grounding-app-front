import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Tab from "../../common/Tab/Tab";
import Button from "../../common/Button/Button";

interface OrderModalProps {
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ onClose }) => {
  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [sellAmount, setSellAmount] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleBuyAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value, 10);
    setBuyAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  const handleSellAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseInt(e.target.value, 10);
    setSellAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  const tabs = [
    {
      label: "매수",
      content: (
        <div className="orderForm">
          <p>
            매수 가능 수량 <span>(수수료 포함)</span> 10,000,000원
          </p>
          <input
            type="number"
            placeholder="단가를 입력해주세요."
            value={buyAmount.toString()}
            onChange={handleBuyAmountChange}
          />
          <input
            type="number"
            value={buyAmount.toString()}
            onChange={handleBuyAmountChange}
            placeholder="수량을 입력해주세요."
          />
          <div className="quickButtons">
            {[10, 20, 50, 100].map((amount) => (
              <button key={amount} onClick={() => setBuyAmount(amount)}>
                +{amount}주
              </button>
            ))}
          </div>
          <div className="buttonWrapper">
            <p>초기화</p>
            <Button
              text="매수하기"
              color="white"
              background={"var(--red)"}
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
            매도 가능 수량 <span>(수수료 포함)</span> 최대 14주
          </p>
          <input
            type="number"
            placeholder="단가를 입력해주세요."
            value={buyAmount.toString()}
            onChange={handleBuyAmountChange}
          />
          <input
            type="number"
            value={sellAmount.toString()}
            onChange={handleSellAmountChange}
            placeholder="수량을 입력해주세요."
          />
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
          <div className="buttonWrapper">
            <p>초기화</p>
            <Button
              text="매도하기"
              color="white"
              background={"var(--blue)"}
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
      <Tab tabs={tabs} width="50%" />
    </div>
  );
};

export default OrderModal;
