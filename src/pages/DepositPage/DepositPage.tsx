import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/icons/arrow.svg";
import "./styles.css";
import { Button, Header } from "../../components";
import { useMutation } from "react-query";
import { postDeposit } from "../../apis/Mypage";

const DepositPage: React.FC = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(0);

  const depositMutation = useMutation(postDeposit, {
    onSuccess: () => {
      alert("입금이 성공적으로 처리되었습니다.");
    },
    onError: (error: any) => {
      alert(`입금 중 오류가 발생했습니다: ${error.message}`);
    },
  });

  const handleDeposit = () => {
    depositMutation.mutate({ deposit_amount: amount });
  };

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
        }
        centerContent={<strong>입금하기</strong>}
      />
      <div className="depositPage">
        <div className="content">
          <div className="row">
            <div className="label">실명 계좌</div>
            <div className="value">하나은행 1001001*****</div>
          </div>
          <div className="row">
            <div className="label">입금 금액(원)</div>
          </div>
          <input
            type="text"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="noteTitle">입금 시 유의사항</div>
          <ul className="notes">
            <li>
              입금 실행시, 연계된 실명확인 계좌에서 신청한 금액만큼 자동
              이체됩니다.
            </li>
            <li>
              입금가능금액은 연계된 실명확인 계좌의 출금가능금액과 동일하며,
              연계 계좌의 이체한도 범위 등을 벗어나는 경우 입금이 정상적으로
              진행되지 않을 수도 있습니다.
            </li>
          </ul>
        </div>
      </div>
      <div className="buttonWrapper">
        <Button
          text="입금하기"
          color="#fff"
          background="var(--main)"
          padding="15px 10px"
          onClick={handleDeposit}
        />
      </div>
    </div>
  );
};

export default DepositPage;
