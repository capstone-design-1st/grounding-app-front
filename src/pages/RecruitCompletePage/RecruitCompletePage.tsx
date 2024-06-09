import fundraise from "../../assets/imgs/fundraise.png";
import { useLocation } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import useAssetStore from "../../store/myAssetStore";

const RecruitCompletePage = () => {
  const location = useLocation();
  const { quantity } = location.state as { quantity: number };

  const [showAmount, setShowAmount] = useState(false);
  //store에서 계좌 잔액 불러오기
  const { cashBalance } = useAssetStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAmount(true);
    }, 500); // 1초 후에 금액 정보를 표시

    return () => clearTimeout(timer);
  }, []);

  const pastelColors = [
    "#1FCBD5",
    "#FF9AA2",
    "#FFB347",
    "#FFFF99",
    "#77DD77",
    "#AEC6CF",
  ];

  return (
    <div className="recruitCompletePage">
      <div className="title">청약 완료!</div>
      <ConfettiExplosion force={0.7} duration={3000} colors={pastelColors} />
      <img src={fundraise} alt="fundraise" />
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid var(--grey3)",
          color: "var(--grey4)",
          fontSize: "14px",
          padding: "5px 10px",
          boxSizing: "border-box",
          borderRadius: "15px",
          animation: "slideIn 0.5s ease-out forwards",
        }}
      >
        <div>내 지갑 잔액</div>
        <div>{cashBalance}원</div>
      </div>

      <div className={`amount ${showAmount ? "show" : ""}`}>
        <div className="row">
          <div className="boldText">청약 금액</div>
          <div>{quantity * 5000}원</div>
        </div>
        <div className="row">
          <div className="boldText">청약 수</div>
          <div>{quantity}주</div>
        </div>
      </div>
    </div>
  );
};

export default RecruitCompletePage;
