import React, { useState } from "react";
import "./styles.css";
import transactions from "../../../data/transaction.json";

const transactionTypes = ["전체", "부동산", "건물"];

const TransactionList = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [activeButton, setActiveButton] = useState("전체");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [dateRange, setDateRange] = useState({
    startDate: new Date("2024-04-10").toISOString().slice(0, 10),
    endDate: new Date("2024-04-18").toISOString().slice(0, 10),
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleButtonClick = (period: string) => {
    setActiveButton(period);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleDateChange = (
    dateType: "startDate" | "endDate",
    value: string
  ) => {
    setDateRange((prev) => ({ ...prev, [dateType]: value }));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchTab = activeTab === "전체" || transaction.type === activeTab;
    const matchFilter =
      selectedFilter === "전체" || transaction.name === selectedFilter;
    // 날짜 필터링 추가예정
    return matchTab && matchFilter;
  });

  return (
    <div className="transactionList">
      <div className="tabs">
        {["전체", "매수", "매도"].map((tab) => (
          <button
            key={tab}
            className={`tab ${tab === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => handleDateChange("startDate", e.target.value)}
          className="dateInput"
        />
        <span>~</span>
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => handleDateChange("endDate", e.target.value)}
          className="dateInput"
        />
      </div>

      <div className="dateButtons">
        {["당일", "1개월", "3개월", "6개월"].map((period) => (
          <button
            key={period}
            className={`dateButton ${period === activeButton ? "active" : ""}`}
            onClick={() => handleButtonClick(period)}
          >
            {period}
          </button>
        ))}
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="filterSelect"
        >
          {transactionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <table className="transactionTable">
        <thead>
          <tr>
            <th>매물명</th>
            <th>거래수량</th>
            <th>거래일자</th>
          </tr>
          <tr>
            <th>매매구분</th>
            <th>거래단가</th>
            <th>거래금액</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{transaction.name}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
              <tr>
                <td>{transaction.type}</td>
                <td>{transaction.price}</td>
                <td>{transaction.total}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
