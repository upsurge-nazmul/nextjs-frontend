import { useState } from "react";
import styles from "../../styles/Products/all-games-carousel.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import GameSvg from "../SVGcomponents/GameSvg";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import RightArrowRound from "../SVGcomponents/RightArrowRound";
import { assetsVideo } from "../../utils/utils";

const slidesData = [
  {
    id: 0,
    image: "https://imgcdn.upsurge.in/images/money-dash.png",
    title: "Money Dash",
    description:
      "A runner game where you have to earn coins without balance dropping to zero. Learn concepts like profit, loss and taxes.",
  },
  {
    id: 1,
    image: "https://imgcdn.upsurge.in/images/mini-miner.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 2,
    image: "https://imgcdn.upsurge.in/images/snake-and-ladders.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
  {
    id: 3,
    image: "https://imgcdn.upsurge.in/images/money-dash.png",
    title: "Money Dash",
    description:
      "A runner game where you have to earn coins without balance dropping to zero. Learn concepts like profit, loss and taxes.",
  },
  {
    id: 4,
    image: "https://imgcdn.upsurge.in/images/mini-miner.png",
    title: "Mini Miner",
    description:
      "A game that lets you buy and sell virtual stocks. Learn concepts like investing mutual funds and more.",
  },
  {
    id: 5,
    image: "https://imgcdn.upsurge.in/images/snake-and-ladders.png",
    title: "Snakes and Ladders",
    description:
      "A version of cult classic. Learn concepts like saving and investing while enjoying the chance based thrill.",
  },
];

const games = [
  {
    name: "Shopping Budget",
    description:
      "Identify how much is available to spend and making purchase decisions based on that.",
    link: "/gamepage/ShoppingBudget",
    video:
      assetsVideo('ShoppingBudget.mp4'),
    // img: assetsVideo('images/SB.png'),
    img: "https://imgcdn.upsurge.in/images/games/shopping-budget.png",
  },
  {
    name: "Balance Builder",
    description: "Identify what is income and what is expense.",
    link: "/gamepage/BalanceBuilder",
    video:
      assetsVideo('BalanceBuilder.mp4'),
    img: "https://imgcdn.upsurge.in/images/games/balance-builder.png",
  },
  {
    name: "High and Low",
    description:
      "Identify currency and arrange in ascending or descending order after adding the money.",
    link: "/gamepage/HighAndLow",
    video:
      assetsVideo('HighAndLow.mp4'),
    img: "https://imgcdn.upsurge.in/images/games/high-low.png",
  },
  {
    name: "Money Math",
    description:
      "Choose what you want to buy, earn some money, and calculate  how much you have left.",
    link: "/gamepage/MoneyMath",
    video:
      assetsVideo('MoneyMath.mp4'),
    img: "https://imgcdn.upsurge.in/images/games/money-maath.png",
  },
  {
    name: "Money Manager",
    description:
      "Know the importance of allocating your earnings between spending, saving and donating.",
    link: "/gamepage/MoneyManager",
    video:
      assetsVideo('MoneyManager.mp4'),
    img: "https://imgcdn.upsurge.in/images/games/money-manager.png",
  },
  {
    name: "Money Slide",
    description:
      "Identify different types of Money notes and coins and achieve the desired target.",
    img: "https://imgcdn.upsurge.in/images/games/money-slide.png",
  },
  // {
  //   name: "Money Ace",
  //   description:
  //     "This is demo description, will be replaced with content later.",
  //   link: "/gamepage/CoinSlide",
  //   video:
  //     assetsVideo('CoinSlide.mp4'),
  // },
  {
    name: "Need or Want",
    description: "Identify the difference between needs and wants.",
    link: "/gamepage/NeedOrWant",
    video:
      assetsVideo('NeedOrWant.mp4'),
    img: "https://imgcdn.upsurge.in/images/games/need-wants.png",
  },
  {
    name: "Ludo",
    description: "Financial Ludo for young adults.",
    img: "https://imgcdn.upsurge.in/images/games/ludo.png",
  },
];

const AllGamesCarousel = () => {
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
        Get access to the most fun educational financial literacy &
        entrepreneurial games for kids
      </h2>
      <div className={styles.sliderContainer}>
        <LeftArrowRound
          onClick={() => {
            if (!(currentSlide === 0)) {
              setCurrentSlide(--currentSlide);
            }
          }}
          className={`${styles.icon} ${styles.leftIcon}`}
        />
        <div className={styles.sliderWrapper} style={{ height: height + 40 }}>
          {games.map((data, index) => (
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
              <div className={styles.slideContent}>
                <img src={data.img} alt={data.name} className={styles.image} />
                <div className={styles.slideBottomContent}>
                  <img src={data.img} className={styles.gameLogo} alt=" " />
                  <div className={styles.nameContainer}>
                    <h1>{data.name}</h1>
                    <div className={styles.activeButtonContainer}>
                      <button
                        // onClick={() => {
                        //   if (!userdata) {
                        //     setshowauth(true);
                        //     setauthmode("parentChild");
                        //   } else if (userdata.user_type === "child") {
                        //     router.push("/dashboard/k/games");
                        //   } else if (userdata.user_type === "parent") {
                        //     router.push("/dashboard/p/games");
                        //   }
                        // }}
                        className={styles.actionButton}
                      >
                        <GameSvg className={styles.icon} />
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <RightArrowRound
          onClick={() => {
            if (!(currentSlide === games.length - getResponsiveSize().item)) {
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

export default AllGamesCarousel;
