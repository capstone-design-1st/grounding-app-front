import React from "react";
import { Button, Header, TwoRow } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";

const DepositPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
        centerContent={<strong>입금하기</strong>}
      />
      <TwoRow label="실명 계좌" value="신한은행 110-123-456789" />
      <div>입금 금액</div>
      <input></input>
      <div>입금시 유의사항</div>
      <ul>
        <li>
          입금 실행시, 연계된 실명확인 계좌에서 신청한 금액만큼 자동 이체됩니다.
        </li>
        <li></li>
        입금가능금액은 연계된 실명확인 계좌의 출금가능금액과 동일하며, 연계
        계좌의 이체한도 범위 등을 벗어나는 경우 입금이 정상적으로 진행되지 않을
        수도 있습니다.
      </ul>
      <Button
        text={"입금하기"}
        color="#fff"
        background="var(--main)"
        padding="10px 20px"
        width="280px"
        onClick={() => alert("입금")}
      />
    </div>
  );
};

export default DepositPage;
