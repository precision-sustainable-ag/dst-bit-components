import React from "react";
import styles from "./spinner.module.scss";

export function Spinner({
  size = "50px",
  color = "#3498db",
  backgroundColor = "#f3f3f3",
}) {
  const loaderStyle = {
    width: size,
    height: size,
    border: `8px solid ${backgroundColor}`,
    borderTop: `8px solid ${color}`,
    borderLeft: `8px solid ${color}`,
    borderRight: `8px solid ${color}`,
    borderRadius: "50%",
    animation: `${styles.spin} 2s linear infinite`,
  };

  return <div style={loaderStyle}></div>;
}
