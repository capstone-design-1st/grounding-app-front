import React from "react";
import IconText from "../IconText/IconText";

interface InvestPointProps {
  points: string[];
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
      <div>
        {points.map((point) => (
          <IconText icon={getIcon(point)} text={point} />
        ))}
      </div>
    </div>
  );
};

export default InvestPoint;
