import React from "react";
import "./styles.css";
import { TodayTradingTableRow, EachDayTradingTableRow } from "../../../types";

interface TableProps {
  headers: string[];
  data: TodayTradingTableRow[] | EachDayTradingTableRow[];
  type: "today" | "eachDay";
}

const ChartTable: React.FC<TableProps> = ({ headers, data, type }) => {
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
          {type === "today" &&
            (data as TodayTradingTableRow[]).map((row, index) => (
              <tr key={index}>
                <td>{row.executed_at}</td>
                <td>{row.executed_price.toLocaleString()}</td>
                <td className="change">{row.fluctuation_rate}%</td>
                <td>{row.quantity.toLocaleString()}</td>
              </tr>
            ))}
          {type === "eachDay" &&
            (data as EachDayTradingTableRow[]).map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.opening_price.toLocaleString()}</td>
                <td>{row.closing_price.toLocaleString()}</td>
                <td>{row.max_price.toLocaleString()}</td>
                <td>{row.min_price.toLocaleString()}</td>
                <td>{row.volume_count.toLocaleString()}</td>
                <td className="change">{row.fluctuation_rate}%</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
