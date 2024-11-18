import React from "react";
import styles from "./CircleComponent.module.scss";

const CircleComponent: React.FC = () => {
  debugger;
  console.log(styles);

  return (
    <div className={styles.circleContainer}>
      <svg width="400" height="400">
        <circle
          className={styles.big}
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="lightgray"
        />
        <circle className={styles.small} cx="200" cy="150" r="5" fill="blue" />
        <circle className={styles.small} cx="220" cy="170" r="5" fill="blue" />
        <circle className={styles.small} cx="180" cy="130" r="5" fill="blue" />
      </svg>
    </div>
  );
};

export default CircleComponent;
