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

  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const chosenYears = events[activeIndex].years;

  const rotateDegree = (index: number) => index * (360 / events.length) + 30;

  const handleEventClick = (index: number) => {
    if (index === activeIndex) return;
    const rotationDiff = (activeIndex - index) * (360 / events.length);
    const duration = Math.min(0.8, 1 / (Math.abs(rotationDiff) / 360));

    gsap.to(circleRef.current, {
      rotation: `+=${rotationDiff}`,
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => setActiveIndex(index),
    });

    const currentCircle = circleRefs.current[activeIndex];
    const nextCircle = circleRefs.current[index];
    const currentCircleNumber = circleNumberRefs.current[activeIndex];
    const nextCircleNumber = circleNumberRefs.current[index];

    if (currentCircle) {
      gsap.to(currentCircle, {
        width: 8,
        height: 8,
        backgroundColor: "#6A6A6A",
        duration: 0.5,
        ease: "power1.inOut",
      });
      if (currentCircleNumber) {
        gsap.fromTo(
          currentCircleNumber,
          { opacity: 1, scale: 1 },
          { opacity: 0, scale: 0.8, duration: 0.5, ease: "power1.inOut" }
        );
      }
    }
    if (nextCircle) {
      gsap.to(nextCircle, {
        width: 50,
        height: 50,
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        zIndex: "998",
        duration: 0.5,
        ease: "expo.inOut",
      });
      if (nextCircleNumber) {
        gsap.fromTo(
          nextCircleNumber,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power1.inOut" }
        );
      }
    }
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
              ref={(el) => (circleRefs.current[index] = el)}
            >
              <span
                className={`${styles.circleNumber} ${
                  index === activeIndex ? styles.active : styles.hidden
                }`}
                ref={(el) => (circleNumberRefs.current[index] = el)}
              >
                {index + 1}
              </span>
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
