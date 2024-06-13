import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { formatNumberWithCommas } from "../../../util/formatNumber";

interface KeypadProps {
  asset: number;
  presentPrice: number;
  availableShares: number;
  handleBuy: (buyAmount: number) => void;
}

const Keypad: React.FC<KeypadProps> = ({
  asset,
  handleBuy,
  presentPrice,
  availableShares,
}) => {
  const [shares, setShares] = useState(0);
  const [price, setPrice] = useState(0);

  const handleKeyPress = (number: number) => {
    setShares((prev) => parseInt(`${prev}${number}`));
  };

  const handleBackspace = () => {
    setShares((prev) => Math.floor(prev / 10));
  };

  const handleClear = () => {
    setShares(0);
  };

  const calculatePrice = useCallback(
    (shares: number) => {
      setPrice(shares * presentPrice);
    },
    [presentPrice]
  );

  useEffect(() => {
    calculatePrice(shares);
  }, [shares, calculatePrice]);

  useEffect(() => {
    if (asset < price) {
      alert("청약 가능 금액을 초과하였습니다.");
      setShares(Math.floor(asset / presentPrice));
    }
    if (shares > availableShares) {
      alert("청약 가능 주식 수량을 초과하였습니다.");
      setShares(availableShares);
    }
  }, [price, asset, presentPrice, availableShares, shares]);

  return (
    <div className="keypadcontainer">
      <div className="infoSection">
        <div className="available">
          청약할 수 있는 조각이
          <span
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "var(--main)",
            }}
          >
            {" "}
            {formatNumberWithCommas(availableShares)}
          </span>
          주 남았어요
        </div>
        <div className="price">{formatNumberWithCommas(shares)}주</div>
        <div className="shares">{formatNumberWithCommas(price)} 원</div>
        <div
          style={{
            fontSize: "14px",
            color: "#b0b0b0",
            padding: "5px 10px",
            borderRadius: " 20px",
            border: "1px solid #b0b0b0",
          }}
        >
          잔고 {formatNumberWithCommas(asset)} 원
        </div>
      </div>
      <div className="keypadSection">
        <div className="keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <button
              key={number}
              className="key"
              onClick={() => handleKeyPress(number)}
            >
              {number}
            </button>
          ))}
          <button className="key" onClick={handleBackspace}>
            ⌫
          </button>
          <button className="key" onClick={() => handleKeyPress(0)}>
            0
          </button>
          <button className="key" onClick={handleClear}>
            C
          </button>
        </div>
      </div>

      <div className="sidePadding">
        <button className="keyPadButton" onClick={() => handleBuy(shares)}>
          청약하기
        </button>
      </div>
    </div>
  );
};

export default Keypad;
