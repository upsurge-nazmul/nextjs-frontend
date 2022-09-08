import styles from "../../styles/Journey/banner.module.scss";
import UniCoinSvg from "../SVGcomponents/UniCoinSvg";

export default function Banner({ PATH }) {
  const highlight = PATH[0];

  return (
    <div className={styles.banner} style={{ background: highlight.color }}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.title}>{highlight.name}</div>
          <div className={styles.description}>{highlight.description}</div>
          <div className={styles.buttonArea}>
            <button className={styles.button}>BEGIN</button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.reward}>
            Win <UniCoinSvg className={styles.svg} />
            {highlight.reward}
          </div>
          <div>icon</div>
        </div>
      </div>
    </div>
  );
}
