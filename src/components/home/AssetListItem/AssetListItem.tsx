import React from "react";
import building from "../../../assets/icons/building.png";
import farm from "../../../assets/icons/farm.png";
import heartIcon from "../.././../assets/icons/fill-heart.svg";
import "./styles.css";

interface AssetListItemProps {
  isMyAsset: boolean;
  assetType: string;
  assetName: string;
  value: number;
  changeRatio: number;
  changePrice: number;
  count?: number;
  unitPrice?: number;
  totalChange?: number;
}

const AssetListItem: React.FC<AssetListItemProps> = ({
  isMyAsset,
  assetType,
  assetName,
  value,
  changeRatio,
  changePrice,
  count,
  unitPrice,
}) => {
  let image = assetType === "building" ? building : farm;

  return (
    <div className={`assetSection ${isMyAsset ? "myAsset" : ""}`}>
      <div className="assetItem">
        <div className="assetInfo">
          <img className="assetIcon" src={image} alt={assetName} />
          <div>
            <div className="assetName">{assetName}</div>
            {isMyAsset && (
              <div className="assetDetails">
                {count}주 · {unitPrice}원
              </div>
            )}
          </div>
        </div>
        <div className="assetValue">
          <div className="value">{value}원</div>
          {isMyAsset && (
            <div className="change">
              {changeRatio > 0 ? (
                <span style={{ color: "var(--red)" }}>
                  +{changePrice.toLocaleString()}원({changeRatio.toFixed(2)}%)
                </span>
              ) : (
                <span style={{ color: "var(--blue)" }}>
                  {changePrice.toLocaleString()}원({changeRatio.toFixed(2)}%)
                </span>
              )}
            </div>
          )}
        </div>
        {!isMyAsset && (
          <img className="heartIcon" src={heartIcon} alt="heart" />
        )}
      </div>
    </div>
  );
};

export default AssetListItem;
