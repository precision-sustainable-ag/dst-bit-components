import React from "react";
import "./spinner.scss";

export function Spinner({ size, color, backgroundColor }) {
  const loaderStyle = {
    width: size || "50px", // Default size is 50px
    height: size || "50px",
    border: `8px solid ${backgroundColor || "#f3f3f3"}`,
    borderTop: `8px solid ${color || "#3498db"}`,
    borderLeft: `8px solid ${color || "#3498db"}`,
    borderRight: `8px solid ${color || "#3498db"}`,
    borderRadius: "50%",
    animation: "spin 2s linear infinite",
  };

  return <div style={loaderStyle}></div>;
}
