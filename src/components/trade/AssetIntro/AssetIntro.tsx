import React from "react";
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
            <React.Fragment key={index}>
              <div className="detailsLabel">{label}</div>
              <div className="detailsValue">{value}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetIntro;
