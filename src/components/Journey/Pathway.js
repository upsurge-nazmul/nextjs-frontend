import styles from "../../styles/Journey/pathway.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

export default function Pathway({ PATH }) {
  return (
    <div className={styles.pathway}>
      <div className={styles.content}>
        {PATH.map((item, i) => {
          return (
            <div className={styles.pathItem} key={i}>
              <div className={styles.icon}>icon</div>
              <div className={styles.title}>{item.name}</div>
              <div className={styles.rewardArea}>
                <div className={styles.reward}>
                  <UniCoinSvg className={styles.svg} />
                  <span>{item.reward}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
