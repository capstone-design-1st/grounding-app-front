import React from "react";
import "./styles.css";

interface SkeletonLoaderProps {
  width: string;
  height: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height }) => {
  return (
    <div
      className="skeletonLoader"
      style={{ width: width, height: height }}
    ></div>
  );
};

export default SkeletonLoader;
