import React from "react";
import styles from "./HistoryCircle.module.scss";

const HistoryCircle: React.FC = () => {
  const smallCircles = Array.from({ length: 6 });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Исторические даты</h1>
      <div className={styles.circleContainer}>
        <div className={styles.circle}>
          <span className={`${styles.date} ${styles.left}`}>2015</span>
          <span className={`${styles.date} ${styles.right}`}>2022</span>
          {smallCircles.map((_, index) => (
            <div
              key={index}
              className={styles.smallCircle}
              style={{
                transform: `rotate(${
                  index * (360 / smallCircles.length) + 30
                }deg) translate(0, -225px)`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.axisX}></div>
      <div className={styles.axisY}></div>
    </div>
  );
};

export default HistoryCircle;
