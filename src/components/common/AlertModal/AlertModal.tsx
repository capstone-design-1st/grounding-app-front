import React, { useEffect } from "react";
import "./styles.css";
import checkIcon from "../../../assets/imgs/check-circle.png";

interface AlertModalProps {
  amount: number;
  type: "buy" | "sell" | "withdraw" | "deposit";
  onClose: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ amount, onClose, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getAmountLabel = () => {
    switch (type) {
      case "buy":
        return "매수 금액";
      case "sell":
        return "매도 금액";
      case "withdraw":
        return "출금 금액";
      case "deposit":
        return "입금 금액";
      default:
        return "";
    }
  };

  const getMessage = () => {
    switch (type) {
      case "buy":
        return "매수 주문이 완료되었어요";
      case "sell":
        return "매도 주문이 완료되었어요";
      case "withdraw":
        return "출금이 완료되었어요";
      case "deposit":
        return "입금이 완료되었어요";
      default:
        return "";
    }
  };

  return (
    <div className="successModalOverlay">
      <div className="successModal">
        <div className="successMessage">
          {<p>{getMessage()}</p>}

          <img src={checkIcon} alt="check" />
        </div>
        <div className="amount">
          <div>{getAmountLabel()}</div>
          <p>{amount}원</p>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
