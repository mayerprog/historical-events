import React, { useRef, useState } from "react";
import styles from "./HistoryCircle.module.scss";
import events from "./../../../mock-data.json";
import gsap from "gsap";

interface Area {
  area: string;
  years: Year[];
}

interface Year {
  year: string;
  text: string;
}

const HistoryCircle: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);

  const chosenYears = events[activeIndex].years;

  const rotateDegree = (index: number) => index * (360 / events.length) + 30;

  const handleEventClick = (index: number) => {
    if (index === activeIndex) return;
    const rotationDiff = (activeIndex - index) * (360 / events.length);
    const duration = Math.min(0.9, 1 / (Math.abs(rotationDiff) / 360));

    gsap.to(circleRef.current, {
      rotation: `+=${rotationDiff}`,
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => setActiveIndex(index),
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Исторические даты</h1>
      <div className={styles.circleContainer}>
        <div className={styles.circle} ref={circleRef}>
          {events.map((_, index) => (
            <div
              key={index}
              className={`${
                index === activeIndex
                  ? styles.openedCircle
                  : styles.closedCircle
              }`}
              style={{
                transform: `rotate(${rotateDegree(
                  index
                )}deg) translate(0, -225px)`,
              }}
              onClick={() => handleEventClick(index)}
            >
              {index === activeIndex && (
                <span className={styles.circleNumber}>{index + 1}</span>
              )}
            </div>
          ))}
        </div>
        <span className={`${styles.date} ${styles.left}`}>
          {chosenYears[0]?.year}
        </span>
        <span className={`${styles.date} ${styles.right}`}>
          {chosenYears[chosenYears.length - 1]?.year}
        </span>
      </div>

      <div className={styles.axisX}></div>
      <div className={styles.axisY}></div>
    </div>
  );
};

export default HistoryCircle;
