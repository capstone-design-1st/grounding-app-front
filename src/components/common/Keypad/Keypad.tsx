import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { formatNumberWithCommas } from "../../../util/formatNumber";

interface KeypadProps {
  asset: number;
  presentPrice: number;
  handleBuy: (buyAmount: number) => void;
}
const Keypad: React.FC<KeypadProps> = ({ asset, handleBuy, presentPrice }) => {
  const [price, setPrice] = useState(0);
  const [shares, setShares] = useState(0);

  const handleKeyPress = (number: number) => {
    setPrice((prev) => parseInt(`${prev}${number}`));
  };

  const handleBackspace = () => {
    setPrice((prev) => Math.floor(prev / 10));
  };

  const handleClear = () => {
    setPrice(0);
  };

  const countPossibleShares = useCallback(
    (price: number) => {
      setShares(Math.floor(price / presentPrice));
    },
    [presentPrice]
  );

  useEffect(() => {
    countPossibleShares(1000);
  }, [countPossibleShares]);

  useEffect(() => {
    if (asset < price) {
      alert("청약 가능 금액을 초과하였습니다.");
      setPrice(asset);
    }
    countPossibleShares(price);
  }, [price, asset, countPossibleShares]);

  return (
    <div className="keypadcontainer">
      <div className="infoSection">
        <div className="price">{formatNumberWithCommas(price)} 원</div>
        <div className="shares">{shares}주</div>
        <div className="available">
          {formatNumberWithCommas(asset)}원 청약 가능
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
