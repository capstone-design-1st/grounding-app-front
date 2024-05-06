import React from "react";
import "./styles.css";

interface AssetTableProps {
  data: {
    [key: string]: string;
  };
}

const AssetTable: React.FC<AssetTableProps> = ({ data }) => {
  return (
    <div className="assetTable">
      {Object.entries(data).map(([label, value], index) => (
        <React.Fragment key={index}>
          <div className="assetTableLabel">{label}</div>
          <div className="assetTableValue">{value}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AssetTable;
