import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
import "./styles.css";
import { Button, Header } from "../../components";
import { useMutation } from "react-query";
import { postWithdraw } from "../../apis/Mypage";

const WithdrawPage: React.FC = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(0);

  const depositMutation = useMutation(postWithdraw, {
    onSuccess: () => {
      alert("출금이 성공적으로 처리되었습니다.");
    },
    onError: (error: any) => {
      alert(`출금 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  const handleDeposit = () => {
    depositMutation.mutate({ withdrawal_amount: amount + 1000 });
  };

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
        }
        centerContent={<strong>출금하기</strong>}
      />
      <div className="withdrawPage">
        <div className="content">
          <div className="row">
            <div className="label">실명 계좌</div>
            <div className="value">하나은행 1001001*****</div>
          </div>
          <div className="inputWrapper">
            <label className="label">출금 금액(원)</label>
            <input
              type="text"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="row note">
            <div className="label">수수료(부가세 포함)</div>
            <div className="value">1000원</div>
          </div>
          <div className="row note">
            <div className="label">총출금(수수료 포함)</div>
            <div className="value">{amount + 1000}원</div>
          </div>
        </div>
      </div>
      <div className="buttonWrapper">
        <Button
          text="출금하기"
          color="#fff"
          background="var(--main)"
          padding="15px 10px"
          onClick={handleDeposit}
        />
      </div>
    </div>
  );
};

export default WithdrawPage;
