import styles from "../../styles/Games/gameCard.module.scss";
import Buttons from "../Buttons";
import GameSvg from "../SVGcomponents/GameSvg";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

export default function GameCard({
  data = null,
  onClick = () => {},
  reward = "",
  rewardReceived = false,
}) {
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
        <Buttons type={"animated"}>
          <GameSvg className={styles.icon} />
        </Buttons>
      </div>
      {!rewardReceived && (
        <div className={styles.unicoins}>
          <div className={styles.coin}>
            <UniCoinSvg />
          </div>
          {data.unicoinsReward}
        </div>
      )}
    </div>
  );
}
