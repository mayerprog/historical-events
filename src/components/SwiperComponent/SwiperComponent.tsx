import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import styles from "./SwiperComponent.module.scss";
import { Year } from "../../models";
import React, { Dispatch, SetStateAction } from "react";

interface SwiperComponentProps {
  mobile: boolean;
  tablet: boolean;
  tablet2: boolean;
  setIsBeginning: Dispatch<SetStateAction<boolean>>;
  setIsEnd: Dispatch<SetStateAction<boolean>>;
  chosenYears: Year[];
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  mobile,
  tablet,
  tablet2,
  setIsBeginning,
  setIsEnd,
  chosenYears,
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={{
        prevEl: "#prevBtn",
        nextEl: "#nextBtn",
      }}
      loop={false}
      pagination={mobile ? { clickable: true, el: "#customPagination" } : false}
      spaceBetween={!tablet && !tablet2 ? 60 : 10}
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
      {chosenYears.map((item: Year, index: number) => (
        <SwiperSlide key={index} className={styles.slide}>
          <div className={styles.infoCell}>
            <span className={styles.year}>{item.year}</span>
            <span className={styles.text}>{item.text}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
