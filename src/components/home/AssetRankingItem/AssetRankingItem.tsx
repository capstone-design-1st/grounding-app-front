import React from "react";
import building from "../../../assets/icons/building.png";
import farm from "../../../assets/icons/farm.png";
import "./styles.css";
import { formatNumberWithCommas } from "../../../util/formatNumber";

interface AssetRankingItemProps {
  assetType: string;
  rank: number;
  assetName: string;
  value: string;
  changeRatio: number;
  changePrice: number;
}

const AssetRankingItem: React.FC<AssetRankingItemProps> = ({
  assetType,
  rank,
  assetName,
  value,
  changeRatio,
  changePrice,
}) => {
  return (
    <div className="assetRankingItem">
      <div className="rank">{rank}</div>
      <div className="assetInfo">
        {assetType === "building" ? (
          <img className="assetIcon" src={building} alt="building" />
        ) : (
          <img className="assetIcon" src={farm} alt="farm" />
        )}
        <div className="assetName">{assetName}</div>
      </div>
      <div className="assetValue">
        <div className="value">{value}원</div>
        <div className="change">
          {changePrice >= 0 ? (
            <span style={{ color: "var(--red)" }}>
              +{formatNumberWithCommas(changePrice)}원 ({changeRatio.toFixed(2)}
              %)
            </span>
          ) : (
            <span style={{ color: "var(--blue)" }}>
              {formatNumberWithCommas(changePrice)}원 ({changeRatio.toFixed(2)}
              %)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetRankingItem;
