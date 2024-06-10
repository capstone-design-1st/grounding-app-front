import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Header,
  InvestmentSummary,
  Navbar,
  Tab,
  TransactionItem,
  TransactionList,
  TwoRow,
  MyAssetListItem,
} from "../../components";
import {
  getMyAccountInventory,
  getMyInvestment,
  getTransactions,
  getAccountTransactions,
} from "../../apis/Mypage";
import { transactionQueryKey } from "../../types";
import { formatDateAndTime } from "../../util/formatDateAndTime";
import "./styles.css";
import spinner from "../../assets/imgs/spinner.gif";
import arrow from "../../assets/icons/arrow.svg";
import deposit from "../../assets/icons/deposit.svg";
import useAssetStore from "../../store/myAssetStore";
import { useEffect } from "react";

const MyPage = () => {
  const navigate = useNavigate();

  const page = 0;
  const size = 15;
  const startDate = "2020-01-01";
  const endDate = "2100-12-31";
  const type = "";

  const accountQueryKey = [
    "transactions",
    { page, size, startDate, endDate, type },
  ];

  const { data: accountTransactions } = useQuery(
    accountQueryKey,
    () => getAccountTransactions({ page, size, startDate, endDate, type }),
    {
      keepPreviousData: true,
    }
  );

  //자산 현황 조회
  const { data: myInvestment } = useQuery("myInvestment", () =>
    getMyInvestment()
  );

  const { updateCashBalance } = useAssetStore();

  useEffect(() => {
    if (myInvestment && myInvestment.deposit !== undefined) {
      updateCashBalance(myInvestment.deposit);
    }
  }, [myInvestment, updateCashBalance]);

  //보유 자산 조회
  const { data: assetList } = useQuery("assetHome", () =>
    getMyAccountInventory()
  );

  //거래 내역 조회
  const queryKey: transactionQueryKey = [
    "transactions",
    {
      page: 0,
      size: 10,
      startDate: "2020-01-01",
      endDate: "2100-12-31",
    },
  ];

  const { data: transactions } = useQuery(queryKey, getTransactions);

  if (!myInvestment) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              width: "100px",
              height: "100px",
            }}
            src={spinner}
            alt="loading"
          />
        </div>
      </div>
    );
  }

  if (!transactions) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={spinner} alt="loading" />
      </div>
    );
  }

  const items = [
    { label: "매입금액", value: `${myInvestment.total_buying_price}` },
    { label: "청약 중금액", value: `${myInvestment.fundraising_price}` },
    { label: "예수금", value: `${myInvestment.deposit}` },
    { label: "투자 가능금액", value: `${myInvestment.deposit}` },
    { label: "출금 가능금액", value: `${myInvestment.deposit}` },
    { label: "평가금액", value: `${myInvestment.evaluation_price}` },
    { label: "평가손익", value: `${myInvestment.evaluation_earning}` },
  ];

  const tabs = [
    {
      label: "자산 현황",
      content: (
        <div>
          <InvestmentSummary
            totalAmount={`${myInvestment.evaluation_price}`}
            change={`${myInvestment.evaluation_earning}원`}
            changePercentage={`${myInvestment.average_earning_rate}%`}
            items={items}
          />
          <div className="tradeWrap">
            <div className="info title">보유한 자산</div>
          </div>
          {assetList.length !== 0 ? (
            assetList.map((asset: any) => <MyAssetListItem {...asset} />)
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <div>보유하고 있는 자산이 없습니다.</div>
            </div>
          )}
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
              value={`${myInvestment.evaluation_price}원`}
              weight="500"
              color="#000"
              fontSize="16px"
            />
            <TwoRow label="출금가능" value={`${myInvestment.deposit}원`} />
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
            {accountTransactions?.content.length !== 0 ? (
              accountTransactions.content.map((transaction: any) => (
                <TransactionItem
                  key={transaction.id}
                  type={transaction.type}
                  amount={transaction.amount}
                  date={formatDateAndTime(transaction.created_at)}
                />
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                <div>입출금 내역이 없습니다.</div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      label: "거래 내역",
      content: (
        <div>
          {transactions?.content.length !== 0 ? (
            <TransactionList transactions={transactions.content} />
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <div>거래 내역이 없습니다.</div>
            </div>
          )}
        </div>
      ),
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
