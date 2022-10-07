import styles from "../../styles/Journey/banner.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";
import Triangle from "../SVGcomponents/Journey/Triangle";

export default function Banner({ highlight, pointer = false }) {
  return (
    <div className={styles.banner} style={{ background: highlight.color }}>
      {pointer ? (
        <Triangle
          className={styles.triangle}
          clr={highlight.color}
          style={{ ...highlight.pointer }}
        />
      ) : (
        ""
      )}
      {highlight.pathwayId === "reward" ? (
        <div className={styles.rewardBanner}>
          <img
            src={"/images/journey/rewardBg.svg"}
            className={styles.rewardBg}
            alt=""
          />
          <div className={styles.rewardText}>Rewards to win</div>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.title}>{highlight.title}</div>
            <div className={styles.description}>
              {highlight.pathwayDescription}
            </div>
            <div className={styles.buttonArea}>
              {/* <button className={styles.button}>BEGIN</button> */}
            </div>
          </div>
          <div className={styles.right}>
            {highlight.pathwayreward && (
              <div className={styles.reward}>
                Earn <UniCoinSvg className={styles.svg} />
                {highlight.pathwayreward}
              </div>
            )}
            <div className={styles.icon}>
              <img
                src={`/images/journey/${highlight.pathwayId}.svg`}
                alt=""
                className={styles.iconImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
