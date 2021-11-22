import React, { useEffect, useRef, useState } from "react";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import RightArrowRound from "../SVGcomponents/RightArrowRound";
import styles from "../../styles/Products/games.module.scss";
import PlayCircleSvg from "../SVGcomponents/PlayCircleSvg";
import { useRouter } from "next/dist/client/router";
import PauseSvg from "../SVGcomponents/PauseSvg";

export default function Games({ id }) {
  const router = useRouter();
  const [currentgameindex, setcurrentgameindex] = useState(0);
  const [paused, setpaused] = useState(true);
  const videoref = useRef();
  const games = [
    {
      name: "Shopping Budget",
      description:
        "Identify how much is available to spend and making purchase decisions based on that.",
      link: "/gamepage/ShoppingBudget",
    },
    {
      name: "Balance Builder",
      description: "Identify what is income and what is expense.",
      link: "/gamepage/BalanceBuilder",
    },
    {
      name: "High And Low",
      description:
        "Identify currency and arrange in ascending or descending order after adding the money.",
      link: "/gamepage/HighAndLow",
    },
    {
      name: "Money Math",
      description:
        "Choose what you want to buy, earn some money, and calculate  how much you have left.",
      link: "/gamepage/MoneyMath",
    },
    {
      name: "Money Manager",
      description:
        "Know the importance of allocating your earnings between spending, saving and donating.",
      link: "/gamepage/MoneyManager",
    },
    // {
    //   name: "Coin Slide",
    //   description:
    //     "This is demo description, will be replaced with content later.",
    //   link: "/gamepage/CoinSlide",
    // },
    {
      name: "Need Or Want",
      description: "Identify the difference between needs and wants.",
      link: "/gamepage/NeedOrWant",
    },
  ];

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
    <div className={styles.gamespage} id={id}>
      <div className={styles.heading}>Games</div>
      <div className={styles.subheading}>
        Our platform has multiple games where children can apply financial
        concepts to real-experiences based games and understand finance,
        investing, and entrepreneurship in a fun and compelling way. Through our
        leaderboards, they can compete against their peers across the countries,
        and their performances will be rewarded with UniCoins.
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <p className={styles.title}>{games[currentgameindex].name}</p>
          <div className={styles.description}>
            {games[currentgameindex].description}
          </div>
          <div className={styles.button} onClick={() => router.push("/games")}>
            Play Now
          </div>
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
            {!paused ? (
              <div onClick={handlePlayPause}>
                <PauseSvg className={styles.pauseIcon} />
              </div>
            ) : (
              <div className={styles.playIcon} onClick={handlePlayPause}>
                <PlayCircleSvg />
              </div>
            )}

            <video
              ref={videoref}
              src={`/videos/Games/${games[currentgameindex].name.replace(
                / /g,
                ""
              )}.mp4`}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
