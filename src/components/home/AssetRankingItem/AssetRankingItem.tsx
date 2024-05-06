import React from "react";
import building from "../../../assets/icons/building.png";
import farm from "../../../assets/icons/farm.png";
import "./styles.css";

interface AssetRankingItemProps {
  isBuliding: boolean;
  rank: number;
  assetName: string;
  value: string;
  change: string;
}

const AssetRankingItem: React.FC<AssetRankingItemProps> = ({
  isBuliding,
  rank,
  assetName,
  value,
  change,
}) => {
  return (
    <div className="assetRankingItem">
      <div className="rank">{rank}</div>
      <div className="assetInfo">
        {isBuliding ? (
          <img className="assetIcon" src={building} alt="building" />
        ) : (
          <img className="assetIcon" src={farm} alt="farm" />
        )}
        <div className="assetName">{assetName}</div>
      </div>
      <div className="assetValue">
        <div className="value">{value}</div>
        <div className="change">{change}</div>
      </div>
    </div>
  );
};

export default AssetRankingItem;
