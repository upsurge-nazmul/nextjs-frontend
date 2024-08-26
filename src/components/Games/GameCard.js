import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Main";
import styles from "../../styles/Games/gameCard.module.scss";
import Buttons from "../Buttons";
import GameSvg from "../SVGcomponents/GameSvg";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import LockSvg from "../SVGcomponents/LockSvg";

export default function GameCard({ data = null, onClick = () => {} }) {
  const { userdata, gameUnicoinRewards } = useContext(MainContext);
  const [rewardReceived, setRewardReceived] = useState(false);

  useEffect(() => {
    if (
      gameUnicoinRewards &&
      gameUnicoinRewards.length &&
      gameUnicoinRewards.includes(data.id)
    )
      setRewardReceived(true);
    else setRewardReceived(false);
  }, [gameUnicoinRewards]);

  const getBackgroundImage = (data) => {
    return (
      data?.img ||
      (data?.name && `/images/games/${data?.name.replace(/ /g, "")}.png`) ||
      ""
    );
  };

  return (
    <div
      className={styles.gameCard}
      style={{ backgroundImage: `url(${getBackgroundImage(data)})` || "" }}
      onClick={() => {
        onClick();
        mixpanel.track("Game started", {
          event: `Game Started ${data.name}`,
          gameName: `${data.id}`,
        });
      }}
    >
      <div className={styles.title}>{data?.name || ""}</div>
      <div className={styles.actionArea}>
        <Buttons
          type={"animated"}
          themeBg={
            userdata?.premium_plan >= data.premium_plan ? "#4166EB" : "#FF4E4E"
          }
        >
          {userdata?.premium_plan >= data.premium_plan ? (
            <GameSvg className={styles.icon} />
          ) : (
            <LockSvg className={styles.icon} />
          )}
        </Buttons>
      </div>
      {!rewardReceived && (
        <div className={styles.unicoins}>
          <div className={styles.coin}>
            <UniCoinSvg />
          </div>
          {Math.round(data.unicoinsReward).toLocaleString("en-IN", {
            currency: "INR",
          })}
        </div>
      )}
    </div>
  );
}
