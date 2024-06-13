import { Header, Tab, ChartTable } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { useQuery, QueryFunctionContext } from "react-query";
import { getTodayTrading, getEachDayTrading } from "../../apis/Trading";
import { formatNumberWithCommas } from "../../util/formatNumber";
import { EachDayTradingTableRow, TodayTradingTableRow } from "../../types";

const fetchTodayTrading = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null, number, number]>) => {
  const [, propertyId, page, size] = queryKey;
  if (!propertyId) throw new Error("Property ID is required");
  return await getTodayTrading(propertyId, page, size);
};

const fetchEachDayTrading = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null, number, number]>) => {
  const [, propertyId, page, size] = queryKey;
  if (!propertyId) throw new Error("Property ID is required");
  return await getEachDayTrading(propertyId, page, size);
};

const QuotePage = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const location = useLocation();
  const { state } = location;
  const { priceDifference, presentPrice, propertyId, fluctuationRate } =
    state || {};

  const { data: todayTradingData } = useQuery(
    ["todayTrading", propertyId, 0, 20],
    fetchTodayTrading,
    {
      enabled: !!propertyId,
      refetchInterval: 20000,
      onError: (error) =>
        console.error("Error fetching today's trading data:", error),
    }
  );

  const { data: eachDayTradingData } = useQuery(
    ["eachDayTrading", propertyId, 0, 20],
    fetchEachDayTrading,
    {
      enabled: !!propertyId,
      refetchInterval: 20000,
      onError: (error) =>
        console.error("Error fetching each day's trading data:", error),
    }
  );

  const nowHeaders = ["체결 시각", "체결 가격", "등락률", "체결 수량"];
  const dayHeaders = [
    "날짜",
    "시가",
    "종가",
    "당일 최고가",
    "당일 최저가",
    "거래량",
    "등락률",
  ];

  const todayData =
    todayTradingData?.content.map((trade: TodayTradingTableRow) => ({
      executed_at: trade.executed_at,
      executed_price: trade.executed_price,
      fluctuation_rate: trade.fluctuation_rate,
      quantity: trade.quantity,
    })) || [];

  const eachdayData =
    eachDayTradingData?.content.map((trade: EachDayTradingTableRow) => ({
      date: trade.date,
      closing_price: trade.closing_price,
      fluctuation_rate: trade.fluctuation_rate,
      max_price: trade.max_price,
      min_price: trade.min_price,
      opening_price: trade.opening_price,
      volume_count: trade.volume_count,
    })) || [];

  const tabs = [
    {
      label: "당일 시세",
      content: (
        <div>
          <ChartTable headers={nowHeaders} data={todayData} type={"today"} />
        </div>
      ),
    },
    {
      label: "일별 시세",
      content: (
        <div>
          <ChartTable
            headers={dayHeaders}
            data={eachdayData}
            type={"eachDay"}
          />{" "}
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
        centerContent={<div className="tradeHeader">{name}</div>}
        rightContent={
          <div className="tradeHeader">
            <p>
              {formatNumberWithCommas(presentPrice)}원{" "}
              {priceDifference > 0 ? (
                <span style={{ color: "var(--red)" }}>
                  ▲{formatNumberWithCommas(priceDifference)}원 (
                  {priceDifference}%)
                </span>
              ) : priceDifference < 0 ? (
                <span style={{ color: "var(--blue)" }}>
                  ▼{formatNumberWithCommas(priceDifference)}원 (
                  {fluctuationRate.toFixed(2)}%)
                </span>
              ) : (
                <span style={{ color: "#000" }}>
                  {formatNumberWithCommas(priceDifference)}원 (
                  {fluctuationRate.toFixed(2)}
                  %)
                </span>
              )}
            </p>
          </div>
        }
      />
      <div
        style={{
          paddingTop: "20px",
        }}
      ></div>
      <Tab tabs={tabs} width="50%" padding="10px" />
    </div>
  );
};

export default QuotePage;
