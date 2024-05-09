import React, { useState } from "react";
import "./styles.css";
import transactions from "../../../data/transaction.json";

const transactionTypes = ["전체", "부동산", "건물"];

const TransactionList = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [activeButton, setActiveButton] = useState("전체");
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
  });

  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split(".");
    // '24.04.10' -> '2024-04-10'
    return new Date(`20${year}-${month}-${day}`);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleButtonClick = (period: string) => {
    setActiveButton(period);
    setDateRangeForPeriod(period);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const setDateRangeForPeriod = (period: string) => {
    const today = new Date();
    let startDate = new Date();
    switch (period) {
      case "당일":
        // 당일: 오늘 날짜만
        startDate = today;
        break;
      case "1개월":
        // 1개월: 오늘부터 한 달 전
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "3개월":
        // 3개월: 오늘부터 세 달 전
        startDate.setMonth(today.getMonth() - 3);
        break;
      case "6개월":
        // 6개월: 오늘부터 여섯 달 전
        startDate.setMonth(today.getMonth() - 6);
        break;
      default:
        return; // 기본적으로 변경 없음
    }
    setDateRange({
      startDate: startDate.toISOString().slice(0, 10),
      endDate: today.toISOString().slice(0, 10),
    });
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
    const transactionDate = parseDate(transaction.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    const matchDate =
      transactionDate >= startDate && transactionDate <= endDate;

    return matchTab && matchFilter && matchDate;
  });

  return (
    <div className="transactionList">
      <div className="tabs">
        <div className="onlyTabs">
          {["전체", "매수", "매도"].map((tab) => (
            <button
              key={tab}
              className={`tab ${tab === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
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
            className={`dateButton ${activeButton === period ? "active" : ""}`}
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
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Transactions Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
