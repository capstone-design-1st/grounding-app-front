import React from "react";
import "./styles.css";
import { table2RowsProps } from "../../../types";

const TwoRow: React.FC<table2RowsProps> = ({ label, value, color, weight }) => (
  <div className="lineItem">
    <div
      className="label"
      style={{
        ...(color && { color }),
        ...(weight && { fontWeight: weight }),
      }}
    >
      {label}
    </div>
    <div className="value">{value}</div>
  </div>
);
export default TwoRow;
