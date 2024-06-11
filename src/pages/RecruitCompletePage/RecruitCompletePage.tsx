import fundraise from "../../assets/imgs/fundraise.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const RecruitCompletePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5초 카운트다운 초기값 설정
  const { quantity } = location.state as { quantity: number };

  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAmount(true);
    }, 500);
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000); // 1초마다 카운트다운 감소

    const redirectTimer = setTimeout(() => {
      navigate("/home"); // 3초 후에 홈으로 리디렉션
    }, 5000); // 3초 후에 리디렉션

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

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

      <span
        style={{
          color: "var(--main)",
          fontSize: "14px",
          textAlign: "center",
          animation: "slideIn 0.5s ease-out forwards",
        }}
      >
        {countdown}초 후에 홈으로 이동합니다
      </span>
    </div>
  );
};

export default RecruitCompletePage;
