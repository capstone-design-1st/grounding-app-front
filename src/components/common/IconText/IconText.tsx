import React from "react";
import "./styles.css";
import pin from "../../../assets/icons/pin.svg";
import profit from "../../../assets/icons/profit.svg";
import tips from "../../../assets/icons/tips.svg";

interface IconTextProps {
  icon: "pin" | "profit" | "tips";
  text: string;
}

const IconText: React.FC<IconTextProps> = ({ icon, text }) => {
  const iconMap = {
    pin,
    profit,
    tips,
  };

  return (
    <div className="iconText">
      <img src={iconMap[icon]} alt={text} className="icon" />
      <span>{text}</span>
    </div>
  );
};

export default IconText;
