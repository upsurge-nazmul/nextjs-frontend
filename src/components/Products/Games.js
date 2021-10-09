import React, { useRef, useState } from "react";
import LeftArrowRound from "../SVGcomponents/LeftArrowRound";
import RightArrowRound from "../SVGcomponents/RightArrowRound";
import styles from "../../styles/Benefits/games.module.scss";
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
        "This is demo description, will be replaced with content later.",
      link: "/gamepage/ShoppingBudget",
    },
    {
      name: "Balance Builder",
      description:
        "This is demo description, will be replaced with content later.",
      link: "/gamepage/BalanceBuilder",
    },
    {
      name: "High And Low",
      description:
        "This is demo description, will be replaced with content later.",
      link: "/gamepage/HighAndLow",
    },
    {
      name: "Money Math",
      description:
        "This is demo description, will be replaced with content later.",
      link: "/gamepage/MoneyMath",
    },
    {
      name: "Money Manager",
      description:
        "This is demo description, will be replaced with content later.",
      link: "/gamepage/MoneyManager",
    },
  ];
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
        We make digital toys that help your kid learn finance with ease.
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <p className={styles.title}>{games[currentgameindex].name}</p>
          <div className={styles.description}>
            A game that lets you buy and sell virtual stocks. Learn concepts
            like investing mutual funds and more.
          </div>
          <div
            className={styles.button}
            onClick={() => router.push(games[currentgameindex].link)}
          >
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
