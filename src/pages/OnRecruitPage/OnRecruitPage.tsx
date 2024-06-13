import { Header, Keypad } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAssetStore from "../../store/myAssetStore";
import { getMyInvestment } from "../../apis/Mypage";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { fundraiseProperty } from "../../apis/fundraise";
import "./styles.css";
import { getMyWallet } from "../../apis/Users";
import { useXrplClientStore } from "../../store/xrplStore";
import { Wallet } from "xrpl";
import { sendToken, setTrustLine } from "../../util/xrpl/token";
import { fetchProperty } from "../../apis/PropertyDetails";
import spinner from "../../assets/imgs/spinner.gif";

const OnRecruitPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { xrplClient } = useXrplClientStore();

  const { name, uploaderWalletKey } = location.state || {};
  //계좌 잔액
  const { cashBalance, updateCashBalance } = useAssetStore();
  const { id: propertyId } = useParams<{ id: string }>();
  //현재가, 모집 가능한 조각 수
  const { data: propertyDetails, isLoading } = useQuery("propertyDetails", () =>
    fetchProperty(propertyId!)
  );
  const presentPrice = propertyDetails?.present_price;
  const [availableShares, setAvailableShares] = useState<number>(0);
  //security_count - (progress_amount / issue_price)

  // 내 지갑 정보 조회
  const { data: myWalletKey } = useQuery("myWallet", () => getMyWallet());

  //자산 현황 조회
  const { data: myInvestment } = useQuery("myInvestment", () =>
    getMyInvestment()
  );

  // 지갑 객체 가져오기
  const myWallet = myWalletKey ? Wallet.fromSeed(myWalletKey) : null;
  const uploaderWallet = uploaderWalletKey
    ? Wallet.fromSeed(uploaderWalletKey)
    : null;

  useEffect(() => {
    if (myInvestment && myInvestment.deposit !== undefined) {
      updateCashBalance(myInvestment.deposit);
    }
  }, [myInvestment, updateCashBalance]);

  const mutation = useMutation(
    (data: { propertyId: string; quantity: number }) =>
      fundraiseProperty(data.propertyId, { quantity: data.quantity }),
    {
      onSuccess: async (variables) => {
        try {
          navigate("/recruit-complete", {
            state: {
              quantity: variables.quantity,
              propertyId: variables.property_id,
            },
          });

          // Ensure wallets are available
          if (!myWallet || !uploaderWallet) {
            throw new Error("Wallets are not initialized");
          }

          // uploaderWallet에서 myWallet로 토큰 이동
          await setTrustLine(
            xrplClient,
            myWallet,
            "GRD",
            uploaderWallet.classicAddress
          );
          await sendToken(
            xrplClient,
            uploaderWallet,
            myWallet.classicAddress,
            "GRD",
            variables.quantity.toString(),
            uploaderWallet.classicAddress
          );
        } catch (error) {
          alert("청약 중 오류가 발생했습니다.");
          console.error("Error on success:", error);
        }
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

  useEffect(() => {
    if (propertyDetails) {
      const shares =
        propertyDetails.fundraise_dto.security_count -
        propertyDetails.fundraise_dto.progress_amount /
          propertyDetails.fundraise_dto.issue_price;

      setAvailableShares(shares);
    }
  }, [propertyDetails]);

  if (isLoading) {
    return (
      <div>
        <img src={spinner} alt="Loading..." />
      </div>
    );
  }

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

      <Keypad
        asset={cashBalance}
        handleBuy={handleBuy}
        presentPrice={presentPrice!}
        availableShares={availableShares}
      />
    </div>
  );
};

export default OnRecruitPage;
