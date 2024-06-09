import { Header, Keypad } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAssetStore from "../../store/myAssetStore";
import { getMyInvestment } from "../../apis/Mypage";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { fundraiseProperty } from "../../apis/fundraise";
import "./styles.css";
const OnRecruitPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { name } = location.state || {};

  const { cashBalance, updateCashBalance } = useAssetStore();
  const { id: propertyId } = useParams<{ id: string }>();

  //자산 현황 조회
  const { data: myInvestment } = useQuery("myInvestment", () =>
    getMyInvestment()
  );

  useEffect(() => {
    if (myInvestment && myInvestment.deposit !== undefined) {
      updateCashBalance(myInvestment.deposit);
    }
  }, [myInvestment]);

  const mutation = useMutation(
    (data: { propertyId: string; quantity: number }) =>
      fundraiseProperty(data.propertyId, { quantity: data.quantity }),
    {
      onSuccess: (variables) => {
        navigate("/recruit-complete", {
          state: { quantity: variables.quantity },
        });
      },
      onError: (error: any) => {
        alert("매수 중 오류가 발생했습니다");
      },
    }
  );

  const handleBuy = (buyAmount: number) => {
    if (buyAmount > cashBalance) {
      alert("예수금이 부족합니다.");
      return;
    }
    if (propertyId) {
      mutation.mutate({ propertyId, quantity: buyAmount });
    }
  };

  return (
    <div className="onRecruitContainer">
      <Header
        leftContent={
          <img src={arrow} alt="back" onClick={() => navigate(-1)} />
        }
        centerContent={
          <strong
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {name}
          </strong>
        }
      />

      <Keypad asset={cashBalance} handleBuy={handleBuy} />
    </div>
  );
};

export default OnRecruitPage;
