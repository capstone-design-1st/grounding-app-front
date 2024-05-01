import React from "react";
import "./styles.css";
import building from "../../../assets/icons/building.png";

type SalesListItemProps = {
  location: string;
  name: string;
  info: string;
  profit: number;
  onClick: () => void;
};

const SalesListItem: React.FC<SalesListItemProps> = ({
  location,
  name,
  info,
  profit,
  onClick,
}) => {
  return (
    <div className="SalesListItem" onClick={onClick}>
      <div className="col icon">
        <img src={building} alt="building" />
      </div>
      <div className="col">
        <div className="row location">{location}</div>
        <div className="row name">{name}</div>
        <div className="row info">{info}</div>
      </div>
      <div className="col">
        <div className="profit_badge">
          {profit > 0 ? (
            <div className="positive">+{profit}%</div>
          ) : (
            <div className="negative">{profit}%</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesListItem;
