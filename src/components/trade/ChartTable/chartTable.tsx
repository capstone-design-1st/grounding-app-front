import React from "react";
import "./styles.css";
import {
  ChartTableProps,
  TodayTradingTableRow,
  EachDayTradingTableRow,
} from "../../../types";
import { formatDate } from "../../../util/formatDate";

const ChartTable: React.FC<ChartTableProps> = ({ headers, data, type }) => {
  return (
    <div className="tableWrapper">
      <table className="infoTable">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {type === "today" && data.length > 0 ? (
            (data as TodayTradingTableRow[]).map((row, index) => (
              <tr key={index}>
                <td>{row.executed_at}</td>
                <td>{row.executed_price.toLocaleString()}</td>
                <td className="change">{row.fluctuation_rate}%</td>
                <td>{row.quantity.toLocaleString()}</td>
              </tr>
            ))
          ) : type === "eachDay" && data.length > 0 ? (
            (data as EachDayTradingTableRow[]).map((row, index) => (
              <tr key={index}>
                <td>{formatDate(row.date)}</td>
                <td>{row.opening_price.toLocaleString()}</td>
                <td>{row.closing_price.toLocaleString()}</td>
                <td>{row.max_price.toLocaleString()}</td>
                <td>{row.min_price.toLocaleString()}</td>
                <td>{row.volume_count.toLocaleString()}</td>
                <td className="change">{row.fluctuation_rate}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: "center" }}>
                거래 내역이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
