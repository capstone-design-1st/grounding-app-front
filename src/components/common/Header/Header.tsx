import React from "react";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#333",
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  center: {
    flexGrow: 1,
    textAlign: "center" as const,
  },
  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};

interface HeaderProps {
  leftContent?: JSX.Element;
  centerContent?: JSX.Element;
  rightContent?: JSX.Element;
}

const Header: React.FC<HeaderProps> = ({
  leftContent,
  centerContent,
  rightContent,
}) => {
  return (
    <div style={styles.header}>
      <div style={styles.left}>{leftContent}</div>
      <div style={styles.center}>{centerContent}</div>
      <div style={styles.right}>{rightContent}</div>
    </div>
  );
};

export default Header;
