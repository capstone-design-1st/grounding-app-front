import React from "react";
import "./styles.css";

interface TwoRowProps {
  label: string;
  value: string;
}

const TwoRow: React.FC<TwoRowProps> = ({ label, value }) => (
  <div className="lineItem">
    <div className="label">{label}</div>
    <div className="value">{value}</div>
  </div>
);
export default TwoRow;
