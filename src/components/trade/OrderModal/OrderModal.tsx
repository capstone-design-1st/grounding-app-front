import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Tab from "../../common/Tab/Tab";
import Button from "../../common/Button/Button";
import {
  getAvailableBuyQuantity,
  getAvailableSellQuantity,
  postBuyProperty,
  postSellProperty,
} from "../../../apis/Trading";
import { fetchProperty } from "../../../apis/PropertyDetails";
import { useMutation, useQuery } from "react-query";
import {
  usePropertyStore,
  useQuantityPriceStore,
} from "../../../store/tradeStore";
import AlertModal from "../../common/AlertModal/AlertModal";
import { getMyWallet } from "../../../apis/Users";
import { Wallet } from "xrpl";
import { sendToken, setTrustLine } from "../../../util/xrpl/token";
import { useXrplClientStore } from "../../../store/xrplStore";

interface OrderModalProps {
  onClose: () => void;
}

interface TradeDetails {
  quantity: number;
  price: number;
}

interface PostBuyPropertyResponse {
  buyer_id: string;
  wallet_address: string;
  property_id: string;
  executed_quantity: number;
  ordered_price: number;
  purchased_sell_quotes_info_list: {
    seller_id: string;
    seller_wallet_address: string;
    executed_quantity: number;
  }[];
}

interface PostSellPropertyResponse {
  seller_id: string;
  wallet_address: string;
  property_id: string;
  executed_quantity: number;
  ordered_price: number;
  sold_buyer_quotes_info_list: {
    buyer_id: string;
    buyer_wallet_address: string;
    executed_quantity: number;
  }[];
}

const OrderModal: React.FC<OrderModalProps> = ({ onClose }) => {
  const { quantity, setQuantity, price, setPrice } = useQuantityPriceStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState<"buy" | "sell">("buy");

  const [activeTab, setActiveTab] = useState("매수");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleMarketPrice = async () => {
    const marketPrice = propertyDetails?.present_price;
    setPrice(marketPrice!);
  };

  const { xrplClient } = useXrplClientStore();
  const { data: myWalletKey } = useQuery("myWallet", () => getMyWallet());
  const { propertyId, uploaderWalletKey } = usePropertyStore();

  const myWallet = myWalletKey ? Wallet.fromSeed(myWalletKey) : null;
  const uploaderWallet = uploaderWalletKey
    ? Wallet.fromSeed(uploaderWalletKey)
    : null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const fetchQuantity = async () => {
    let response;
    if (activeTab === "매수") {
      response = await getAvailableBuyQuantity(propertyId);
    } else {
      response = await getAvailableSellQuantity(propertyId);
    }
    return response.quantity;
  };

  const { data: maxQuantity, refetch } = useQuery(
    ["maxQuantity", activeTab, propertyId],
    fetchQuantity,
    {
      enabled: !!propertyId,
    }
  );

  const { data: propertyDetails } = useQuery(
    ["propertyDetails", propertyId!],
    () => fetchProperty(propertyId!),
    {
      enabled: !!propertyId,
      refetchOnWindowFocus: false,
      onError: (error) =>
        console.error("Error fetching property details:", error),
    }
  );

  const buyMutation = useMutation<PostBuyPropertyResponse, Error, TradeDetails>(
    ({ quantity, price }) => postBuyProperty(propertyId, quantity, price),
    {
      onSuccess: async (variables) => {
        setTransactionAmount(quantity * price);
        setTransactionType("buy");
        setShowSuccessModal(true);

        const sellerLength = variables.purchased_sell_quotes_info_list.length;

        if (sellerLength > 0) {
          for (let i = 0; i < sellerLength; i++) {
            const executedQuantity =
              variables.purchased_sell_quotes_info_list[i].executed_quantity;
            if (!executedQuantity) {
              continue;
            }
            const sellerWalletKey =
              variables.purchased_sell_quotes_info_list[i]
                ?.seller_wallet_address;
            const sellerWallet = Wallet.fromSeed(sellerWalletKey);
            // 판매자 -> 발행자 -> 구매자(myWallet)로 토큰 이동
            await setTrustLine(
              xrplClient,
              myWallet!,
              "GRD",
              uploaderWallet!.classicAddress
            );
            await sendToken(
              xrplClient,
              sellerWallet,
              uploaderWallet!.classicAddress,
              "GRD",
              executedQuantity.toString(),
              uploaderWallet!.classicAddress
            );
            await sendToken(
              xrplClient,
              uploaderWallet!,
              myWallet!.classicAddress,
              "GRD",
              executedQuantity.toString(),
              uploaderWallet!.classicAddress
            );
          }
        }
      },
      onError: (error) => alert(`Error during purchase: ${error.message}`),
    }
  );

  const sellMutation = useMutation<
    PostSellPropertyResponse,
    Error,
    TradeDetails
  >(({ quantity, price }) => postSellProperty(propertyId, quantity, price), {
    onSuccess: async (variables) => {
      setTransactionAmount(quantity * price);
      setTransactionType("sell");
      setShowSuccessModal(true);

      const buyerLength = variables.sold_buyer_quotes_info_list.length;

      if (buyerLength > 0) {
        for (let i = 0; i < buyerLength; i++) {
          const executedQuantity =
            variables.sold_buyer_quotes_info_list[i].executed_quantity;
          if (!executedQuantity) {
            continue;
          }
          const buyerWalletKey =
            variables.sold_buyer_quotes_info_list[i]?.buyer_wallet_address;
          const buyerWallet = Wallet.fromSeed(buyerWalletKey);
          // 판매자(myWallet) -> 발행자 -> 구매자로 토큰 이동
          await setTrustLine(
            xrplClient,
            buyerWallet,
            "GRD",
            uploaderWallet!.classicAddress
          );
          await sendToken(
            xrplClient,
            myWallet!,
            uploaderWallet!.classicAddress,
            "GRD",
            executedQuantity.toString(),
            uploaderWallet!.classicAddress
          );
          await sendToken(
            xrplClient,
            uploaderWallet!,
            buyerWallet.classicAddress,
            "GRD",
            executedQuantity.toString(),
            uploaderWallet!.classicAddress
          );
        }
      }
    },
    onError: (error) => alert(`Error during sale: ${error.message}`),
  });

  const handleBuy = (quantity: number, price: number) => {
    if (quantity <= 0 || price <= 0) {
      alert("수량과 가격을 모두 입력해주세요.");
      return;
    }
    buyMutation.mutate({ quantity, price });
  };

  const handleSell = (quantity: number, price: number) => {
    if (quantity <= 0 || price <= 0) {
      alert("수량과 가격을 모두 입력해주세요.");
      return;
    }
    sellMutation.mutate({ quantity, price });
  };

  const resetValues = () => {
    setQuantity(0);
    setPrice(0);
    refetch();
  };

  const handleTabChange = () => {
    resetValues();
    setActiveTab(activeTab === "매수" ? "매도" : "매도");
  };

  const handleQuantityChange = (increment: number) => {
    const newQuantity = quantity + increment;
    if (newQuantity > maxQuantity) {
      alert(`최대 가능 수량을 초과하였습니다. 최대 가능 수량: ${maxQuantity}`);
    } else {
      setQuantity(newQuantity);
    }
  };

  const tabs = [
    {
      label: "매수",
      content: (
        <div className="orderForm">
          <div className="quickButtons">
            <p>
              매수 가능 수량 <span>(수수료 포함)</span>최대 {maxQuantity}주
            </p>
          </div>
          <div className="inputGroup">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} readOnly />
            <span>주</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="quickButtons">
            {[10, 20, 50, 100].map((amount) => (
              <button key={amount} onClick={() => handleQuantityChange(amount)}>
                +{amount}주
              </button>
            ))}
            <button>최대</button>
          </div>
          <div className="inputGroup">
            <button onClick={() => setPrice(price - 50)}>-</button>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <span>원</span>
            <button onClick={() => setPrice(price + 50)}>+</button>
          </div>
          <div className="quickButtons">
            <button onClick={() => handleMarketPrice()}>시장가</button>
            <button>지정가</button>
          </div>

          <div className="buttonWrapper">
            <p onClick={resetValues}>초기화</p>
            <Button
              text="매수하기"
              color="white"
              background="var(--red)"
              padding="10px 0px"
              width="240px"
              onClick={() => handleBuy(quantity, price)}
            />
          </div>
        </div>
      ),
    },
    {
      label: "매도",
      content: (
        <div className="orderForm">
          <p>
            매도 가능 수량 <span>(수수료 포함)</span> 최대 {maxQuantity}주
          </p>
          <div className="inputGroup">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} readOnly />
            <span>주</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <div className="quickButtons">
            {[1 / 2, 1 / 4, 1 / 5, 1 / 10, 1].map((fraction, index) => (
              <button
                key={index}
                onClick={() => setQuantity(Math.floor(maxQuantity * fraction))}
              >
                {fraction}
              </button>
            ))}
          </div>
          <div className="inputGroup">
            <button onClick={() => setPrice(price - 50)}>-</button>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <span>원</span>
            <button onClick={() => setPrice(price + 50)}>+</button>
          </div>

          <div className="quickButtons">
            <button onClick={() => handleMarketPrice()}>시장가</button>
            <button>지정가</button>
          </div>

          <div className="buttonWrapper">
            <p onClick={resetValues}>초기화</p>
            <Button
              text="매도하기"
              color="white"
              background="var(--blue)"
              padding="10px 0px"
              width="240px"
              onClick={() => handleSell(quantity, price)}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div ref={modalRef} className="modalContainer">
      <Tab
        tabs={tabs}
        width="50%"
        active={activeTab}
        onTabChange={handleTabChange}
      />
      {showSuccessModal && (
        <AlertModal
          amount={transactionAmount}
          type={transactionType}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default OrderModal;
