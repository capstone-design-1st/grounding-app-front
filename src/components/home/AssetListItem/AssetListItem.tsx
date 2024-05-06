import React from "react";
import building from "../../../assets/icons/building.png";
import farm from "../../../assets/icons/farm.png";
import heartIcon from "../.././../assets/icons/fill-heart.svg";
import "./styles.css";

interface AssetListItemProps {
  isMyAsset: boolean;
  isBuilding: boolean;
  assetName: string;
  value: string;
  change: string;
  count?: string;
  unitPrice?: string;
  totalChange?: string;
  heart?: boolean;
  itemNumber?: number;
}

const AssetListItem: React.FC<AssetListItemProps> = ({
  isMyAsset,
  isBuilding,
  assetName,
  value,
  change,
  totalChange,
  count,
  unitPrice,
  heart,
  itemNumber,
}) => {
  let image = isBuilding ? building : farm;

  return (
    <div className={`assetSection ${isMyAsset ? "myAsset" : ""}`}>
      {isMyAsset ? (
        <div className="assetHeader">
          <div className="assetTitle">내 자산</div>
          <div className="overallChange">{totalChange}</div>
          <div className="viewMore">자세히 보기</div>
        </div>
      ) : (
        <div className="assetHeader">
          <div className="assetTitle">내가 찜한 매물</div>
        </div>
      )}

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
          <div className="value">{value}</div>
          {isMyAsset && <div className="change">{change}</div>}
        </div>
        {!isMyAsset && (
          <img className="heartIcon" src={heartIcon} alt="heart" />
        )}
      </div>
    </div>
  );
};

export default AssetListItem;
