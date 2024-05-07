import React from "react";
import TwoTwoRow from "../../common/TwoTwoRow/TwoTwoRow";
import "./styles.css";

interface AssetIntroProps {
  image: string;
  details: {
    [key: string]: string;
  };
}

const AssetIntro: React.FC<AssetIntroProps> = ({ image, details }) => {
  return (
    <div className="assetIntro">
      <img src={image} alt="대표사진" className="assetImage" />
      <div className="assetDetails">
        <div className="detailsGrid">
          {Object.entries(details).map(([label, value], index) => (
            <TwoTwoRow key={index} label={label} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetIntro;
