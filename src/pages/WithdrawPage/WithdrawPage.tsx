import React from "react";
import { Button, Header, TwoRow } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";

const WithdrawPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
        centerContent={<strong>출금하기</strong>}
      />
      <TwoRow label="실명 계좌" value="신한은행 110-123-456789" color="#000" />
      <TwoRow label="출금 가능" value="123,123원" color="#000" />
      <div>출금 수량</div>
      <input></input>
      <TwoRow label="수수료(부가세 포함)" value="1000원" />
      <TwoRow label="총출금(수수료 포함)" value="1000원" />

      <Button
        text={"출금하기"}
        color="#fff"
        background="var(--main)"
        padding="10px 20px"
        width="280px"
        onClick={() => alert("출금")}
      />
    </div>
  );
};

export default WithdrawPage;
