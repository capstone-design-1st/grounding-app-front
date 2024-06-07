import React, { useEffect } from "react";
import "./styles.css";
import checkIcon from "../../../assets/imgs/check-circle.png";

interface AlertModalProps {
  amount: number;
  type: "buy" | "sell";
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ amount, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="successModalOverlay">
      <div className="successModal">
        <div className="successMessage">
          {type === "buy" ? (
            <p>매수 주문이 완료되었어요</p>
          ) : (
            <p>매도 주문이 완료되었어요</p>
          )}
          <img src={checkIcon} alt="check" />
        </div>
        <div className="amount">
          <div>{type === "buy" ? "매수 금액" : "매각 금액"}</div>
          <p>{amount}원</p>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
