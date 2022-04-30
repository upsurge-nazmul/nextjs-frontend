import React, { useContext, useEffect, useRef, useState } from "react";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import RightArrowRound from "../SVGcomponents/RightArrowRound";
import styles from "../../styles/Products/games.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
import { useRouter } from "next/dist/client/router";
import PauseSvg from "../SVGcomponents/PauseSvg";
import { MainContext } from "../../context/Main";

export default function Games({ id }) {
  const router = useRouter();
  const [currentgameindex, setcurrentgameindex] = useState(0);
  const [moneyaceindex, setmoneyaceindex] = useState(0);
  const [paused, setpaused] = useState(true);
  const videoref = useRef();
  const games = [
    {
      name: "Shopping Budget",
      description:
        "Identify how much is available to spend and making purchase decisions based on that.",
      link: "/gamepage/ShoppingBudget",
      video:
        "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/ShoppingBudget.mp4",
      img: "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/SB.png",
    },
    {
      name: "Balance Builder",
      description: "Identify what is income and what is expense.",
      link: "/gamepage/BalanceBuilder",
      video:
        "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/BalanceBuilder.mp4",
      img: "/images/games/BalanceBuilder.png",
    },

    {
      name: "High and Low",
      description:
        "Identify currency and arrange in ascending or descending order after adding the money.",
      link: "/gamepage/HighAndLow",
      video:
        "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/HighAndLow.mp4",
      img: "/images/games/HighandLow.png",
    },
    {
      name: "Money Math",
      description:
        "Choose what you want to buy, earn some money, and calculate  how much you have left.",
      link: "/gamepage/MoneyMath",
      video:
        "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/MoneyMath.mp4",
      img: "/images/games/MoneyMath.png",
    },
    {
      name: "Money Manager",
      description:
        "Know the importance of allocating your earnings between spending, saving and donating.",
      link: "/gamepage/MoneyManager",
      video:
        "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/MoneyManager.mp4",
      img: "/images/games/MoneyManager.png",
    },
    {
      name: "Money Slide",
      description:
        "Identify different types of Money notes and coins and achieve the desired target.",
      img: "/images/games/MoneySlide.png",
    },
    // {
    //   name: "Money Ace",
    //   description:
    //     "This is demo description, will be replaced with content later.",
    //   link: "/gamepage/CoinSlide",
    //   video:
    //     "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/CoinSlide.mp4",
    // },
    {
      name: "Need or Want",
      description: "Identify the difference between needs and wants.",
      link: "/gamepage/NeedOrWant",
      video:
        "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/NeedOrWant.mp4",
      img: "/images/games/NeedorWant.png",
    },
    {
      name: "Ludo",
      description: "Financial Ludo for young adults.",
      img: "/images/games/Ludo.jpg",
    },
  ];
  const moneyacess = [
    "/images/games/MoneyAce.png",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ma_1.jpeg",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ma_2.jpeg",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ma_3.jpeg",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ma_4.jpeg",
    "https://upsurgevideoassets.s3.ap-south-1.amazonaws.com/images/ma_5.jpeg",
  ];
  const { theme } = useContext(MainContext);
  useEffect(() => {
    setpaused(true);
  }, [currentgameindex]);

  function handlePlayPause() {
    console.log("pp");
    if (paused) {
      videoref.current.play();
      setpaused(false);
    } else {
      videoref.current.pause();
      setpaused(true);
    }
  }
  return (
    <div
      className={`${styles.gamespage} ${
        theme === "dark" && styles.darkgamepage
      }`}
      id={id}
    >
      <div className={styles.heading}>Games arena</div>
      <div className={styles.subheading}>
        Enable your child to experience the importance of money management in a
        virtual environment. Our platform has multiple games to reinforce
        concepts and help the child understand personal finance, and
        entrepreneurship in a fun and compelling way. Through our leaderboards,
        they can compete against their peers across countries, and their
        performances will be rewarded with UniCoins which can be redeemed to get
        discounts on some of their favorite brands
      </div>
      {/* <div className={`${styles.wrapper} ${styles.mawrapper}`}>
        <div className={styles.left}>
          <p className={styles.title}>Money Ace</p>
          <div className={styles.description}>
            {`Money Ace, our first feature game, is India’s first investment game for teenagers. Starting as a 14 year old in Surge City, you have to complete your homework & responsibilities to earn your pocket money, take on side-gigs to earn some more money, and invest across different options including stocks, deposits and crypto. Every Sunday we will reward the players who have created the most wealth for themselves through games, quizzes and smart allocation!`}
          </div>
          <div className={styles.buttonWrapper}>
            <div
              className={styles.arrowl}
              onClick={() => {
                if (currentgameindex - 1 < 0) {
                  setmoneyaceindex(moneyacess.length - 1);
                } else {
                  setmoneyaceindex(moneyaceindex - 1);
                }
              }}
            >
              <PlayCircleSvg />
            </div>

            <div
              className={styles.arrowr}
              onClick={() =>
                setmoneyaceindex((moneyaceindex + 1) % moneyacess.length)
              }
            >
              <PlayCircleSvg />
            </div>
          </div>
          <div className={styles.navbar}>
            {moneyacess.map((item, index) => {
              return (
                <div
                  className={`${styles.ball} ${
                    index === moneyaceindex ? styles.active : null
                  }`}
                  key={"navball" + index}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.container}>
            <img
              className={styles.gameimg}
              src={moneyacess[moneyaceindex]}
              alt=""
            />
          </div>
        </div>
      </div> */}
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <p className={styles.title}>{games[currentgameindex].name}</p>
          <div className={styles.description}>
            {games[currentgameindex].description}
          </div>
          {/* <div className={styles.button} onClick={() => router.push("/games")}>
            Play Now
          </div> */}
          <div className={styles.buttonWrapper}>
            <div
              className={styles.arrowl}
              onClick={() => {
                if (currentgameindex - 1 < 0) {
                  setcurrentgameindex(games.length - 1);
                } else {
                  setcurrentgameindex(currentgameindex - 1);
                }
              }}
            >
              <PlayCircleSvg />
            </div>

            <div
              className={styles.arrowr}
              onClick={() =>
                setcurrentgameindex((currentgameindex + 1) % games.length)
              }
            >
              <PlayCircleSvg />
            </div>
          </div>
          <div className={styles.navbar}>
            {games.map((item, index) => {
              return (
                <div
                  className={`${styles.ball} ${
                    index === currentgameindex ? styles.active : null
                  }`}
                  key={"navball" + index}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.container}>
            {/* {!paused ? (
              <div onClick={handlePlayPause}>
                <PauseSvg className={styles.pauseIcon} />
              </div>
            ) : (
              <div className={styles.playIcon} onClick={handlePlayPause}>
                <PlayCircleSvg />
              </div>
            )} */}
            <img
              className={styles.gameimg}
              src={games[currentgameindex].img}
              alt="calcicon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
