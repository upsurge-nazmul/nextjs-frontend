import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/GeneralComponents/carouselgames.module.scss";
import Buttons from "../../Buttons";
import { motion } from "framer-motion";
import GameSvg from "../../SVGcomponents/GameSvg";
// import { isDesktop } from "react-device-detect";

const slidesData = [
  {
    id: 0,
    image: "https://imgcdn.upsurge.in/images/DownloadGames/Money_dash_1.png",
    title: "Money Dash",
    description:
      "A runner game where you have to earn coins without balance dropping to zero. Learn concepts like profit, loss and taxes.",
  },
  {
    id: 1,
    image: "https://imgcdn.upsurge.in/images/DownloadGames/Money_dash_2.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 2,
    image: "https://imgcdn.upsurge.in/images/DownloadGames/Money_dash_3.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
];

export default function CarouselGames({ userdata, setshowauth, setauthmode }) {
  const router = useRouter();
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
      if (mediaQuerySmall.matches) {
        return {
          first: 90,
          second: 5,
        };
      } else if (mediaQueryMedium.matches) {
        return {
          first: 90,
          second: 5,
        };
      } else if (mediaQueryLarge.matches) {
        return {
          first: 80,
          second: 30,
        };
      } else {
        return {
          first: 34,
          second: 35,
        };
      }
    } else {
      return {
        first: 34,
        second: 35,
      };
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (currentSlide === slidesData.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [currentSlide]);

  useEffect(() => {
    let card = document.getElementById("card");
    setHeight(card.offsetHeight);
  }, [currentSlide]);
  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper} style={{ height: height + 30 }}>
        {slidesData.map((data, index) => (
          <motion.div
            key={"game-slide-" + index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              rotate: 0,
              left: `${
                (index - currentSlide) * getResponsiveSize().first +
                getResponsiveSize().second
              }vw`,
              scale: index === currentSlide ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              opacity: index === currentSlide ? 1 : 0.8,
              // backgroundColor: isMobile ? "red" : "blue",
            }}
            className={styles.slide}
            id="card"
          >
            <div className={styles.slideContent}>
              <img src={data.image} alt={data.title} className={styles.image} />
              <div className={styles.slideBottomContent}>
                <h1>{data.title}</h1>
                <p className={styles.description}>{data.description}</p>
              </div>
              <div className={styles.activeButtonContainer}>
                <button
                  onClick={() => {
                    if (!userdata) {
                      setshowauth(true);
                      setauthmode("parentChild");
                    } else if (userdata.user_type === "child") {
                      router.push("/dashboard/k/games");
                    } else if (userdata.user_type === "parent") {
                      router.push("/dashboard/p/games");
                    }
                  }}
                  className={styles.actionButton}
                >
                  <GameSvg className={styles.icon} />
                  Play Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className={styles.sliderDots}>
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className={`${styles.sliderDot} ${
              slide.id === currentSlide ? styles.active : ""
            }`}
            onClick={() => {
              setCurrentSlide(slide.id);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
