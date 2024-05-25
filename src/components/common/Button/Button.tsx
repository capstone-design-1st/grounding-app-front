import React from "react";

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
        }}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default Button;
