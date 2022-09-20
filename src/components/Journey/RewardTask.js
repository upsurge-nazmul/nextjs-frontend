import styles from "../../styles/Journey/rewardTask.module.scss";
import { PathwayData } from "../../static_data/Pathways_Data";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

export default function RewardTask() {
  return (
    <div className={styles.rewardTask}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div>Pathway</div>
          <div>Unicoins</div>
          <div>Badges</div>
        </div>
        {PathwayData.map((path) => {
          if (path.pathwayId !== "reward") {
            return (
              <div key={path.pathwayNumber} className={styles.item}>
                <div className={styles.image}>
                  <img
                    className={styles.icon}
                    src={`/images/journey/${path.pathwayId}.svg`}
                    alt=""
                  />
                  <div className={styles.title}>{path.title}</div>
                </div>
                <div className={styles.reward}>
                  <UniCoinSvg className={styles.rewardSvg} />
                  <span className={styles.rewardText}>
                    {path.pathwayreward}
                  </span>
                </div>
                <div className={styles.badges}>
                  <img src={`/images/journey/${path.badge}.svg`} alt="" />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
