import React, { useEffect } from "react";
import { useState } from "react";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import { motion } from "framer-motion";
import RightArrowRound from "../SVGcomponents/RightArrowRound";
import styles from "../../styles/Products/live-classes-slider.module.scss";

const sliderData = [1, 2, 3, 4];

const LiveClassesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [height, setHeight] = useState(0);

  const getResponsiveSize = () => {
    if (typeof window !== "undefined") {
      let mediaQuerySmall = window.matchMedia("(max-width: 500px)");
      let mediaQueryMedium = window.matchMedia(
        " (min-width: 501px) and (max-width: 990px)"
      );
      let mediaQueryLarge = window.matchMedia(
        "(min-width: 991px) and (max-width: 1300px)"
      );
      console.log({
        mediaQueryLarge,
        mediaQueryMedium,
        mediaQuerySmall,
      });
      if (mediaQuerySmall.matches) {
        return {
          width: 90,
          item: 1,
        };
      } else if (mediaQueryMedium.matches) {
        return {
          width: 90,
          item: 1,
        };
      } else if (mediaQueryLarge.matches) {
        return {
          width: 45,
          item: 2,
        };
      } else {
        return {
          width: 27,
          item: 3,
        };
      }
    } else {
      return {
        width: 27,
        item: 3,
      };
    }
  };

  useEffect(() => {
    let card = document.getElementById("card");
    setHeight(card.offsetHeight);
  }, [currentSlide]);
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Dive into Engaging Workshops & Transformative Courses on Finance,
        Career, and Entrepreneurship. Experience Learning Like Never Before!
      </h2>
      <div className={styles.sliderContainer}>
        <LeftArrowRound
          onClick={() => {
            if (currentSlide !== 0) {
              setCurrentSlide(--currentSlide);
            }
          }}
          className={`${styles.icon} ${styles.leftIcon}`}
        />
        <div className={styles.sliderWrapper} style={{ height: height + 40 }}>
          {sliderData.map((data, index) => (
            <motion.div
              key={"game-slide-" + index}
              initial={{}}
              animate={{
                left: `${(index - currentSlide) * getResponsiveSize().width}vw`,
              }}
              // transition={{
              //   type: "spring",
              //   stiffness: 260,
              //   damping: 20,
              // }}
              className={styles.slide}
              id="card"
            >
              <div className={styles.slideContent}></div>
            </motion.div>
          ))}
        </div>
        <RightArrowRound
          onClick={() => {
            if (currentSlide !== sliderData.length - getResponsiveSize().item) {
              setCurrentSlide(++currentSlide);
            }
          }}
          className={`${styles.icon} ${styles.rightIcon}`}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Explore More</button>
      </div>
    </div>
  );
};

export default LiveClassesSlider;
