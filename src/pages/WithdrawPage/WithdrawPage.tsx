import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
import "./styles.css";
import { Button, Header } from "../../components";

const WithdrawPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="withdrawPage">
      <Header
        leftContent={
          <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
        }
        centerContent={<strong>출금하기</strong>}
      />

      <div className="content">
        <div className="row">
          <div className="label">실명 계좌</div>
          <div className="value">신한은행 110-123-456789</div>
        </div>
        <div className="row">
          <div className="label">출금 가능</div>
          <div className="value">123,123원</div>
        </div>
        <div className="inputWrapper">
          <label className="label">출금 금액(원)</label>
          <input type="text" />
        </div>
        <div className="row note">
          <div className="label">수수료(부가세 포함)</div>
          <div className="value">1000원</div>
        </div>
        <div className="row note">
          <div className="label">총출금(수수료 포함)</div>
          <div className="value">1000원</div>
        </div>
      </div>
      <Button
        text="출금하기"
        color="#fff"
        background="var(--main)"
        padding="15px 10px"
        onClick={() => {
          console.log("출금하기");
        }}
      />
    </div>
  );
};

export default WithdrawPage;
