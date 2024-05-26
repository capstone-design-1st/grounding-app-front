import React, { useState } from "react";

type ButtonProps = {
  text: string;
  color: string;
  background: string;
  padding: string;
  width?: string;
  border?: string;
  boxShadow?: string;
  fontSize?: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  background,
  padding,
  onClick,
  border,
  boxShadow,
  width,
  fontSize,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  return (
    <div>
      <div
        style={{
          width: width,
          textAlign: "center",
          borderRadius: "10px",
          color: color,
          border: border,
          boxShadow: boxShadow,
          backgroundColor: background,
          padding: padding,
          fontWeight: 600,
          fontSize: fontSize,
          boxSizing: "border-box",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          transform: isActive ? "scale(0.97)" : "scale(1)",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default Button;
