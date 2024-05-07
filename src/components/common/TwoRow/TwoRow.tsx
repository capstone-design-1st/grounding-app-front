import React from "react";
import "./styles.css";
import { table2RowsProps } from "../../../types";

const TwoRow: React.FC<table2RowsProps> = ({
  label,
  value,
  color,
  weight,
  fontSize,
}) => (
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
    <div
      className="value"
      style={{
        ...(fontSize && { fontSize }),
      }}
    >
      {value}
    </div>
  </div>
);
export default TwoRow;
