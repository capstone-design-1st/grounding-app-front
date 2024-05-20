import React from "react";
import "./styles.css";

interface HeaderProps {
  leftContent?: JSX.Element;
  centerContent?: JSX.Element | string;
  rightContent?: JSX.Element;
}

const Header: React.FC<HeaderProps> = ({
  leftContent,
  centerContent,
  rightContent,
}) => {
  return (
    <div className="header">
      <div className="header-left">{leftContent}</div>
      <div className="header-center">{centerContent}</div>
      <div className="header-right">{rightContent}</div>
    </div>
  );
};

export default Header;
