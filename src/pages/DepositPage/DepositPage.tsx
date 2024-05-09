import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
import "./styles.css";
import { Button, Header } from "../../components";

const DepositPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="depositPage">
      <Header
        leftContent={
          <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
        }
        centerContent={<strong>입금하기</strong>}
      />

      <div className="content">
        <div className="row">
          <div className="label">실명 계좌</div>
          <div className="value">하나은행 1001001*****</div>
        </div>
        <div className="row">
          <div className="label">입금 금액(원)</div>
        </div>
        <input type="text" />
        <div className="noteTitle">입금 시 유의사항</div>
        <ul className="notes">
          <li>
            입금 실행시, 연계된 실명확인 계좌에서 신청한 금액만큼 자동
            이체됩니다.
          </li>
          <li>
            입금가능금액은 연계된 실명확인 계좌의 출금가능금액과 동일하며, 연계
            계좌의 이체한도 범위 등을 벗어나는 경우 입금이 정상적으로 진행되지
            않을 수도 있습니다.
          </li>
        </ul>
      </div>
      <Button
        text="입금하기"
        color="#fff"
        background="var(--main)"
        padding="15px 10px"
        onClick={() => {
          console.log("입금하기");
        }}
      />
    </div>
  );
};

export default DepositPage;
