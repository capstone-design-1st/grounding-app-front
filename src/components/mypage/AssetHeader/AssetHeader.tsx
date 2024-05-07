import React from "react";
import "./styles.css";

interface AssetHeaderProps {
  icon: string;
  name: string;
  profit: string;
}

const AssetHeader: React.FC<AssetHeaderProps> = ({ icon, name, profit }) => {
  return (
    <div className="assetHeader">
      <div className="assetLeft">
        <img src={icon} alt="AssetIcon" />
        <div className="name">{name}</div>
      </div>
      <div className="assetRight">
        <div className="profit">{profit}</div>
      </div>
    </div>
  );
};

export default AssetHeader;
