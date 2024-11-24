import React from "react";
import styles from "./CircleComponent.module.scss";
import events from "../../../mock-data.json";
import { Year } from "../../models";

interface CircleComponentProps {
  chosenYears: Year[];
  circleRef: React.RefObject<HTMLDivElement>;
  circleRefs: React.RefObject<(HTMLDivElement | null)[]>;
  circleNumberRefs: React.RefObject<(HTMLSpanElement | null)[]>;
  startYearRef: React.RefObject<HTMLSpanElement>;
  endYearRef: React.RefObject<HTMLSpanElement>;
  activeIndex: number;
  rotateDegree: (index: number) => number;
  translate: number;
  handleEventClick: (index: number) => void;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: (index: number) => void;
}

const CircleComponent: React.FC<CircleComponentProps> = ({
  circleRef,
  circleRefs,
  circleNumberRefs,
  startYearRef,
  endYearRef,
  chosenYears,
  activeIndex,
  rotateDegree,
  translate,
  handleEventClick,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div className={styles.circleContainer}>
      <div className={styles.circle} ref={circleRef}>
        {events.map((_, index: number) => (
          <div
            key={index}
            className={`${
              index === activeIndex ? styles.openedCircle : styles.closedCircle
            }`}
            style={{
              transform: `rotate(${rotateDegree(
                index
              )}deg) translate(0, -${translate}px)`,
            }}
            onClick={() => handleEventClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            ref={(el) => {
              if (circleRefs.current) {
                circleRefs.current[index] = el;
              }
            }}
          >
            <span
              className={`${styles.circleNumber} ${
                index === activeIndex ? styles.active : styles.hidden
              }`}
              ref={(el) => {
                if (circleNumberRefs.current) {
                  circleNumberRefs.current[index] = el;
                }
              }}
              style={{
                transform: `rotate(-${rotateDegree(index)}deg)`,
              }}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>
      <span className={`${styles.date} ${styles.left}`} ref={startYearRef}>
        {chosenYears[0].year}
      </span>
      <span className={`${styles.date} ${styles.right}`} ref={endYearRef}>
        {chosenYears[chosenYears.length - 1].year}
      </span>
    </div>
  );
};

export default CircleComponent;
