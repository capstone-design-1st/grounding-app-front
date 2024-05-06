import { Header, Tab, ChartTable } from "../../components";
import arrow from "../../assets/icons/arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

const QuotePage = () => {
  const nowHeaders = ["날짜", "기준가", "가중평균가", "등락률"];
  const dayHeaders = ["체결 시각", "체결 가격", "등락률", "체결 수량"];
  const data = [
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
    { time: "11:24", price: "4,800", change: "2.50%", quantity: "30" },
  ];

  const tableData = [
    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },
    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },

    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },
    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },
    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },
    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },
    {
      time: "24.04.12",
      price: "4,800",
      change: "4,920",
      quantity: "2.50%",
    },
  ];

  const tabs = [
    {
      label: "일별 시세",
      content: (
        <div>
          <ChartTable headers={nowHeaders} data={data} />
        </div>
      ),
    },
    {
      label: "당일 시세",
      content: (
        <div>
          <ChartTable headers={dayHeaders} data={tableData} />
        </div>
      ),
    },
  ];

  const navigate = useNavigate();
  const { name } = useParams();

  return (
    <div>
      <Header
        leftContent={
          <img src={arrow} alt="Arrow Icon" onClick={() => navigate(-1)} />
        }
        centerContent={<div className="tradeHeader">{name}</div>}
        rightContent={
          <div className="tradeHeader">
            <p>4,705원 +2.7%</p>
          </div>
        }
      />
      <Tab tabs={tabs} width="50%" padding="10px" />
    </div>
  );
};

export default QuotePage;
