import React from "react";

type ButtonProps = {
  text: string;
  color: string;
  background: string;
  padding: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  background,
  padding,
  onClick,
}) => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          borderRadius: "10px",
          color: color,
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
