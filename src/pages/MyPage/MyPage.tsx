import {
  Header,
  InvestmentSummary,
  Navbar,
  Tab,
  TransactionItem,
  TwoRow,
} from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import deposit from "../../assets/icons/deposit.svg";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import MyAssetListItem from "../../components/mypage/MyAssetListItem/MyAssetListItem";

const MyPage = () => {
  const navigate = useNavigate();
  const items = [
    { label: "매입금액", value: "8,000,000원" },
    { label: "청약 중금액", value: "8,000,000원" },
    { label: "예수금", value: "8,000,000원" },
    { label: "투자 가능금액", value: "8,000,000원" },
    { label: "출금 가능금액", value: "8,000,000원" },
    { label: "평가금액", value: "8,000,000원" },
    { label: "평가손익", value: "8,000,000원" },
  ];

  const tabs = [
    {
      label: "자산 현황",
      content: (
        <div>
          <InvestmentSummary
            totalAmount="8,234,123"
            change="+124,210"
            changePercentage="+10.34%"
            items={items}
          />
          <div className="tradeWrap">
            <div className="info title">보유한 자산</div>
          </div>
          <MyAssetListItem />
          <MyAssetListItem />
          <MyAssetListItem />
        </div>
      ),
    },
    {
      label: "입출금",
      content: (
        <div>
          <div className="summarySection">
            <TwoRow
              label="총 보유 자산"
              value="123,123원"
              weight="500"
              color="#000"
              fontSize="16px"
            />
            <TwoRow label="출금가능" value="123,123원" />
          </div>

          <div className="summarySection buttonWrapper">
            <button
              className="deposit"
              onClick={() => navigate("/mypage/deposit")}
            >
              <img src={deposit} alt="Deposit Icon" />
              입금하기
            </button>
            <button
              className="withDraw"
              onClick={() => navigate("/mypage/withdraw")}
            >
              <img src={deposit} alt="Deposit Icon" />
              출금하기
            </button>
          </div>

          <div className="wrap">
            <TransactionItem
              type="입금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="출금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="입금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="입금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="출금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="입금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="입금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
            <TransactionItem
              type="출금"
              amount="600,000"
              date="2024.01.03 15:34"
            />
          </div>
        </div>
      ),
    },
    {
      label: "거래 내역",
      content: <div></div>,
    },
  ];
  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
      />
      <div className="myPageTitle">
        <strong>안정민</strong>님의 <br />
        투자현황입니다
      </div>

      <Tab tabs={tabs} />

      <Navbar selected="mypage" />
    </div>
  );
};

export default MyPage;
