import React from "react";
import "./styles.css";
import { table2RowsProps } from "../../../types";

const TwoTwoRow: React.FC<table2RowsProps> = ({
  label,
  value,
  color,
  weight,
}) => {
  return (
    <React.Fragment>
      <div
        className="detailsLabel"
        style={{
          ...(color && { color }),
          ...(weight && { fontWeight: weight }),
        }}
      >
        {label}
      </div>
      <div className="detailsValue">{value}</div>
    </React.Fragment>
  );
};

export default TwoTwoRow;
