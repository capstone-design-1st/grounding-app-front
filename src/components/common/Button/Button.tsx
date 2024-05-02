import React from "react";

type ButtonProps = {
  text: string;
  color: string;
  background: string;
  padding: string;
  border?: string;
  boxShadow?: string;
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
}) => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          borderRadius: "10px",
          color: color,
          border: border,
          boxShadow: boxShadow,
          backgroundColor: background,
          padding: padding,
        }}
        onClick={onClick}
      >
        {text}
      </div>
    </div>
  );
};

export default Button;
