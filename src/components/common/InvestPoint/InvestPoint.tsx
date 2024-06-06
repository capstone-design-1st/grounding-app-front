import React from "react";
import IconText from "../IconText/IconText";

interface InvestmentPointDTO {
  title: string;
}

interface InvestPointProps {
  points: InvestmentPointDTO[]; // This specifies that points is an array of InvestmentPointDTO
}

const InvestPoint: React.FC<InvestPointProps> = ({ points }) => {
  const getIcon = (point: string) => {
    if (point.includes("입지") || point.includes("위치")) {
      return "pin";
    } else if (point.includes("배당금")) {
      return "profit";
    } else {
      return "tips";
    }
  };
  return (
    <div>
      {points.map((point, index) => (
        <IconText key={index} icon={getIcon(point.title)} text={point.title} />
      ))}
    </div>
  );
};

export default InvestPoint;
