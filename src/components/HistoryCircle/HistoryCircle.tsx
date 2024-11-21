import React, { useRef, useState } from "react";
import styles from "./HistoryCircle.module.scss";
import events from "./../../../mock-data.json";
import gsap from "gsap";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const circleRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const circleNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ignoreMouseLeaveRef = useRef<number>(0);
  const startYearRef = useRef<HTMLSpanElement>(null);
  const endYearRef = useRef<HTMLSpanElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const chosenYears = events[activeIndex].years;

  const rotateDegree = (index: number) => index * (360 / events.length) + 30;

  const handleEventClick = (index: number) => {
    setIsRotating(true);
    if (index === activeIndex || clickTimeout.current) {
      setIsRotating(false);
      return;
    }

    setCurrentIndex(index);

    clickTimeout.current = setTimeout(() => {
      clickTimeout.current = null;
    }, 800);
    console.log("index", index);

    ignoreMouseLeaveRef.current = index;
    const rotationDiff = (activeIndex - index) * (360 / events.length);
    const duration = Math.min(0.8, 1 / (Math.abs(rotationDiff) / 360));

    gsap.to(circleRef.current, {
      rotation: `+=${rotationDiff}`,
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => {
        {
          setActiveIndex(index);
          setIsRotating(false);
        }
      },
    });

    circleRefs.current.forEach((circle, i) => {
      if (circle) {
        gsap.to(circle, {
          rotation: `-=${rotationDiff}`,
          duration: duration,
        });
      }
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
    }
    if (currentCircleNumber) {
      gsap.to(currentCircleNumber, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
    if (nextCircle) {
      gsap.to(nextCircle, {
        width: 50,
        height: 50,
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        zIndex: "998",
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
    if (nextCircleNumber) {
      gsap.to(nextCircleNumber, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power1.inOut",
      });
    }

    const currentYears = events[activeIndex].years;
    const nextYears = events[index].years;
    const currentStartYear = parseInt(currentYears[0].year);
    const currentEndYear = parseInt(currentYears[currentYears.length - 1].year);
    const nextStartYear = parseInt(nextYears[0].year);
    const nextEndYear = parseInt(nextYears[nextYears.length - 1].year);
    const skipPercentage = 0.3;
    const adjustedStartValue =
      nextStartYear > currentStartYear
        ? currentStartYear +
          Math.ceil((nextStartYear - currentStartYear) * skipPercentage)
        : currentStartYear -
          Math.ceil((currentStartYear - nextStartYear) * skipPercentage);

    const adjustedEndValue =
      nextEndYear > currentEndYear
        ? currentEndYear +
          Math.ceil((nextEndYear - currentEndYear) * skipPercentage)
        : currentEndYear -
          Math.ceil((currentEndYear - nextEndYear) * skipPercentage);

    if (startYearRef.current && endYearRef.current) {
      gsap.to(
        { year: adjustedStartValue },
        {
          year: nextStartYear,
          duration: duration,
          ease: "sine.out",
          onUpdate: function () {
            startYearRef.current!.textContent = Math.round(
              this.targets()[0].year
            ).toString();
          },
        }
      );

      gsap.to(
        { year: adjustedEndValue },
        {
          year: nextEndYear,
          duration: duration,
          ease: "sine.out",
          onUpdate: function () {
            endYearRef.current!.textContent = Math.round(
              this.targets()[0].year
            ).toString();
          },
        }
      );
    }
  };

  const handleMouseEnter = (index: number) => {
    const nextCircle = circleRefs.current[index];
    const nextCircleNumber = circleNumberRefs.current[index];

    if (nextCircle) {
      gsap.to(nextCircle, {
        width: 50,
        height: 50,
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        zIndex: "998",
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
    if (nextCircleNumber) {
      gsap.to(nextCircleNumber, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    if (index === ignoreMouseLeaveRef.current) return;

    const currentCircle = circleRefs.current[index];
    const currentCircleNumber = circleNumberRefs.current[index];

    if (currentCircle) {
      gsap.to(currentCircle, {
        width: 8,
        height: 8,
        backgroundColor: "#6A6A6A",
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
    if (currentCircleNumber) {
      gsap.to(currentCircleNumber, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power1.inOut",
      });
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
                )}deg) translate(0, -268px)`,
              }}
              onClick={() => handleEventClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              ref={(el) => (circleRefs.current[index] = el)}
            >
              <span
                className={`${styles.circleNumber} ${
                  index === activeIndex ? styles.active : styles.hidden
                }`}
                ref={(el) => (circleNumberRefs.current[index] = el)}
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
      <div className={styles.arrowsContainer}>
        <span>{`0${currentIndex + 1}/0${events.length}`}</span>
        <div className={styles.arrows}>
          <button
            className={styles.arrowCircle}
            onClick={() => handleEventClick(activeIndex - 1)}
            disabled={activeIndex - 1 < 0}
          >
            <IoIosArrowBack />
          </button>
          <button
            className={styles.arrowCircle}
            onClick={() => handleEventClick(activeIndex + 1)}
            disabled={activeIndex + 1 === events.length}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div
        className={`${styles.eventsInfoContainer} ${
          isRotating ? styles.hidden : styles.active
        }`}
      >
        <button
          className={`${styles.navigation} ${styles.left} ${
            isBeginning ? styles.hidden : styles.active
          }`}
          id="prevBtn"
        >
          <IoIosArrowBack />
        </button>
        <button
          className={`${styles.navigation} ${styles.right} ${
            isEnd ? styles.hidden : styles.active
          }`}
          id="nextBtn"
        >
          <IoIosArrowForward />
        </button>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: "#prevBtn",
            nextEl: "#nextBtn",
          }}
          loop={false}
          // pagination={{ clickable: true }}
          spaceBetween={60}
          slidesPerView="auto"
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachEnd={() => {
            setIsEnd(true);
            setIsBeginning(false);
          }}
          onReachBeginning={() => {
            setIsBeginning(true);
            setIsEnd(false);
          }}
        >
          {chosenYears.map((item, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.infoCell}>
                <span className={styles.year}>{item.year}</span>
                <span className={styles.text}>{item.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.axisX}></div>
      <div className={styles.axisY}></div>
    </div>
  );
};

export default HistoryCircle;
