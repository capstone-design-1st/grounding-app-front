import React from "react";
import "./styles.css";

interface TableRow {
  time: string;
  price: string;
  change: string;
  quantity: string;
}

interface TableProps {
  headers: string[];
  data: TableRow[];
}

const chartTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <table className="infoTable">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.time}</td>
            <td>{row.price}</td>
            <td className="change">{row.change}</td>
            <td>{row.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default chartTable;
