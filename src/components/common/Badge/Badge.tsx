import React from "react";
interface BadgeProps {
  background: string;
  color: string;
  width?: string;
  text: string;
}
const Badge: React.FC<BadgeProps> = ({ background, color, width, text }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: background,
          color: color,
          width: width ? width : "fit-content",
          padding: "5px 10px",
          borderRadius: "5px",
          fontSize: "10px",
          fontWeight: 700,
          marginLeft: "5px",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Badge;
