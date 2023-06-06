import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import styles from "../../../styles/GeneralComponents/carouselgames.module.scss";
import Buttons from "../../Buttons";
import { motion } from "framer-motion";

const slidesData = [
  {
    id: 0,
    image: "./images/downloadGames/Money_dash_1.png",
    title: "Money Dash",
    description:
      "A runner game where you have to earn coins without balance dropping to zero. Learn concepts like profit, loss and taxes.",
  },
  {
    id: 1,
    image: "./images/downloadGames/Money_dash_2.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 2,
    image: "./images/downloadGames/Money_dash_3.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
  {
    id: 3,
    image: "./images/downloadGames/Money_dash_2.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 4,
    image: "./images/downloadGames/Money_dash_3.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
  {
    id: 5,
    image: "./images/downloadGames/Money_dash_2.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 6,
    image: "./images/downloadGames/Money_dash_3.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
];

export default function CarouselGames({ userdata, setshowauth, setauthmode }) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
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

  return (
    <div className={styles.slider}>
      <div className={styles.sliderWrapper}>
        {slidesData.map((data, index) => (
          <motion.div
            key={"game-slide-" + index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              rotate: 0,
              left: `${(index - currentSlide) * 34 + 25}vw`,
              scale: index === currentSlide ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              opacity: index === currentSlide ? 1 : 0.8,
            }}
            className={styles.slide}
          >
            <div className={styles.slideContent}>
              <img src={data.image} alt={data.title} className={styles.image} />
              <div className={styles.slideBottomContent}>
                <h1>{data.title}</h1>
                <p className={styles.description}>{data.description}</p>
              </div>
              <div className={styles.activeButtonContainer}>
                <Buttons
                  handleClick={() => {
                    if (!userdata) {
                      setshowauth(true);
                      setauthmode("parentChild");
                    } else if (userdata.user_type === "child") {
                      router.push("/dashboard/k/games");
                    } else if (userdata.user_type === "parent") {
                      router.push("/dashboard/p/games");
                    }
                  }}
                >
                  Play Now!
                </Buttons>
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
              // Slide(slide.id);
              setCurrentSlide(slide.id);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
