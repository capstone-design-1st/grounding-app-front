import React from "react";
import "./styles.css";
import { table2RowsProps } from "../../../types";
import TwoRow from "../../common/TwoRow/TwoRow";

interface InvestmentSummaryProps {
  totalAmount: string;
  change: string;
  changePercentage: string;
  items: table2RowsProps[];
}

const InvestmentSummary: React.FC<InvestmentSummaryProps> = ({
  totalAmount,
  change,
  changePercentage,
  items,
}) => {
  return (
    <div className="investmentSummary">
      <div className="investmentHeader">
        <div className="investmentTitle">현재 투자 금액</div>
        <div className="investmentAmount">
          {totalAmount}
          <span>원</span>
        </div>
        <div className="investmentChange">
          {change} ({changePercentage})
        </div>
      </div>
      <div className="assetsList">
        {items.map((asset, index) => (
          <TwoRow key={index} label={asset.label} value={asset.value} />
        ))}
      </div>
    </div>
  );
};

export default InvestmentSummary;
